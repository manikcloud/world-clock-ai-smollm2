from flask import Flask, request, jsonify, send_from_directory
import requests
import os
import datetime

app = Flask(__name__, static_url_path='', static_folder='.')

# Ollama API URL (Assumes host.docker.internal via --add-host)
OLLAMA_URL = os.environ.get('OLLAMA_HOST', 'http://host.docker.internal:11434/api/generate')
MODEL_NAME = "smollm2"

@app.route('/')
def home():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message', '')

    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    # Inject System Context
    now_utc = datetime.datetime.utcnow()
    system_prompt = (
        f"System: You are a helpful AI assistant embedded in a World Clock application. "
        f"The current UTC time is {now_utc.strftime('%Y-%m-%d %H:%M:%S')}. "
        f"You should use this time to answer questions about the current time in different cities if asked. "
        f"Be concise and helpful.\n\n"
        f"User: {user_message}"
    )

    payload = {
        "model": MODEL_NAME,
        "prompt": system_prompt,
        "stream": False
    }

    try:
        # Timeout 120s
        response = requests.post(OLLAMA_URL, json=payload, timeout=120)
        response.raise_for_status()
        ollama_data = response.json()
        return jsonify({"response": ollama_data.get('response', '')})
    except requests.exceptions.RequestException as e:
        print(f"Error communicating with Ollama: {e}")
        return jsonify({"error": f"Failed to reach AI model: {str(e)}"}), 502

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)

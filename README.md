# World Clock AI (Smollm2)

A real-time **World Clock** application with an embedded **AI Chat Assistant** powered by [Ollama](https://ollama.ai/) and the `smollm2` model.

The AI assistant is context-aware and knows the current UTC time, allowing you to ask time-related questions directly in the chat.

## Features

- 🌍 **Real-time World Clocks**: View current time in Local, New York, London, Tokyo, and UTC.
- 🤖 **AI Chat**: Chat with a local LLM (`smollm2`) running on your machine.
- 🐳 **Dockerized**: Easy to deploy with a single container (connecting to host AI).
- ⚡ **Cyberpunk UI**: Modern, responsive neon-styled interface.
<img width="1647" height="974" alt="image" src="https://github.com/user-attachments/assets/ba281b07-439d-4882-ae2b-9cca44e771c3" />

## Prerequisites

1.  **Docker**: Installed and running.
2.  **Ollama**: Installed on your host machine.
    - [Download Ollama](https://ollama.ai/download)
    - Run `ollama serve`
    - Pull the model: `ollama pull smollm2`

## 🚀 Quick Start (Docker)

To run the application in a container while connecting to your host's Ollama instance:

### Linux / Linux VMs
Use `--network host` to allow the container to access the host's network directly.

```bash
docker run -d --network host --name world-clock-ai manikcloud/world-clock-ai:latest
```
*Access at: http://localhost:5000*

### Mac / Windows
Use `host.docker.internal` to connect to the host.

```bash
docker run -d -p 5000:5000 --add-host=host.docker.internal:host-gateway --name world-clock-ai manikcloud/world-clock-ai:latest
```
*Access at: http://localhost:5000*

## 🛠️ Build from Source

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/manikcloud/world-clock-ai-smollm2.git
    cd world-clock-ai-smollm2
    ```

2.  **Build the Docker image**:
    ```bash
    docker build -t world-clock-ai .
    ```

3.  **Run the container** (see commands above).

## 💻 Local Development (Python)

If you want to run without Docker:

1.  **Install Dependencies**:
    ```bash
    pip install flask requests pytz
    ```

2.  **Set Environment Variables** (Optional):
    ```bash
    export OLLAMA_HOST=http://localhost:11434/api/generate
    ```

3.  **Run the App**:
    ```bash
    python app.py
    ```

## API Endpoints

- **`GET /`**: Serves the Web UI.
- **`POST /api/chat`**: Chat endpoint.
    - Body: `{"message": "What time is it?"}`
    - Response: `{"response": "The current UTC time is..."}`

## License
MIT

## Acknowledgements

Special thanks to **Vinod Gurjar** for the original idea and technical discussion behind this project.
- [Connect with Vinod on LinkedIn](https://www.linkedin.com/in/vinod-g-86b5a514a/)

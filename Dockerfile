FROM python:3.9-slim

WORKDIR /app

# Install dependencies
RUN pip install flask requests pytz

# Copy app files
COPY . .

# Expose port (Internal Flask port)
EXPOSE 5000

# Run Flask app
CMD ["python", "app.py"]

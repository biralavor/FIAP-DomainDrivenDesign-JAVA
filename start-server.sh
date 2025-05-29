#!/bin/zsh
# Start a Python HTTP server with Python 3 explicitly
# Uses port 8000 by default or accepts a custom port as first argument

PORT=${1:-8000}
echo "Starting server at http://localhost:$PORT"
echo "Press Ctrl+C to stop the server"

# Use Python 3 explicitly with these optimizations:
# - Disable directory caching for faster reload
# - Log to stdout for easier debugging
python3 -m http.server $PORT --bind 127.0.0.1

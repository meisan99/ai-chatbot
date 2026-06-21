# AI Chatbot

A simple AI chatbot built with FastAPI and Google Gemini.

## Requirements

- Python 3.14+
- Node.js 22+
- uv

## How to Start

### Backend

1. Navigate to the backend folder

```bash
   cd chatbot-backend
```

2. Create a `.env` file with the following:

```bash
    GEMINI_API_KEY=your_api_key_here
```

3. Install dependencies and run

```bash
   uv sync
   uv run python main.py
```

### Frontend

1. Navigate to the frontend folder

```bash
   cd chatbot-web
```

2. Create a `.env` file with the following:

```bash
VITE_API_URL=http://localhost:8080
```

4. Install dependencies and run

```bash
   npm install
   npm run dev
```

3. Open `http://localhost:5173` in your browser

## Live Demo
https://ai-chatbot-one-sable.vercel.app/

## Code Review

### Overview

An end‑to‑end app that lets you paste code and receive review. The project consists of:

- **BackEnd**: `Node.js` + `Express` API that calls Google Gemini to produce the review
- **FrontEnd**: `React` (Vite) single‑page UI with an in‑browser code editor and rendered Markdown output

### Tech Stack

- **Backend**: Node.js, Express, `@google/generative-ai`, CORS, dotenv
- **Frontend**: React, Vite, Axios, `react-simple-code-editor`, Prism/Highlight for syntax highlighting, `react-markdown`

### Project Structure

```text
code-review/
  BackEnd/
    server.js                # Express server bootstrap (runs on :3000)
    src/
      app.js                 # Express app, routes, middleware
      routes/ai.routes.js    # POST /ai/get-review
      controllers/ai.controller.js
      services/ai.service.js # Gemini model call and prompt
    package.json

  FrontEnd/
    src/
      App.jsx                # Editor, Review trigger, Markdown render
      main.jsx
    index.html
    vite.config.js
    package.json

  README.md                  # You are here
```

### Prerequisites

- Node.js 18+ and npm
- A Google AI Studio API key with access to Gemini models

### Environment Variables

Create a `.env` file in `BackEnd/`:

```env
GOOGLE_GEMINI_KEY=your_api_key_here
```

### Setup & Run

1. Backend (API)

```bash
cd BackEnd
npm install
node server.js
# Server starts at http://localhost:3000
```

2. Frontend (Web App)

```bash
cd FrontEnd
npm install
npm run dev
# Vite dev server prints the local URL (usually http://localhost:5173)
```

### Using the App

1. Start the backend, then start the frontend.
2. Open the frontend URL (e.g., `http://localhost:5173`).
3. Paste your code into the editor and click “Review”.
4. The right pane shows the AI‑generated review as Markdown with syntax highlighting.

### API Reference (Backend)

- **POST** `/ai/get-review`
  - Body: JSON
    ```json
    { "code": "// your code here" }
    ```
  - Response: `text/markdown` string containing the review.
  - Errors:
    - `400` if `code` is missing

### Notes & Troubleshooting

- Ensure `GOOGLE_GEMINI_KEY` is valid and has access to the `gemini-2.0-flash` model.
- CORS is enabled on the API; frontend calls `http://localhost:3000` by default (see `FrontEnd/src/App.jsx`).
- If ports are busy, change them or stop other processes:
  - Backend port: hardcoded in `BackEnd/server.js` (3000)
  - Frontend port: Vite prints the port it selects; override with `--port`
    ```bash
    npm run dev -- --port=5173
    ```
- If you see "Something went wrong!" in the UI, check the backend console for errors and verify your `.env` file.

### Scripts

- Backend: currently runs with `node server.js`
- Frontend: `npm run dev`, `npm run build`, `npm run preview`, `npm run lint`

### Security

- Do not commit `.env` or your API keys. Restrict API key scope/quotas as appropriate.

### License

This project does not currently specify a license.

# Diya Handcrafts — Production Deployment & Architecture Guide

This project has been cleanly separated into an independently deployable **Frontend (Vercel)** and **Backend REST API (Render)** while preserving 100% of the existing UI/UX and Admin Panel.

---

## 🏗️ Project Architecture

```
Diya-Handcrafts/
├── frontend/                     # Vercel Frontend (Vite + React 19)
│   ├── src/                      # UI Components, Pages & Services
│   ├── public/                   # Static Media Assets
│   ├── vercel.json               # SPA Route Rewrite Configuration
│   ├── package.json              # Client Dependencies
│   └── .env.example              # VITE_API_URL Configuration
│
├── backend/                      # Render Backend (Node.js + Express REST API)
│   ├── controllers/              # REST Controller Logic
│   ├── routes/                   # API Endpoints (/api/*)
│   ├── server.js                 # Express Entry Point
│   ├── package.json              # Server Dependencies
│   └── .env.example              # PORT & CORS Configuration
│
└── README.md                     # Deployment Instructions & Documentation
```

---

## 🌐 Production Deployment Guide

### 1. Backend Deployment — Render
1. Create a new **Web Service** on [Render](https://render.com).
2. Connect your GitHub repository: `https://github.com/PrasannaCh12/Diya-Handcrafts.git`.
3. Set the following build settings:
   * **Root Directory:** `backend`
   * **Environment:** `Node`
   * **Build Command:** `npm install`
   * **Start Command:** `npm start`
4. Add Environment Variables in Render:
   * `PORT`: `5000` *(Render sets this automatically)*
   * `NODE_ENV`: `production`
   * `FRONTEND_URL`: `https://your-app-name.vercel.app`
5. Click **Create Web Service** and copy your Render URL (e.g., `https://diya-handcrafts-backend.onrender.com`).

---

### 2. Frontend Deployment — Vercel
1. Create a new project on [Vercel](https://vercel.com).
2. Import your GitHub repository: `https://github.com/PrasannaCh12/Diya-Handcrafts.git`.
3. Configure the Project Settings:
   * **Framework Preset:** `Vite`
   * **Root Directory:** `frontend`
   * **Build Command:** `npm run build`
   * **Output Directory:** `dist`
4. Add Environment Variables in Vercel:
   * `VITE_API_URL`: `https://diya-handcrafts-backend.onrender.com/api` *(Your Render backend URL)*
5. Click **Deploy**.

---

### 3. Connection & CORS Verification
Once both services are deployed:
* Copy your live Vercel URL (e.g., `https://diya-handcrafts.vercel.app`).
* In your Render dashboard, update `FRONTEND_URL` to match your Vercel URL.
* Trigger a redeploy on Render to lock CORS authorization.

---

## 💻 Local Development Setup

### Running Backend Locally:
```bash
cd backend
npm install
npm run dev
# Server running at http://localhost:5000
```

### Running Frontend Locally:
```bash
cd frontend
npm install
npm run dev
# App running at http://localhost:5173
```

---

## 🔒 Security & Data Integrity Notes
* **Secrets:** Server environment secrets (`MONGODB_URI`, `JWT_SECRET`, admin master passwords) are strictly kept inside `backend/.env` and are never exposed to client bundles.
* **CORS Protection:** Express backend restricts origins strictly to authorized domains (`FRONTEND_URL` and `localhost:5173`).

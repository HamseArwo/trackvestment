Perfect — that helps a lot. Here’s an **authentic, recruiter-focused GitHub README** written for your **full-stack Trackvestment app**, where the **frontend is built with React + TypeScript** and the **backend (in Go + Gin + SQLite)** is linked as a separate repository.

It’s written to sound like a real developer explaining their project, showing both **technical skill and intent** — with a natural tone and no m-dashes.

---

# Trackvestment

Trackvestment is a **full-stack investment tracking application** that helps users monitor their **TFSA, RRSP, and RESP** accounts and stay within their contribution limits.

The project combines a **React + TypeScript frontend** with a **Go (Gin) backend**.
It was built to explore clean API design, real-time validation, and modern frontend development that connects seamlessly with a secure backend.

---

## Overview

* **Frontend:** React + TypeScript
* **Backend:** Go + Gin + SQLite
* **Architecture:** RESTful API
* **Auth:** JSON Web Tokens (JWT)

👉 **Backend Repository:** [Trackvestment Backend](https://github.com/yourusername/trackvestment-backend)

---

## 💡 Motivation

This project started from a simple idea: make it easier for Canadians to **see how close they are to reaching their TFSA, RRSP, and RESP limits**.
I wanted to create something practical that could connect a strong backend API with a clean and intuitive frontend interface.

The focus was on writing maintainable, strongly typed code and designing a real-world flow from **data input to validation and visualization**.

---

## ⚙️ Tech Stack

**Frontend**

* React (TypeScript)
* React Router
* Context API for state management
* Vite for development and build setup

**Backend**
* [Can be found here](https://github.com/HamseArwo/Canadian_Investment_Tracker)
* Go with Gin framework
* SQLite database
* JWT-based authentication
* REST API design

---

##  Core Features

* Create and log **contributions** for TFSA, RRSP, and RESP
* Automatic validation to **prevent over-contribution**
* Real-time updates on **remaining contribution room**
* Secure **user authentication and session handling**
* Responsive, clean, and accessible user interface
* Persistent state with smooth backend integration

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/trackvestment-frontend.git
cd trackvestment-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Connect the backend

Make sure the backend is running locally or hosted somewhere.
Update your `.env` file to include:

```
VITE_API_URL=http://localhost:8080
```

### 4. Start the development server

```bash
npm run dev
```

---

##  Authentication Flow

* User signs up or logs in
* Backend returns a **JWT** stored in browser local storage
* Authenticated routes on the frontend read the token for user access
* Axios automatically attaches tokens for protected requests

This setup keeps the frontend lightweight while maintaining security.

---

## Example Use Case

1. User logs in
2. Adds a $2,500 TFSA contribution
3. The system validates and updates their remaining contribution room
4. Dashboard reflects the change instantly with updated data from the backend

---

## Future Plans

* Integrate with financial APIs for real contribution data
* Add charts and visual analytics with Recharts or D3
* Build deployment pipelines with Docker and CI/CD
* Host the project on a server

---



Made by Hamse Arwo

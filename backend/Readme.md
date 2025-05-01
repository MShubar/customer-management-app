# Backend - Node.js + Express + SQLite

---

## 🚀 Prerequisites

Before you begin, make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- SQLite (or ensure you have a compatible SQLite setup)

---

## 🛠️ Installation & Setup

Follow the steps below to get the backend up and running:

### 1. **Create and Configure `.env` File**

In the root directory of the backend, create a `.env` file and add the following environment variables:

```bash
PORT=5000
SESSION_SECRET=I-am-a-secret-key-hidden-for-this-technical-test
JWT_SECRET=I-am-your-second-secret-key-hidden-for-this-technical-test
SALT=10
```

### 2. **Installation (in git bash terminal enter the following)**

```bash
npm install
nodemon
```

## Dependencies

"bcrypt": "^5.1.1",
"bcryptjs": "^3.0.2",
"body-parser": "^2.2.0",
"cors": "^2.8.5",
"dotenv": "^16.5.0",
"express": "^5.1.0",
"express-session": "^1.18.1",
"jsonwebtoken": "^9.0.2",
"nodemon": "^3.1.10",
"sqlite": "^5.1.1",
"sqlite3": "^5.1.7"

## Port of the backend

```backend
Runs on port 5000
```

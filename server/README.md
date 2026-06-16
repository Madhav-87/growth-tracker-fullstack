# 🌱 Growth Tracker — Backend

> **Growth Tracker** is a personal development web application designed to help users set meaningful goals, track daily progress, and build long-term habits. It provides performance analytics and visual reports to improve consistency and productivity. The platform focuses on transforming small daily actions into measurable growth over time.

---

## 📁 Project Structure

```
BackEnd/
├── config/
│   └── .env                    # Environment variables (DB, API keys, port)
├── controller/
│   └── controller.js           # Route handler functions (business logic layer)
├── model/
│   └── db.js                   # All MySQL database query functions
├── router/
│   └── routes.js               # Express route definitions
├── services/
│   ├── chatbotServer.js        # Gemini AI-powered Goal Coach chatbot
│   ├── dbConn.js               # MySQL connection pool (SSL-secured)
│   ├── goalVerification.js     # AI image verification & scoring engine
│   └── visionClient.js         # Google Cloud Vision API client
├── utils/
│   └── authMiddleware.js       # JWT token generation & verification
├── server.js                   # Express app entry point
└── package.json
```

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js v5 |
| Database | MySQL 2 (SSL-secured connection pool) |
| Authentication | JSON Web Tokens (JWT) |
| AI Chatbot | Google Gemini API (`gemini-2.5-flash-lite`) |
| Image Verification | Google Cloud Vision API |
| AI Scoring Engine | Google Gemini API (`gemini-2.5-flash`) |
| Environment Config | dotenv |
| CORS | cors |

---

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- MySQL database instance (SSL-enabled)
- Google Cloud credentials (Vision API)
- Google Gemini API keys

### Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd BackEnd

# 2. Install dependencies
npm install

# 3. Configure environment variables
# Create/edit config/.env with your credentials (see Environment Variables section)

# 4. Start the server
node server.js

# Or with hot-reloading during development
npx nodemon server.js
```

The server will start on the port defined in your `.env` file.

---

## 🔐 Environment Variables

Create a `config/.env` file with the following keys:

```env
# MySQL Database
MYSQL_HOST=your_db_host
MYSQL_USER=your_db_user
MYSQL_PASSWORD=your_db_password
MYSQL_PORT=your_db_port
MYSQL_DATABASE=your_db_name

# Server
PORT=5000

# Google Gemini API Keys
GEMINI_API_KEY=your_gemini_key_for_chatbot
GEMINI_API_KEY_GET_QUE=your_gemini_key_for_questions
GEMINI_API_KEY_VERIFY_SCORE=your_gemini_key_for_scoring

# Google Cloud Vision (base64-encoded service account JSON)
GOOGLE_VISION_CREDENTIALS_BASE64=your_base64_encoded_credentials

# Database SSL Certificate (base64-encoded CA cert)
CA=your_base64_encoded_ca_cert
```

> ⚠️ **Never commit `.env` to version control.** Add `config/.env` to your `.gitignore`.

---

## 🗄️ Database Schema

The backend interacts with the following MySQL tables:

| Table | Purpose |
|---|---|
| `userAccount` | Stores user credentials (Name, Email, Password) |
| `daily_goals` | Daily goals per user with completion and submission status |
| `Score` | Daily performance scores |
| `Monthly_Goals` | Monthly goals per user |
| `Monthly_Score` | Aggregated monthly performance scores |
| `Monthly_progress` | Monthly progress tracking records |
| `Yearly_Goals` | Yearly goals per user |
| `Yearly_Score` | Aggregated yearly performance scores |
| `user_fingerprints` | Device fingerprint data for child/device lock feature |

---

## 🔌 API Endpoints

All protected routes require a valid JWT Bearer token in the `Authorization` header:
```
Authorization: Bearer <token>
```

### Auth

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/Login` | ❌ | User login — returns JWT token |
| `POST` | `/addRecord` | ❌ | Register a new user account |

### Daily Goals

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/daily-goals-submit` | ✅ | Submit today's daily goals |
| `GET` | `/send-goals` | ✅ | Retrieve today's submitted goals |
| `GET` | `/Is-Submit` | ✅ | Check if daily goals have been submitted |
| `POST` | `/Submit-Response` | ✅ | Submit goal completion with images for AI scoring |
| `POST` | `/Score` | ✅ | Get yesterday's daily score |
| `GET` | `/taskInfo` | ✅ | Get daily task completion info |

### Monthly Goals

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/Monthly/Goals` | ✅ | Submit monthly goals |
| `GET` | `/Monthly/Response` | ✅ | Retrieve current month's goals |
| `GET` | `/Monthly/Response/Score/Check` | ✅ | Check if monthly review has been submitted |
| `POST` | `/Monthly/Response/Score` | ✅ | Submit monthly goal review with images for AI scoring |

### Yearly Goals

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/YearGoals/Submit` | ✅ | Submit yearly goals |
| `GET` | `/Yearly/Response` | ✅ | Retrieve current year's goals |
| `GET` | `/Year/Response/Check` | ✅ | Check if yearly review has been submitted |
| `POST` | `/Year/Response/Score` | ✅ | Submit yearly goal review with images for AI scoring |

### Analytics & Reports

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/Check-Daily-Score` | ✅ | Get weekly score history (last 7 days) |
| `POST` | `/Check-Monthly-Score` | ✅ | Get monthly score history (current month) |
| `POST` | `/Check-Yearly-Score` | ✅ | Get yearly score history (current year) |
| `POST` | `/Month/Score` | ✅ | Get overall monthly progress score |
| `POST` | `/Year/Score` | ✅ | Get overall yearly progress score |
| `POST` | `/report` | ✅ | Get performance health report (safe/alert) |

### AI Chatbot

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/chatbot` | ✅ | Send a message to the AI Goal Coach |

### Device Lock

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/deviceLock` | ✅ | Enable device/fingerprint lock |
| `POST` | `/deviceLockOff` | ✅ | Disable device lock (requires PIN) |

### Health Check

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/` | ❌ | Returns `{ message: "server listening..!" }` |

---

## 🤖 AI Features

### 1. Goal Verification & Scoring (`services/goalVerification.js`)

When a user submits their goal completion, they upload proof images. The backend:

1. Sends each image to the **Google Cloud Vision API** to extract object labels and OCR text.
2. Passes the image description alongside the goal text to **Gemini (`gemini-2.5-flash`)**.
3. Gemini acts as a strict evaluator — if the image clearly relates to the stated goal, it scores 100; otherwise 0. Missing images automatically score 0.
4. A final aggregate score (0–100) is calculated across all submitted goals and stored in the database.

> Maximum of 15 images per submission. Each image must be under 8MB.

### 2. AI Goal Coach Chatbot (`services/chatbotServer.js`)

An interactive chatbot powered by **Gemini (`gemini-2.5-flash-lite`)** with a custom system persona:

- Persona: Encouraging, strict but fair, highly motivational Goal Coach.
- Focuses on habit formation, breaking goals into steps, and overcoming procrastination.
- Guardrails: Refuses to answer off-topic questions (code, recipes, general knowledge, etc.).
- Implements a **sliding window** of the last 10 messages to keep context efficient.

---

## 🔒 Authentication

JWT-based stateless authentication:

- **Token generation:** On successful login, a JWT is signed with `security_key`, containing `name` and `id`, valid for **1 hour**.
- **Token verification:** The `verify` middleware extracts and decodes the token from `Authorization: Bearer <token>` on every protected route and attaches the decoded user object to `req.user`.

> ⚠️ The JWT secret (`security_key`) is currently hardcoded. For production, move it to a `.env` variable.

---

## 📊 Scoring & Progress Logic

| Metric | Calculation |
|---|---|
| **Daily Score** | AI-evaluated goal completion score (0–10 stored, 0–100 displayed) |
| **Weekly Score** | Last 7 days of daily scores |
| **Monthly Score** | All daily scores from the 1st of the current month |
| **Yearly Score** | All daily scores from Jan 1 of the current year |
| **Monthly Progress** | Combined average of daily scores + previous monthly scores |
| **Yearly Progress** | Combined average of daily + monthly + yearly scores |
| **Report Status** | `alert` if 3-day average < 50%, otherwise `safe` |

---

## 🛡️ Device Lock Feature

Users can enable a **device/fingerprint lock** to secure the app:

- On lock enable, the device fingerprint (browser fingerprint, user agent, screen dimensions) and a PIN are stored.
- On login, if a lock is active, the stored fingerprint is returned for client-side verification.
- To disable the lock, the user must provide the correct PIN.

---

## 📦 Dependencies

```json
{
  "@google-cloud/vision": "^5.3.4",
  "@google/generative-ai": "^0.24.1",
  "cors": "^2.8.5",
  "dotenv": "^16.5.0",
  "express": "^5.2.1",
  "express-jwt": "^8.5.1",
  "jsonwebtoken": "^9.0.2",
  "mysql2": "^3.14.1"
}
```

Dev dependency: `nodemon ^3.1.10`

---

## 🗂️ Folder Responsibilities

| Folder/File | Responsibility |
|---|---|
| `server.js` | Bootstraps the Express app, applies middleware, starts the listener |
| `router/routes.js` | Declares all HTTP routes and applies auth middleware |
| `controller/controller.js` | Handles request/response lifecycle for each route |
| `model/db.js` | Encapsulates all SQL queries — the single source of truth for data access |
| `services/dbConn.js` | Creates and exports the SSL-secured MySQL connection pool |
| `services/chatbotServer.js` | Wraps Gemini API into a conversational chatbot with persona enforcement |
| `services/goalVerification.js` | Orchestrates Vision API + Gemini to score goal submissions |
| `services/visionClient.js` | Initializes the Google Cloud Vision client from base64 credentials |
| `utils/authMiddleware.js` | JWT generation and verification helpers |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---


## 👤 Author

**Madhav Bondhare**
- GitHub:(https://github.com/Madhav-87/)

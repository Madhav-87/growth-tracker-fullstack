
# 🚀 Growth Tracker — Backend

The robust backend service powering the **Growth Tracker** application. This service manages the "brains" of the app, handling everything from secure authentication and database management to AI-driven insights.

---

## 🧩 Tech Stack

### **Core Runtime & Framework**
* ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white) **Node.js**
* ![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white) **Express.js**

### **Database**
* ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white) **MySQL** (using `mysql2` driver)

### **Security & Auth**
* ![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white) **JSON Web Tokens**
* **CORS** & **Dotenv** for environment security.

### **AI Integration**
* ![Google Gemini](https://img.shields.io/badge/Google%20Generative%20AI-4285F4?style=flat-square&logo=google&logoColor=white) **Google Generative AI**

---

## ✨ Key Responsibilities

* **RESTful API Development:** Scalable endpoints for frontend consumption.
* **Secure Authentication:** JWT-based user login and session management.
* **Database Management:** Optimized MySQL read/write operations for growth metrics.
* **AI Insights:** Generating personalized suggestions using Google’s Generative AI.
* **Analytics Support:** Providing structured data for charts and progress dashboards.
* **Clean Architecture:** Modular code structure for easy maintenance and scalability.

---

## 📂 Project Structure

```text
backend/
│
├── index.js          // Server entry point
├── package.json      // Dependencies and scripts
├── .env              // Environment variables (ignored by git)
├── routes/           // API endpoint definitions
├── controllers/      // Business logic & request handling
├── middleware/       // Auth guards and validation
└── database/         // MySQL connection & configuration

```

---

## ⚡ Getting Started

### 1. Prerequisites

Make sure you have **Node.js** and **MySQL** installed on your machine.

### 2. Install Dependencies

Run the following command in the root of the `backend` folder:

```bash
npm install

```

### 3. Configure Environment Variables

Create a file named `.env` in the root directory and add your credentials:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=growth_tracker
JWT_SECRET=your_super_secret_key
GOOGLE_API_KEY=your_google_gemini_api_key

```

### 4. Run the Server

For development with auto-reload:

```bash
npx nodemon index.js

```

The server will start at: `http://localhost:5000`

---

## 🔍 Backend Use Cases

* **Habit Tracking:** logic for calculating streaks and progress.
* **Secure Sessions:** Ensuring user data is only accessible to authorized owners.
* **Data Aggregation:** Transforming raw DB rows into visual-ready JSON for frontend charts.
* **AI Coaching:** Processing user habits to return actionable growth tips.

---

## 🎯 What This Project Demonstrates

* **Backend Architecture:** Professional separation of concerns (Routes, Controllers, Middleware).
* **Security First:** Implementation of environment variables and JWT protection.
* **External Integration:** Seamlessly connecting third-party AI APIs with local databases.
* **Scalability:** Ready to be extended with more complex data models and features.

---



## 👨‍💻 Author

**Madhav Bondhare**

```

---

### Tips for your GitHub Repository:
1.  **Badges:** I added "Badges" in the Tech Stack section. These look very professional on GitHub.
2.  **File Tree:** The `📂 Project Structure` section uses a text-based tree, which is the standard way to show folder hierarchies in README files.
3.  **.gitignore:** Make sure you have a `.gitignore` file in your folder containing `.env` and `node_modules` so you don't accidentally upload your passwords to GitHub!

**Would you like me to help you write a "Features" section for the Frontend README as well?**

```

# 🚀 Growth Tracker FrontEnd

A comprehensive React-based web application designed to help users set, track, and analyze their personal goals. The application features daily, monthly, and yearly goal management, visualized progress tracking, and an integrated chatbot assistant.

## 🧩 Features

* **User Authentication:** Secure Login and Account Creation.
* **Goal Management:**
    * **Daily:** Set daily tasks, submit responses, and view weekly summaries.
    * **Monthly:** Plan objectives for the month and review performance.
    * **Yearly:** Long-term goal setting and yearly reviews.
* **Dashboard:** specialized views for Home, Monthly, and Yearly overviews.
* **Visual Analytics:** Interactive charts and circular progress bars to visualize success rates using `recharts`.
* **AI Chatbot:** Integrated assistant for user support.
* **Responsive Design:** Built with Bootstrap for mobile and desktop compatibility.

## 🛠️ Tech Stack

**Frontend:**
* **Library:** React.js (v19)
* **Routing:** React Router DOM
* **Styling:** Bootstrap 5, CSS3
* **HTTP Client:** Axios
* **Charts/Visuals:** Recharts, React Circular Progressbar
* **Notifications:** React Toastify
* **Utils:** JWT Decode (Auth), React Device Detect

**Backend Connection:**
* Configured to proxy requests to `http://localhost:7000`

## 📂 Project Structure

```text
src/
├── components/          # Reusable UI components
│   ├── common/          # Alerts, Drawer, Notifications
│   ├── layout/          # Header, Footer
│   └── ui/              # Progress bars and visual elements
├── pages/               # Main application pages
│   ├── Auth/            # Login and Signup
│   ├── Dashboard/       # Main overview screens
│   ├── Goals/           # Daily, Monthly, Yearly logic
│   ├── Progress/        # Analytics page
│   └── Chatbot/         # AI Chat interface
├── styles/              # Global and component-specific CSS
└── assets/              # Icons and Images

```

## ⚙️ Installation & Setup

1. **Clone the repository:**
```bash
git clone <your-repo-url>
cd FrontEnd

```


2. **Install dependencies:**
```bash
npm install

```


3. **Environment Setup:**
Ensure you have the `.env` file configured (if applicable) or ensure your backend server is running on port **7000** as defined in `package.json`.
4. **Run the application:**
```bash
npm start

```


The app will open in development mode at `http://localhost:3000`.

## 🔗 Backend Integration

This frontend is configured to communicate with a backend server.

* **Proxy:** The `package.json` includes `"proxy": "http://localhost:7000"`.
* Ensure your Node.js/Express backend is running on port 7000 to avoid CORS issues during development.

**Author:** Madhav Bondhare


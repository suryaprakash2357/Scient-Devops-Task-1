# Progress Tracking Portal

A lightweight web app for tracking team tasks, meetings, and deadline reminders. It has a Node.js/Express/MongoDB backend and a single-page HTML/CSS/JS frontend.

## Features

- **Authentication** — Register/login with JWT-based auth, passwords hashed with bcrypt. Two roles: `lead` and `assignee`.
- **Task management** — Create tasks with title, description, assignees, priority (High/Medium/Low), deadline, and tags. Update task status (Pending → In Progress → Blocked → Done) with a full audit trail of every status change (who, from/to, note, timestamp). Add comments to tasks.
- **Meetings** — Schedule meetings with a title, agenda, date/time, participants, and an optional recurring flag.
- **Automated email reminders** — A trigger endpoint scans open tasks and emails team leads when a task is overdue, due in 1 day, or due in 3 days (via Nodemailer/Gmail), logging each reminder to avoid duplicates within the same day.
- **User directory** — List all registered users.

## Tech Stack

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT (`jsonwebtoken`) for auth, `bcryptjs` for password hashing
- Nodemailer for email reminders
- `dotenv` for configuration, `cors` for cross-origin requests

**Frontend**
- Static HTML/CSS/JavaScript (single `index.html`), Font Awesome icons

## Project Structure

```
Scient-Devops-Task-1/
├── backend/
│   ├── controllers/       # Route handlers (auth, tasks, meetings, reminders, users)
│   ├── middleware/
│   │   └── auth.js        # JWT verification middleware
│   ├── models/             # Mongoose schemas (User, Task, Meeting, Reminder)
│   ├── routes/              # Express routers
│   ├── server.js            # App entry point
│   └── package.json
└── frontend/
    └── index.html          # Single-page frontend UI
```

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- A MongoDB instance (local or a cloud URI, e.g. MongoDB Atlas)
- A Gmail account (or other SMTP-compatible sender) for reminder emails, with an app password if using Gmail

### Installation

```bash
git clone https://github.com/suryaprakash2357/Scient-Devops-Task-1.git
cd Scient-Devops-Task-1/backend
npm install
```

### Configuration

Create a `.env` file inside `backend/` with the following variables:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/progress-portal
JWT_SECRET=your_jwt_secret_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### Running the app

```bash
npm run dev
npm start
```

The API will be available at `http://localhost:5000`. Open `frontend/index.html` in a browser (or serve it with any static file server) to use the UI.

## API Overview

| Method | Endpoint | Auth required | Description |
|---|---|---|---|
| POST | `/api/auth/register` | No | Register a new user |
| POST | `/api/auth/login` | No | Log in and receive a JWT |
| GET | `/api/auth/me` | Yes | Get the current authenticated user |
| GET | `/api/users` | Yes | List all users |
| GET | `/api/tasks` | Yes | List all tasks |
| POST | `/api/tasks` | Yes | Create a task |
| PATCH | `/api/tasks/:id/status` | Yes | Update a task's status |
| POST | `/api/tasks/:id/comments` | Yes | Add a comment to a task |
| GET | `/api/meetings` | Yes | List all meetings |
| POST | `/api/meetings` | Yes | Schedule a meeting |
| POST | `/api/reminders/trigger` | Yes | Scan tasks and send deadline reminder emails to leads |

Authenticated requests must include a header: `Authorization: Bearer <token>`.

### Triggering reminders

The `/api/reminders/trigger` endpoint is designed to be called periodically (e.g. via a cron job or scheduled task) rather than manually, so that leads get timely email notifications about overdue and upcoming task deadlines.

## License

No license specified.

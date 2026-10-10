
# Forma — Mini SaaS Template Store

A full-stack template marketplace where users can register, sign in, explore website templates, preview designs, and save their favorite templates to a personal collection.

## Features

- User registration and login
- JWT-based authentication
- Password hashing with bcrypt
- Browse and preview website templates
- Search and filter templates by category
- Add templates to favorites
- View and remove saved favorites
- Responsive interface for desktop and mobile
- Protected routes for authenticated users

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- React Router
- Axios
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt

## Project Structure

```text
fullstack-intern-task/
├── client/
│   ├── public/
│   └── src/
│       ├── api/
│       ├── components/
│       ├── context/
│       └── pages/
├── server/
│   └── src/
├── .gitignore
└── README.md
```

Adjust the server structure above if your actual folders differ.

## Prerequisites

- Node.js and npm
- MongoDB local installation or MongoDB Atlas account
- Git

## Installation and Setup

### 1. Clone the repository

```bash
git clone YOUR_PUBLIC_GITHUB_REPOSITORY_URL
cd fullstack-intern-task
```

### 2. Set up the backend

```bash
cd server
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
```

Use your actual environment variable names if they differ in your project. Never commit real secrets to GitHub.

Start the backend using the start command defined in the server's `package.json`. For example:

```bash
npm run dev
```

### 3. Set up the frontend

Open a second terminal:

```bash
cd client
npm install
npm run dev
```

Open the local URL printed by Vite, usually:

```text
http://localhost:5173
```

The backend runs on port `5000` by default.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a user |
| POST | `/api/auth/login` | Authenticate a user |
| GET | `/api/templates` | Retrieve templates |
| GET | `/api/templates/:id` | Retrieve a template by ID |
| POST | `/api/favorites/:templateId` | Add a favorite |
| GET | `/api/favorites` | Retrieve the user's favorites |
| DELETE | `/api/favorites/:templateId` | Remove a favorite |

Protected endpoints require a valid authentication token.

## Security

- Passwords are hashed before being stored.
- JWT authentication protects user-specific operations.
- Favorites are associated with the authenticated user.
- Environment variables are used for sensitive configuration.

## Author

**Name:** YOUR FULL NAME  
**Email:** YOUR EMAIL ADDRESS  
**GitHub:** YOUR GITHUB PROFILE URL

## License

This project was developed as a full-stack internship assignment.

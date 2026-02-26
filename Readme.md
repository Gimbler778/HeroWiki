# HeroWiki

HeroWiki is a community-driven platform for posting and exploring fictional heroes. Users can sign in with Google/GitHub, create posts, vote (Reddit-style net score), and favorite heroes.

## Features

- OAuth login (Google + GitHub)
- Hero feed with vote/favorite metadata loaded from backend
- Reddit-style vote score (`score = upvotes - downvotes`)
- Profile page (my posts, my favorites)
- Session tracking in DB (`spring_session` + `session_log`) with 3-day timeout

## Tech Stack

- Frontend: React, React Router, Axios, Tailwind CSS, DaisyUI
- Backend: Spring Boot, Spring Security OAuth2, Spring Data JPA
- Database: PostgreSQL (Neon)
- Deploy: Vercel (frontend) + Render (backend)

## Local Development

### Prerequisites

- Node.js 18+
- Java 21+
- Maven 3.9+

### 1) Backend

Create `backend/.env` (example in `backend/.env.example`) and set:

```dotenv
SPRING_DATASOURCE_URL=jdbc:postgresql://<neon-host>/neondb?sslmode=require&channel_binding=require
SPRING_DATASOURCE_USERNAME=<db_user>
SPRING_DATASOURCE_PASSWORD=<db_password>
APP_FRONTEND_URL=http://localhost:3000

SPRING_SECURITY_OAUTH2_CLIENT_REGISTRATION_GOOGLE_CLIENT_ID=<google_client_id>
SPRING_SECURITY_OAUTH2_CLIENT_REGISTRATION_GOOGLE_CLIENT_SECRET=<google_client_secret>
SPRING_SECURITY_OAUTH2_CLIENT_REGISTRATION_GITHUB_CLIENT_ID=<github_client_id>
SPRING_SECURITY_OAUTH2_CLIENT_REGISTRATION_GITHUB_CLIENT_SECRET=<github_client_secret>
```

Run:

```bash
cd backend
./run-backend.ps1
```

### 2) Frontend

Create `frontend/.env.development`:

```dotenv
REACT_APP_API_URL=http://localhost:8080
```

Run:

```bash
cd frontend
npm install
npm start
```

## Production Deployment (Render + Vercel)

### Frontend (Vercel)

Set Vercel env var:

```dotenv
REACT_APP_API_URL=https://<your-backend>.onrender.com
```

### Backend (Render)

Set Render env vars:

```dotenv
SPRING_DATASOURCE_URL=jdbc:postgresql://<neon-host>/neondb?sslmode=require&channel_binding=require
SPRING_DATASOURCE_USERNAME=<db_user>
SPRING_DATASOURCE_PASSWORD=<db_password>

APP_FRONTEND_URL=https://<your-frontend>.vercel.app

SPRING_SECURITY_OAUTH2_CLIENT_REGISTRATION_GOOGLE_CLIENT_ID=<google_client_id>
SPRING_SECURITY_OAUTH2_CLIENT_REGISTRATION_GOOGLE_CLIENT_SECRET=<google_client_secret>
SPRING_SECURITY_OAUTH2_CLIENT_REGISTRATION_GITHUB_CLIENT_ID=<github_client_id>
SPRING_SECURITY_OAUTH2_CLIENT_REGISTRATION_GITHUB_CLIENT_SECRET=<github_client_secret>

SERVER_SERVLET_SESSION_COOKIE_SAME_SITE=none
SERVER_SERVLET_SESSION_COOKIE_SECURE=true
```

Notes:

- `APP_FRONTEND_URL` must be exact origin with **no trailing slash**.
- Backend OAuth callback URLs must point to backend domain:
  - `https://<your-backend>.onrender.com/login/oauth2/code/google`
  - `https://<your-backend>.onrender.com/login/oauth2/code/github`

## API Endpoints

### Hero

- `GET /api/heroes`
- `GET /api/heroes/{id}`
- `GET /api/heroes/meta?ids=1,2,3`
- `POST /api/heroes`
- `PUT /api/heroes/{id}`
- `DELETE /api/heroes/{id}`
- `POST /api/heroes/{id}/vote?value=1|-1`
- `DELETE /api/heroes/{id}/vote`
- `POST /api/heroes/{id}/favorite`
- `DELETE /api/heroes/{id}/favorite`

### Auth/Profile

- `GET /api/auth/status`
- `POST /api/logout`
- `GET /api/me`
- `GET /api/me/posts`
- `GET /api/me/favorites`

## License

This project is licensed under the [MIT License](LICENSE.txt).

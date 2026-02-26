# HeroWiki

HeroWiki is a community-driven platform where users can create, explore, and share information about fictional heroes. The platform allows users to create hero profiles, customize their appearance, and explore a feed of heroes contributed by others.

## Features

- **Hero Creation**: Users can create hero profiles with a title, description (Markdown supported), and customizable card colors.
- **Hero Feed**: A dynamic feed displaying all created heroes with upvote and downvote functionality.
- **Hero Details**: View detailed information about a hero on a dedicated display page.
- **Markdown Support**: Write hero descriptions using Markdown syntax for better formatting.
- **Customizable Cards**: Each hero card can be customized with different colors and styles.
- **Responsive Design**: Fully responsive UI with a dark theme for better readability.

## Tech Stack

### Frontend
- **React**: For building the user interface.
- **React Router**: For navigation between pages.
- **Tailwind CSS**: For styling the application.
- **DaisyUI**: For pre-styled components.
- **Axios**: For making API requests to the backend.
- **React Markdown**: For rendering Markdown content.

### Backend
- **Spring Boot**: For building the RESTful API.
- **PostgreSQL (Neon-ready)**: For storing hero, vote, favorite, and user data.
- **Spring Data JPA**: For database interactions.
- **Spring Security + OAuth2 Login**: For Google/GitHub sign-in.

## Installation

### Prerequisites
- Node.js and npm installed on your system.
- Java 17 or higher installed on your system.

### Steps to Run the Project

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/herowiki.git
   cd herowiki
   ```

2. **Run the Backend**:
   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Configure environment variables (PowerShell example):
     ```powershell
     $env:SPRING_DATASOURCE_URL="jdbc:postgresql://ep-...neon.tech/neondb?sslmode=require&channel_binding=require"
     $env:SPRING_DATASOURCE_USERNAME="neondb_owner"
     $env:SPRING_DATASOURCE_PASSWORD="<your_password>"
     $env:SPRING_DATASOURCE_DRIVER_CLASS_NAME="org.postgresql.Driver"
     $env:SPRING_JPA_DATABASE_PLATFORM="org.hibernate.dialect.PostgreSQLDialect"
     $env:APP_FRONTEND_URL="http://localhost:3000"
     $env:GOOGLE_CLIENT_ID="<google_client_id>"
     $env:GOOGLE_CLIENT_SECRET="<google_client_secret>"
     ```
   - Build and run the Spring Boot application:
     ```bash
     mvn spring-boot:run
     ```
   - The backend will be available at `http://localhost:8080`.

3. **Run the Frontend**:
   - Navigate to the frontend directory:
     ```bash
     cd ../frontend
     ```
   - Install dependencies:
      ```bash
      npm install react-router-dom axios react-markdown
      ```
   - Install Tailwind CSS and DaisyUI:
     ```bash
     npm install tailwindcss daisyui
     ```
   - Initialize Tailwind CSS:
     ```bash
     npx tailwindcss init
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the React development server:
     ```bash
     npm start
     ```
   - The frontend will be available at `http://localhost:3000`.

## API Endpoints

### Hero Endpoints
- **GET** `/api/heroes`: Fetch all heroes.
- **GET** `/api/heroes/{id}`: Fetch a hero by ID.
- **POST** `/api/heroes`: Create a new hero (OAuth required).
- **PUT** `/api/heroes/{id}`: Update your hero.
- **DELETE** `/api/heroes/{id}`: Delete your hero.
- **POST** `/api/heroes/{id}/vote?value=1|-1`: Upvote/downvote once per user.
- **DELETE** `/api/heroes/{id}/vote`: Remove your vote.
- **POST** `/api/heroes/{id}/favorite`: Add to favorites.
- **DELETE** `/api/heroes/{id}/favorite`: Remove from favorites.

### Profile Endpoints
- **GET** `/api/me`: Current user profile.
- **GET** `/api/me/posts`: Current user's posts.
- **GET** `/api/me/favorites`: Current user's favorite heroes.

### OAuth Endpoints
- **GET** `/oauth2/authorization/google`
- **GET** `/oauth2/authorization/github`


## Screenshots

### Landing Page
![Landing Page](/screenshots/landingpage.png)

### Feed Page
![Feed Page](/screenshots/feedpage.png)

### Create Post Page
![Create Post Page](/screenshots/createpost.png)

### Display Page
![Display Page](/screenshots/displaypage.png)

## Future Enhancements

- Implement pagination or infinite scrolling for the feed.
- Add search and filter functionality for heroes.
- Allow users to upload images for hero profiles.

## License

This project is licensed under the [MIT License](LICENSE.txt).

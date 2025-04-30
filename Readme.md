# HeroWiki

HeroWiki is a community-driven platform where users can create, explore, and share information about fictional heroes. The platform allows users to create hero profiles, customize their appearance, and explore a feed of heroes contributed by others.

## Features

- **Hero Creation**: Users can create hero profiles with a title, description (Markdown supported), and customizable card colors.
- **Hero Feed**: A dynamic feed displaying all created heroes with upvote and downvote functionality.
- **Hero Details**: View detailed information about a hero on a dedicated display page.
- **Quotes Section**: A scrolling section of inspirational quotes from various lores and games.
- **Responsive Design**: Fully responsive UI with a dark theme for better readability.
- **Social Links**: Footer includes links to Instagram and LinkedIn profiles.

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
- **H2 Database**: For storing hero data (file-based).
- **Spring Data JPA**: For database interactions.
- **Spring Security**: For securing the API endpoints.

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
- **POST** `/api/heroes`: Create a new hero.
- **PUT** `/api/heroes/{id}`: Update an existing hero.


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

- Add user authentication and authorization.
- Implement pagination or infinite scrolling for the feed.
- Add search and filter functionality for heroes.
- Allow users to upload images for hero profiles.

## License

This project is licensed under the [MIT License](LICENSE.txt).

## Contact

- **Instagram**: [@aditya_fr_fr](https://www.instagram.com/aditya_fr_fr/)
- **LinkedIn**: [Devansh Soni](https://in.linkedin.com/in/devanshsoni19)

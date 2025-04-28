// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import FeedPage from './pages/FeedPage';
import CreatePostPage from './pages/CreatePostPage';
import DisplayPage from './pages/DisplayPage';
// Import Layout if you want a default wrapper, but we included it in pages
// import Layout from './components/Layout';

function App() {
    return (
        <Router>
            {/* Layout component is included within each specific page now */}
            {/* except LandingPage which has its own full-screen design */}
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/feed" element={<FeedPage />} />
                <Route path="/create" element={<CreatePostPage />} />
                <Route path="/hero/:id" element={<DisplayPage />} />

                {/* Optional: Add a 404 Not Found Route */}
                {/* <Route path="*" element={<NotFoundPage />} /> */}
            </Routes>
        </Router>
    );
}

export default App;

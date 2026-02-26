
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import FeedPage from './pages/FeedPage';
import CreatePostPage from './pages/CreatePostPage';
import DisplayPage from './pages/DisplayPage';
import ProfilePage from './pages/ProfilePage';
// import Layout from './components/Layout';

function App() {
    return (
        <Router>
            
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/feed" element={<FeedPage />} />
                <Route path="/create" element={<CreatePostPage />} />
                <Route path="/hero/:id" element={<DisplayPage />} />
                <Route path="/profile" element={<ProfilePage />} />


            </Routes>
        </Router>
    );
}

export default App;

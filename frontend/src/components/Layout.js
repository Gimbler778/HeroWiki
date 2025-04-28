import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

function Layout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            {/* Add backdrop-blur-sm to the main element */}
            <main className="flex-grow container mx-auto px-4 py-8 bg-base-100 bg-opacity-80 rounded-lg my-8 shadow-lg backdrop-blur-sm"> {/* <<< Added backdrop-blur-sm */}
                {children}
            </main>
            <Footer />
        </div>
    );
}

export default Layout;

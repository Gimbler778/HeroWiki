import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

function Layout({ children }) {
    return (
        <div>
            <Navbar />
            <div className="flex flex-col min-h-screen px-10">
                {/* Add bg-black and adjust bg-opacity */}
                <main className="flex-grow container mx-auto px-4 py-8 bg-black bg-opacity-40 rounded-lg my-8 shadow-lg backdrop-blur-sm">
                    {children}
                </main>
            </div>
            <Footer />
        </div>
    );
}

export default Layout;

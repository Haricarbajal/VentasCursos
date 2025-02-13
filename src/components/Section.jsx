import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Section() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    return (
        <div
            className="h-screen w-full bg-black p-6 shadow-md relative flex flex-col items-center justify-center"
            style={{
                backgroundImage: 'url(/bgBackend.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <nav className="absolute top-0 left-0 w-full flex items-center justify-between p-4 text-white shadow-lg">
                <a href="/" className="text-5xl font-bold font-sans">VC</a>
                <div className="flex items-center space-x-6">
                    <a href="section" className="text-3xl hover:text-yellow-400 transition-all font-sans">Home</a>
                    <a href="#" className="text-3xl hover:text-yellow-400 transition-all font-sans">About</a>
                    <button
                        className="text-white text-5xl font-semibold transition-all duration-300 hover:text-yellow-400 font-sans"
                        onClick={toggleMenu}
                    >
                        ≣
                    </button>
                </div>
            </nav>
            <motion.div
                className="fixed top-0 right-0 w-[250px] h-full bg-black/70 text-white p-6 transition-transform duration-500"
                initial={{ x: 300 }}
                animate={{ x: menuOpen ? 0 : 300 }}
                exit={{ x: 300 }}
            >
                <button
                    className="absolute top-6 right-6 text-3xl text-white hover:text-yellow-400 transition-all"
                    onClick={toggleMenu}
                >
                    ×
                </button>
                <div className="flex flex-col space-y-6">
                    <a href="section/backend" className="text-2xl font-semibold hover:text-yellow-400 transition-all">Backend</a>
                    <a href="frontEnd" className="text-2xl font-semibold hover:text-yellow-400 transition-all">FrontEnd</a>
                    <a href="hackingEtico" className="text-2xl font-semibold hover:text-yellow-400 transition-all">Hacking Ético</a>
                    <a href="frameWorks" className="text-2xl font-semibold hover:text-yellow-400 transition-all">FrameWorks</a>
                    <a href="all" className="text-2xl font-semibold hover:text-yellow-400 transition-all">All</a>
                </div>
            </motion.div>

        </div>
    );
}

export default Section;
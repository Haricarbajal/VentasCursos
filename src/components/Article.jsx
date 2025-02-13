import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Article() {

    const logout = () => {
        localStorage.removeItem('usuario'); // Elimina el item con la key 'usuario' del localStorage
        console.log('Usuario eliminado del localStorage');
    };

    const [menuOpen, setMenuOpen] = useState(false);

    //const toggleMenu = () => setMenuOpen(!menuOpen);

    const cards = [
        {
            img: "/kotlin.png",
            title: "Kotlin",
            description: "Kotlin es un lenguaje moderno para Android, rápido y seguro.",
        },
        {
            img: "/bash.png",
            title: "Java",
            description: "Java es un lenguaje robusto usado en aplicaciones empresariales y móviles.",
        },
        {
            img: "/js.png",
            title: "Python",
            description: "Python es ideal para ciencia de datos, IA y desarrollo web.",
        }
    ];

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % cards.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const [usuarioAlmacenado, setUsuarioAlmacenado] = useState(null);

    useEffect(() => {
        const usuario = localStorage.getItem("usuario");
        if (usuario) {
            setUsuarioAlmacenado(JSON.parse(usuario));
        }
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div
            className="h-screen w-full bg-black p-6 shadow-md relative flex flex-col items-center justify-center"
            style={{
                backgroundImage: 'url(/bgBackend.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* NAVBAR */}
            <nav className="absolute top-0 left-0 w-full flex items-center justify-between p-4 text-white shadow-lg">
                <a href="/" className="text-5xl font-bold font-sans">VC</a>
                <div className="flex items-center space-x-6">
                    <a href="/section/" className="text-3xl hover:text-yellow-400 transition-all font-sans">Home</a>
                    {/*<a href="#" className="text-3xl hover:text-yellow-400 transition-all font-sans">About</a>
                    <button
                        className="text-white text-5xl font-semibold transition-all duration-300 hover:text-yellow-400 font-sans"
                        onClick={toggleMenu}
                    >
                        ≣
                    </button>*/}
                    {usuarioAlmacenado ? (
                        <button onClick={logout}>Logout</button>
                    ) :
                        <h1></h1>
                    }
                    {usuarioAlmacenado ? (
                        <img src="/userIcon.png" alt="Usuario" className="w-16 h-16 rounded-full mx-auto" onClick={() => setIsModalOpen(true)} />
                    ) : (
                        <a href="/login" className="text-blue-600 hover:underline">Login</a>
                    )}
                </div>
            </nav>

            {/* Menú lateral */}
            {/*<motion.div
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
            </motion.div>*/}
            <h1 className="text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] font-extrabold text-center 
    relative bg-clip-text text-transparent bg-gradient-to-r from-[#0D4B67] via-[#00A9FF] to-[#00A9FF] 
    drop-shadow-2xl hover:scale-110 hover:drop-shadow-4xl transition-all duration-500">
                Desata tu potencial
            </h1>


            {/* CARRUSEL DE CARDS */}
            <div className="relative flex flex-col items-center">
                <div className="relative w-[700px] h-[400px] flex items-center justify-center">
                    <AnimatePresence>
                        {cards.map((card, i) => (
                            <motion.div
                                key={card.id} // Usar un id único si está disponible, sino usa el índice 'i'
                                className="absolute w-[500px] h-[300px] rounded-2xl bg-white/10 backdrop-blur-lg 
                                border border-white/30 shadow-lg shadow-black/30 flex flex-col items-center 
                                justify-center text-white text-center p-6"
                                style={{ transformOrigin: "center", zIndex: i === index ? 10 : 1 }} // Asegurar que la tarjeta activa esté al frente
                                initial={{ opacity: 0, scale: 0.8, x: i === index ? 0 : i < index ? -600 : 600 }} // Posiciona las tarjetas fuera de la pantalla
                                animate={{
                                    opacity: i === index ? 1 : 0.4,
                                    scale: i === index ? 1.1 : 0.8,
                                    x: i === index ? 0 : i < index ? -600 : 600, // Hacer que las tarjetas se muevan fuera de la pantalla
                                }}
                                exit={{ opacity: 0, scale: 0.8, x: i < index ? 600 : -600 }} // Desplazar fuera de la pantalla
                                transition={{ duration: 0.6 }}
                            >
                                <img src={card.img} alt={card.title} className="w-[100px] h-auto mb-4" />
                                <h2 className="text-4xl font-bold">{card.title}</h2>
                                <p className="text-lg opacity-80">{card.description}</p>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
                <div className="flex space-x-4 mt-4">
                    {cards.map((_, i) => (
                        <button
                            key={i}
                            className={`w-4 h-4 rounded-full transition-all ${i === index ? "bg-white scale-125" : "bg-gray-500"}`}
                            onClick={() => setIndex(i)}
                        />
                    ))}
                </div>
                <button
                    className="mt-8 px-8 py-4 text-2xl font-semibold text-white bg-gradient-to-r from-[#00A9FF] to-[#0D4B67] rounded-full shadow-lg hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-l transition-all duration-300 ease-in-out transform"
                    onClick={() => {
                        window.scrollBy({
                            top: 980,
                            behavior: 'smooth'
                        });
                    }}
                >
                    TODOS LOS CURSOS
                </button>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
                    <div className="bg-white p-8 rounded-xl shadow-2xl text-center relative z-50 transform transition-all duration-300 ease-in-out hover:scale-105">
                        <img
                            src="/furPersona.jpg"
                            alt="Perfil"
                            className="w-24 h-24 mx-auto rounded-full border-4 border-white shadow-lg hover:shadow-xl transition-shadow duration-300"
                        />

                        <p className="mt-4 text-lg font-semibold text-gray-800">{usuarioAlmacenado.correo}</p>

                        <div className="flex flex-col space-y-4 mt-6">
                            <a href="/courses/misCursos">
                                <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                    Mis Cursos
                                </button>
                            </a>
                            <button
                                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Article;

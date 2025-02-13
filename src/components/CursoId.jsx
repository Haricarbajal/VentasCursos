import { useState, useEffect } from "react";

export default function CursoId({ curso }) {
    const [likes, setLikes] = useState(curso.likes || 0);

    const handleLike = async () => {
        try {
            const url = `https://ventascursos-f91c8-default-rtdb.firebaseio.com/cursos/${curso.id - 1}/likes.json`;
            const newLikes = likes + 1;

            const response = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newLikes),
            });

            if (!response.ok) throw new Error('Error al actualizar los likes');

            setLikes(newLikes);
        } catch (error) {
            console.error(`Error al actualizar los likes para el curso ${curso.id}:`, error);
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleShowContent = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };


    const [usuarioAlmacenado, setUsuarioAlmacenado] = useState(null);

    useEffect(() => {
        const usuario = localStorage.getItem("usuario");
        if (usuario) {
            setUsuarioAlmacenado(JSON.parse(usuario));
        }
    }, []);

    const URL = 'https://ventascursos-f91c8-default-rtdb.firebaseio.com'

    const agregarAlCarrito = async (curso) => {
        try {
            const response = await fetch(`${URL}/carrito.json`);
            const carritoActual = await response.json() || [];

            const nuevoCarrito = [...carritoActual, {
                titulo: curso.titulo,
                imagen: curso.imagen,
                duracion: curso.duracion,
                categoria: curso.categoria,
                precio: curso.precio
            }];

            await fetch(`${URL}/carrito.json`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevoCarrito)
            });
        } catch (error) {
            console.error('Error al agregar al carrito:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex space-x-6 items-center justify-start p-4">
                    <a href="/carrito" className="text-2xl hover:text-gray-200 transition-all bg-white p-2 rounded-full shadow-md">
                        🛒
                    </a>
                    <a href="/section" className="text-2xl hover:text-gray-200 transition-all bg-white p-2 rounded-full shadow-md">
                        ⟵
                    </a>
                </div>

                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <img
                        src={curso.imagen}
                        alt={curso.titulo}
                        className="w-full h-64 object-cover"
                    />
                    <div className="p-8">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-3xl font-bold text-gray-900">
                                {curso.titulo}
                            </h1>
                            {usuarioAlmacenado ? (
                                <button
                                    onClick={handleLike}
                                    className="focus:outline-none"
                                >
                                    <img
                                        id="corazonImg"
                                        src="/corazon.png"
                                        alt="Corazón"
                                        className="w-8 h-8 filter grayscale hover:grayscale-0 transition-all duration-300"
                                    />
                                </button>) :
                                (
                                    <h1></h1>
                                )
                            }
                            <span className="ml-2 text-gray-600">Likes: {likes}</span>
                        </div>
                        <p className="text-gray-600 mb-6">{curso.body}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                            <div>
                                <p className="text-gray-600">
                                    <span className="font-semibold">Duración:</span> {curso.duracion}
                                </p>
                                <p className="text-gray-600">
                                    <span className="font-semibold">Categoría:</span> {curso.categoria}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-600">
                                    <span className="font-semibold">Precio:</span> ${curso.precio}
                                </p>
                                <p className="text-gray-600">
                                    <span className="font-semibold">Idiomas:</span> {curso.idiomas.join(", ")}
                                </p>
                            </div>
                        </div>
                        <div className="border-t border-gray-200 pt-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                Opiniones de los estudiantes
                            </h2>
                            <ul className="space-y-4">
                                {curso.opiniones.map((opinion, index) => (
                                    <li key={index} className="bg-gray-50 p-4 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <span className="text-lg font-semibold text-gray-800">
                                                {opinion.usuario}
                                            </span>
                                            <span className="text-yellow-500">
                                                {"★".repeat(opinion.puntuacion)}
                                                {"☆".repeat(5 - opinion.puntuacion)}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 mt-2">
                                            {opinion.comentario}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {usuarioAlmacenado ? (
                            <button onClick={agregarAlCarrito(curso)} className="w-full mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all">Comprar</button>)
                            :
                            (
                                <h1></h1>
                            )}
                    </div>
                    {usuarioAlmacenado ? (
                        <button onClick={handleShowContent} className="w-full mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all">Mostrar Contenido</button>) : (
                        <h1></h1>
                    )
                    }
                    {isModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                            <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 p-4">
                                <div className="relative">
                                    <button
                                        onClick={handleCloseModal}
                                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
                                    >
                                        ✖️
                                    </button>
                                    <iframe
                                        width="100%"
                                        height="400"
                                        src={curso.url}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="rounded-lg"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
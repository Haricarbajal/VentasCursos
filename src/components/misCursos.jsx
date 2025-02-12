import { useState, useEffect } from "react";

function MisCursos() {
    const [cursos, setCursos] = useState([]); // Estado para almacenar los cursos
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la apertura/cierre del modal
    const [cursoSeleccionado, setCursoSeleccionado] = useState(null); // Estado para almacenar el curso seleccionado

    const URL = 'https://ventascursos-f91c8-default-rtdb.firebaseio.com';

    // Obtener los cursos desde el archivo JSON

    useEffect(() => {
        const obtenerCursos = async () => {
            try {
                // Obtener el usuario desde localStorage
                const usuario = JSON.parse(localStorage.getItem('usuario'));
                if (!usuario || !usuario.correo) {
                    console.error('No hay usuario registrado.');
                    return;
                }
                const correoUsuario = usuario.correo;

                // Reemplazar caracteres problemáticos en el correo
                const correoUsuarioSeguro = correoUsuario.replace(/[.\#$\[\]]/g, "_");

                // Obtener los cursos del usuario desde misCursos
                const response = await fetch(`${URL}/misCursos.json`);
                const data = await response.json();

                // Verificar si existen cursos para el usuario
                if (data && data[correoUsuarioSeguro]) {
                    setCursos(data[correoUsuarioSeguro]); // Asignar los cursos del usuario
                } else {
                    console.log('No hay cursos disponibles para este usuario.');
                    setCursos([]); // Si no hay cursos, establecer un array vacío
                }
            } catch (error) {
                console.error("Error al obtener los cursos:", error);
            }
        };

        obtenerCursos();
    }, []); // El array vacío asegura que solo se ejecute una vez al montar el componente


    // Función para abrir el modal y seleccionar el curso
    const handleShowContent = (curso) => {
        setCursoSeleccionado(curso);
        setIsModalOpen(true); // Abre el modal
    };

    // Función para cerrar el modal
    const handleCloseModal = () => {
        setIsModalOpen(false); // Cierra el modal
        setCursoSeleccionado(null); // Resetear el curso seleccionado
    };

    return (
        <div>
            <nav className="bg-blue-600 text-white py-4 px-8 shadow-lg flex justify-between items-center">
                <a href="/section/" className="text-2xl font-bold hover:text-gray-200 transition-all">VC</a>
                <a href="/courses/misCursos" className="text-lg hover:text-gray-200 transition-all">Mis Cursos</a>
            </nav>
            <div className="max-w-7xl mx-auto p-8">
                <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
                    Lista de Mis Cursos
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cursos.map((curso) => (
                        <div key={curso.id} className="bg-white shadow-lg rounded-lg overflow-hidden transition transform hover:scale-105 hover:shadow-2xl">
                            <img src={curso.imagen} alt={curso.titulo} className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{curso.titulo}</h2>
                                <p className="text-gray-600 mb-2">
                                    <span className="font-semibold">Duración:</span> {curso.duracion}
                                </p>
                                <p className="text-gray-600 mb-2">
                                    <span className="font-semibold">Categoría:</span> {curso.categoria}
                                </p>
                                <p className="text-gray-600 mb-4">
                                    <span className="font-semibold">Precio:</span> ${curso.precio}
                                </p>
                                <p className="text-gray-600 mb-4">
                                    <span className="font-semibold">Idiomas:</span> {curso.idiomas.join(", ")}
                                </p>
                                <p className="text-gray-600 mb-4">
                                    <span className="font-semibold">Nivel:</span> {curso.nivel}
                                </p>
                                <p className="text-gray-600 mb-4">
                                    <span className="font-semibold">Instructor:</span> {curso.Instructor}
                                </p>
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">Temario:</h3>
                                <ul className="list-disc list-inside space-y-2 mb-4">
                                    {curso.Temario.map((tema, index) => (
                                        <li key={index} className="text-gray-600">{tema}</li>
                                    ))}
                                </ul>

                                <h3 className="text-xl font-semibold text-gray-700 mb-2">Opiniones:</h3>
                                <ul className="list-disc list-inside space-y-2 mb-4">
                                    {curso.opiniones.map((opinion, index) => (
                                        <li key={index} className="text-gray-600">
                                            <span className="font-semibold">{opinion.usuario}:</span> {opinion.comentario}
                                            <span className="font-bold">(Puntuación: {opinion.puntuacion})</span>
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    onClick={() => handleShowContent(curso)}
                                    className="w-full mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all"
                                >
                                    Mostrar Contenido
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {isModalOpen && cursoSeleccionado && (
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
                                    src={cursoSeleccionado.url}
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
    );
}

export default MisCursos;
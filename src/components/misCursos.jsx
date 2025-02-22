import { useState, useEffect } from "react";

function MisCursos() {
    const [cursos, setCursos] = useState([]); // Estado para almacenar los cursos
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la apertura/cierre del modal
    const [cursoSeleccionado, setCursoSeleccionado] = useState(null); // Estado para almacenar el curso seleccionado
    const [idiomaActual, setIdiomaActual] = useState("")

    useEffect(() => {
        const idioma = localStorage.getItem("idioma");
        if (idioma) {
            setIdiomaActual(idioma);
        }
    }, []);

    const URL = 'https://ventascursos-f91c8-default-rtdb.firebaseio.com';

    useEffect(() => {
        const obtenerCursos = async () => {
            try {
                const usuario = JSON.parse(localStorage.getItem('usuario'));
                if (!usuario || !usuario.correo) {
                    console.error('No hay usuario registrado.');
                    return;
                }
                const correoUsuario = usuario.correo;
                const correoUsuarioSeguro = correoUsuario.replace(/[.\#$\[\]]/g, "_");

                const response = await fetch(`${URL}/misCursos.json`);
                const data = await response.json();
                if (data && data[correoUsuarioSeguro]) {
                    setCursos(data[correoUsuarioSeguro]);
                } else {
                    console.log('No hay cursos disponibles para este usuario.');
                    setCursos([]);
                }
            } catch (error) {
                console.error("Error al obtener los cursos:", error);
            }
        };

        obtenerCursos();
    }, []);


    
    const handleShowContent = (curso) => {
        setCursoSeleccionado(curso);
        setIsModalOpen(true);
    };

    
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCursoSeleccionado(null);
    };

    return (
        <div>
            <nav className="bg-blue-600 text-white py-4 px-8 shadow-lg flex justify-between items-center">
                <a href="/section/" className="text-2xl font-bold hover:text-gray-200 transition-all">VC</a>
                <a href="/courses/misCursos" className="text-lg hover:text-gray-200 transition-all">{idiomaActual == "es" ? "Mis Cursos" : "My Courses"}</a>
            </nav>
            <div className="max-w-7xl mx-auto p-8">
                <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
                    {idiomaActual == "es" ? "Lista de mis Cursos" : "List of my courses"}
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cursos.map((curso) => (
                        <div key={curso.id} className="bg-white shadow-lg rounded-lg overflow-hidden transition transform hover:scale-105 hover:shadow-2xl">
                            <img src={curso.imagen} alt={curso.titulo[idiomaActual]} className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{curso.titulo[idiomaActual]}</h2>
                                <p className="text-gray-600 mb-2">
                                    <span className="font-semibold">{idiomaActual == "es" ? "Duracion" : "Duration"}:</span> {curso.duracion}
                                </p>
                                <p className="text-gray-600 mb-2">
                                    <span className="font-semibold">{idiomaActual == "es" ? "Categoria" : "Category"}:</span> {curso.categoria}
                                </p>
                                <p className="text-gray-600 mb-4">
                                    <span className="font-semibold">{idiomaActual == "es" ? "Precio" : "Price"}:</span> ${curso.precio}
                                </p>
                                <p className="text-gray-600 mb-4">
                                    <span className="font-semibold">{idiomaActual == "es" ? "Idioma" : "Laguage"}:</span> {curso.idiomas.join(", ")}
                                </p>
                                <p className="text-gray-600 mb-4">
                                    <span className="font-semibold">{idiomaActual == "es" ? "Nivel" : "Level"}:</span> {curso.nivel}
                                </p>
                                <p className="text-gray-600 mb-4">
                                    <span className="font-semibold">{idiomaActual == "es" ? "Instructor" : "Intructuor"}:</span> {curso.Instructor}
                                </p>
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">{idiomaActual == "es" ? "Temario" : "Syllabus"}:</h3>
                                <ul className="list-disc list-inside space-y-2 mb-4">
                                    {curso.Temario.map((tema, index) => (
                                        <li key={index} className="text-gray-600">{tema}</li>
                                    ))}
                                </ul>

                                <h3 className="text-xl font-semibold text-gray-700 mb-2">{idiomaActual == "es" ? "Opiniones" : "Opinions"}:</h3>
                                <ul className="list-disc list-inside space-y-2 mb-4">
                                    {curso.opiniones.map((opinion, index) => (
                                        <li key={index} className="text-gray-600">
                                            <span className="font-semibold">{opinion.usuario}:</span> {opinion.comentario}
                                            <span className="font-bold">({idiomaActual == "es" ? "Puntuacion" : "Rating"}: {opinion.puntuacion})</span>
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    onClick={() => handleShowContent(curso)}
                                    className="w-full mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all"
                                >
                                    {idiomaActual == "es" ? "Mostrar Contenido" : "Show Content"}
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
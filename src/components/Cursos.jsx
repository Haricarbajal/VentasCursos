import { h1, u } from "framer-motion/client";
import { useState, useEffect } from "react";

function Cursos() {
    const [searchVisible, setSearchVisible] = useState(false); // Estado para mostrar/ocultar la barra de búsqueda
    const [searchTerm, setSearchTerm] = useState(""); // Estado para almacenar el término de búsqueda
    const [cursos, setCursos] = useState([]); // Estado para almacenar los cursos desde Firebase
    const [filtrosVisible, setFiltrosVisible] = useState(false); // Estado para mostrar/ocultar los botones de filtro
    const [categoriaFiltro, setCategoriaFiltro] = useState(""); // Estado para almacenar la categoría seleccionada
    const [contadorCarrito, setContadorCarrito] = useState(0)
    const [idiomaActual, setIdiomaActual] = useState("")
    const [moneda, setMoneda] = useState("$")

    useEffect(() => {
        const idioma = localStorage.getItem("idioma");
        if (idioma) {
            setIdiomaActual(idioma);
        }
    }, []);

    useEffect(() => {
        const monedaActual = localStorage.getItem("moneda");
        if(monedaActual){
            setMoneda(monedaActual)
        }
    })

    const URL = 'https://ventascursos-f91c8-default-rtdb.firebaseio.com'
    useEffect(() => {
        const obtenerCursos = async () => {
            try {
                const response = await fetch(
                    `${URL}/cursos.json`
                );
                const data = await response.json();
                setCursos(data);
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        };
        obtenerCursos();
    }, []);

    const filteredCursos = cursos.filter((curso) => {
        const coincideBusqueda =
            curso.titulo[idiomaActual].toLowerCase().includes(searchTerm.toLowerCase()) ||
            curso.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
            curso.idiomas.join(", ").toLowerCase().includes(searchTerm.toLowerCase());

        const coincideCategoria = categoriaFiltro ? curso.categoria === categoriaFiltro : true;

        return coincideBusqueda && coincideCategoria;
    });

    const agregarAlCarrito = async (curso) => {
        try {
            const usuario = JSON.parse(localStorage.getItem('usuario'));
            if (!usuario || !usuario.correo) {
                console.error('No hay usuario registrado.');
                return;
            }
            const correoUsuario = usuario.correo;

            // Reemplazar caracteres problemáticos en el correo (por ejemplo, @ y .)
            const correoUsuarioSeguro = correoUsuario.replace(/[.\#$\[\]]/g, "_");

            const misCursosResponse = await fetch(`${URL}/misCursos.json`);
            const misCursosData = await misCursosResponse.json();

            const carritoResponse = await fetch(`${URL}/carrito.json`);
            const carritoActual = await carritoResponse.json() || [];

            if (misCursosData && misCursosData[correoUsuarioSeguro]) {
                const cursosUsuario = misCursosData[correoUsuarioSeguro];
                const cursoEnMisCursos = cursosUsuario.some(cursoGuardado => cursoGuardado.id === curso.id);

                if (cursoEnMisCursos) {
                    alert('¡Este curso ya está en tu lista de cursos! No puedes comprarlo nuevamente.');
                    return;
                }
            }


            const cursoEnCarrito = carritoActual.some(cursoGuardado => cursoGuardado.id === curso.id);

            if (cursoEnCarrito) {
                alert('¡Este curso ya está en tu carrito! No puedes agregarlo nuevamente.');
                return;
            }

            console.log('Curso no encontrado en misCursos ni en el carrito. Agregando al carrito...');

            const nuevoCarrito = [...carritoActual, curso];

            await fetch(`${URL}/carrito.json`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevoCarrito)
            });
            console.log('Curso agregado al carrito correctamente.');
            setContadorCarrito(prev => prev + 1)
        } catch (error) {
            console.error('Error al agregar al carrito:', error);
        }
    };


    async function handleLike(id, currentLikes) {
        try {
            const url = `${URL}/cursos/${id - 1}/likes.json`;
            const newLikes = currentLikes + 1;

            const response = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newLikes),
            });

            if (!response.ok) throw new Error('Error al actualizar los likes');

            setCursos(prevCursos => prevCursos.map(curso =>
                curso.id === id ? { ...curso, likes: newLikes } : curso
            ));
        } catch (error) {
            console.error(`Error al actualizar los likes para el curso ${id}:`, error);
        }
    }

    const [usuarioAlmacenado, setUsuarioAlmacenado] = useState(null);

    useEffect(() => {
        const usuario = localStorage.getItem("usuario");
        if (usuario) {
            setUsuarioAlmacenado(JSON.parse(usuario));
        }
    }, []);
    return (
        <div className="max-w-7xl mx-auto p-8">
            {/* Título, botón de filtros y lupa */}
            <div className="flex items-center justify-center mb-10 space-x-8">
                {/* Botón de filtros */}
                {idiomaActual === "es" ? (
                    <>
                        <button
                            onClick={() => setFiltrosVisible(!filtrosVisible)}
                            className="text-gray-600 hover:text-gray-800 transition-all text-lg"
                        >
                            Filtros
                        </button>
                        <h1 className="text-5xl font-bold text-gray-800 flex-1 text-center">
                            Cursos Disponibles
                        </h1>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => setFiltrosVisible(!filtrosVisible)}
                            className="text-gray-600 hover:text-gray-800 transition-all text-lg"
                        >
                            Filters
                        </button>
                        <h1 className="text-5xl font-bold text-gray-800 flex-1 text-center">
                            Courses Available
                        </h1>
                    </>
                )}
                <button
                    onClick={() => setSearchVisible(!searchVisible)}
                    className="text-gray-600 hover:text-gray-800 transition-all text-lg"
                >
                    🔍
                </button>

                <h1 className="absolute right-[17.5%]">{contadorCarrito}</h1>
                <a href="/carrito" className="text-lg">
                    🛒
                </a>
            </div>

            {filtrosVisible && (
                <div className="flex justify-center space-x-4 mb-8">
                    {idiomaActual == "es" ? (
                        <>
                            <button
                                onClick={() => setCategoriaFiltro("Frontend")}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                            >
                                Frontend
                            </button>
                            <button
                                onClick={() => setCategoriaFiltro("Ciberseguridad")}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
                            >
                                Ciberseguridad
                            </button>
                            <button
                                onClick={() => setCategoriaFiltro("Backend")}
                                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all"
                            >
                                Backend
                            </button>
                            <button
                                onClick={() => setCategoriaFiltro("")} // Limpiar filtro
                                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all"
                            >
                                Limpiar filtro
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => setCategoriaFiltro("Frontend")}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                            >
                                Frontend
                            </button>
                            <button
                                onClick={() => setCategoriaFiltro("Ciberseguridad")}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
                            >
                                Cibersecurity
                            </button>
                            <button
                                onClick={() => setCategoriaFiltro("Backend")}
                                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all"
                            >
                                Backend
                            </button>
                            <button
                                onClick={() => setCategoriaFiltro("")} // Limpiar filtro
                                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all"
                            >
                                Clean Filters
                            </button>
                        </>
                    )
                    }

                </div>
            )}

            {searchVisible && (
                <div className="flex justify-center mb-8">
                    <input
                        type="text"
                        placeholder="Buscar cursos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCursos.map((curso) => (
                    <div
                        key={curso.id}
                        className="bg-white shadow-lg rounded-lg overflow-hidden transition transform hover:scale-105 hover:shadow-2xl"
                    >
                        <img
                            src={curso.imagen}
                            alt={curso.titulo[idiomaActual]}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                            {idiomaActual == "es" ? (
                                <>
                                    <a href={`/courses/${curso.id}`} className="text-2xl font-semibold text-gray-800 mb-2">
                                        {curso.titulo[idiomaActual]}
                                    </a>
                                    <p className="text-gray-600 mb-2">
                                        <span className="font-semibold">Duración:</span> {curso.duracion}
                                    </p>
                                    <p className="text-gray-600 mb-2">
                                        <span className="font-semibold">Categoría:</span> {curso.categoria}
                                    </p>
                                    <p className="text-gray-600 mb-4">
                                        <span className="font-semibold">Precio:</span>{moneda}{curso.precio}
                                    </p>
                                    <p className="text-gray-600 mb-4">
                                        <span className="font-semibold">Idiomas:</span> {curso.idiomas.join(", ")}
                                    </p>
                                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                        Opiniones:
                                    </h3>
                                    <ul className="list-disc list-inside space-y-2">
                                        {curso.opiniones.map((opinion, index) => (
                                            <li key={index} className="text-gray-600">
                                                <span className="font-semibold">{opinion.usuario}:</span> {opinion.comentario}{" "}
                                                <span className="font-bold">(Puntuación: {opinion.puntuacion})</span>
                                            </li>
                                        ))}
                                    </ul>
                                    {usuarioAlmacenado ? (
                                        <button
                                            onClick={() => handleLike(curso.id, curso.likes)}
                                        >
                                            <img
                                                id="corazonImg"
                                                src="/corazon.png"
                                                alt="Corazón"
                                                class="w-8 h-8 filter grayscale hover:grayscale-0 transition-all duration-300"
                                            />
                                        </button>
                                    ) : (
                                        <h1></h1>
                                    )
                                    }
                                    <p><strong>Likes:</strong> {curso.likes}</p>
                                    {usuarioAlmacenado ? (
                                        <button
                                            onClick={() => agregarAlCarrito(curso)}
                                            className="w-full mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all"
                                        >
                                            Comprar
                                        </button>
                                    ) :
                                        (
                                            <h1></h1>
                                        )
                                    }
                                </>
                            ) : (
                                <>
                                    <a href={`/courses/${curso.id}`} className="text-2xl font-semibold text-gray-800 mb-2">
                                        {curso.titulo[idiomaActual]}
                                    </a>
                                    <p className="text-gray-600 mb-2">
                                        <span className="font-semibold">Duration:</span> {curso.duracion}
                                    </p>
                                    <p className="text-gray-600 mb-2">
                                        <span className="font-semibold">Category:</span> {curso.categoria}
                                    </p>
                                    <p className="text-gray-600 mb-4">
                                        <span className="font-semibold">Price:</span>{moneda}{curso.precio*1.05}
                                    </p>
                                    <p className="text-gray-600 mb-4">
                                        <span className="font-semibold">Languages:</span> {curso.idiomas.join(", ")}
                                    </p>
                                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                        Opinions:
                                    </h3>
                                    <ul className="list-disc list-inside space-y-2">
                                        {curso.opiniones.map((opinion, index) => (
                                            <li key={index} className="text-gray-600">
                                                <span className="font-semibold">{opinion.usuario}:</span> {opinion.comentario}{" "}
                                                <span className="font-bold">(Rating: {opinion.puntuacion})</span>
                                            </li>
                                        ))}
                                    </ul>
                                    {usuarioAlmacenado ? (
                                        <button
                                            onClick={() => handleLike(curso.id, curso.likes)}
                                        >
                                            <img
                                                id="corazonImg"
                                                src="/corazon.png"
                                                alt="Corazón"
                                                class="w-8 h-8 filter grayscale hover:grayscale-0 transition-all duration-300"
                                            />
                                        </button>
                                    ) : (
                                        <h1></h1>
                                    )
                                    }
                                    <p><strong>Likes:</strong> {curso.likes}</p>
                                    {usuarioAlmacenado ? (
                                        <button
                                            onClick={() => agregarAlCarrito(curso)}
                                            className="w-full mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all"
                                        >
                                            Buy
                                        </button>
                                    ) :
                                        (
                                            <h1></h1>
                                        )
                                    }
                                </>
                            )
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Cursos;
import { useState, useEffect } from "react";

function Carrito() {
    const [carrito, setCarrito] = useState([]);
    const URL = 'https://ventascursos-f91c8-default-rtdb.firebaseio.com';

    // Obtener la lista del carrito desde Firebase
    useEffect(() => {
        const obtenerCarrito = async () => {
            try {

                const response = await fetch(`${URL}/carrito.json`);
                const data = await response.json();
                setCarrito(data || []);
            } catch (error) {
                console.error("Error al obtener el carrito:", error);
            }
        };
        obtenerCarrito();
    }, []);

    const eliminarDelCarrito = async (index) => {
        try {
            const nuevoCarrito = carrito.filter((_, i) => i !== index);
            await fetch(`${URL}/carrito.json`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevoCarrito)
            });
            setCarrito(nuevoCarrito);
        } catch (error) {
            console.error("Error al eliminar el curso del carrito:", error);
        }
    };

    const comprar = async () => {
        try {
            // Obtener el usuario del localStorage
            const usuario = JSON.parse(localStorage.getItem('usuario'));
            if (!usuario || !usuario.correo) {
                console.error('No hay usuario registrado.');
                return; // Si no hay usuario registrado, no podemos continuar.
            }
            const correoUsuario = usuario.correo;

            // Reemplazar caracteres problemáticos en el correo (por ejemplo, @ y .)
            const correoUsuarioSeguro = correoUsuario.replace(/[.\#$\[\]]/g, "_");

            // Obtener la lista actual de misCursos
            const responseMisCursos = await fetch(`${URL}/misCursos.json`);
            const misCursosData = await responseMisCursos.json();
            let misCursos = misCursosData ? misCursosData : {};  // Asegurarse de que sea un objeto vacío si no existe

            // Verificar si el usuario ya tiene una lista en misCursos
            if (!misCursos[correoUsuarioSeguro]) {
                misCursos[correoUsuarioSeguro] = []; // Si no existe, inicializar como un array vacío
            }

            // Agregar los cursos del carrito a misCursos
            misCursos[correoUsuarioSeguro] = [...misCursos[correoUsuarioSeguro], ...carrito];

            // Actualizar misCursos en la base de datos
            await fetch(`${URL}/misCursos.json`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(misCursos)
            });

            // Eliminar el carrito después de la compra
            await fetch(`${URL}/carrito.json`, {
                method: 'DELETE'
            });

            setCarrito([]);
            alert("¡Muchas gracias por tu compra!");
        } catch (error) {
            console.error("Error al completar la compra:", error);
        }
    };


    // Calcular el precio total
    const precioTotal = carrito.reduce((total, item) => total + item.precio, 0);

    return (
        <div>
            {/* Menú de navegación */}
            <nav className="bg-blue-600 text-white py-4 px-8 shadow-lg flex justify-between items-center">
                <a href="/section/" className="text-2xl font-bold hover:text-gray-200 transition-all">VC</a>
                <a href="/courses/misCursos" className="text-lg hover:text-gray-200 transition-all">Mis Cursos</a>
            </nav>

            <div className="max-w-7xl mx-auto p-8 grid grid-cols-3 gap-8">
                {/* Lista de productos en el carrito */}
                <div className="col-span-2">
                    <h1 className="text-3xl font-bold mb-6">Carrito</h1>
                    <div className="space-y-6">
                        {carrito.map((curso, index) => (
                            <div key={index} className="flex items-center p-4 bg-white shadow-md rounded-lg">
                                <img src={curso.imagen} alt={curso.titulo} className="w-24 h-24 object-cover rounded-lg" />
                                <div className="ml-4 flex-1">
                                    <h2 className="text-xl font-semibold">{curso.titulo}</h2>
                                    <p className="text-gray-600">{curso.duracion} - {curso.categoria}</p>
                                    <p className="text-lg font-bold">${curso.precio.toFixed(2)}</p>
                                </div>
                                <button
                                    onClick={() => eliminarDelCarrito(index)}
                                    className="ml-4 text-red-600 hover:text-red-800 text-xl font-bold"
                                >
                                    ✖
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Barra lateral con total y botón de compra */}
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Resumen</h2>
                    <p className="text-lg">Total a pagar: <span className="font-bold">${precioTotal.toFixed(2)}</span></p>
                    <button onClick={comprar} className="mt-6 w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-all">
                        Comprar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Carrito;
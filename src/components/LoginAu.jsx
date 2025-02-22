import { useState } from "react";

const LoginAu = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const URL = 'https://ventascursos-f91c8-default-rtdb.firebaseio.com';

    const verificarUsuario = async () => {
        try {
            const response = await fetch(`${URL}/usuarios.json`);
            const usuarios = await response.json() || [];

            const usuarioEncontrado = usuarios.find(usuario => usuario.correo === email);

            if (usuarioEncontrado && usuarioEncontrado.password === password) {
                alert('Usuario logueado correctamente.');
                localStorage.setItem('usuario', JSON.stringify(usuarioEncontrado));
                navigate('/section/');
            } else {
                alert('Credenciales no coinciden, inténtelo de nuevo.');
            }
        } catch (error) {
            console.error('Error al verificar usuario:', error);
        }
    };

    return (
        <div className="w-96 mx-auto mt-10 p-8 border rounded-lg shadow-xl bg-white">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Iniciar Sesión</h2>
            <input
                type="email"
                placeholder="Correo Electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                onClick={verificarUsuario}
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
                Iniciar Sesión
            </button>
            <div className="mt-4 text-center">
                <span className="text-gray-600">¿No tienes una cuenta? </span>
                <a href="/register" className="text-blue-600 hover:underline">
                    Regístrate aquí
                </a>
            </div>
        </div>
    );
};

export default LoginAu;
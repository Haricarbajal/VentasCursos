import { useState } from "react";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const URL = 'https://ventascursos-f91c8-default-rtdb.firebaseio.com';

    const registrarUsuario = async () => {
        try {
            const user = {
                email,
                password
            };

            // Obtener la lista de usuarios actual
            const response = await fetch(`${URL}/usuarios.json`);
            const usuarioActual = await response.json() || [];

            // Verificar si el correo ya existe
            const correoExiste = usuarioActual.some(usuario => usuario.correo === user.email);

            if (correoExiste) {
                alert('El correo electrónico ya está registrado.');
                return; // Detener la ejecución si el correo ya existe
            }

            // Si el correo no existe, agregar el nuevo usuario
            const nuevoUsuario = [...usuarioActual, {
                correo: user.email,
                password: user.password
            }];

            await fetch(`${URL}/usuarios.json`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevoUsuario)
            });

            alert('Usuario registrado exitosamente.');

            // Limpiar los campos después del registro
            setEmail("");
            setPassword("");
        } catch (error) {
            console.error('Error al agregar al usuario:', error);
        }
    };

    return (
        <div className="w-96 mx-auto mt-10 p-8 border rounded-lg shadow-xl bg-white">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Registro</h2>
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
                onClick={registrarUsuario}
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
                Confirmar
            </button>
            <div className="mt-4 text-center">
                <span className="text-gray-600">¿Ya tienes una cuenta? </span>
                <a href="/login" className="text-blue-600 hover:underline">
                    Inicia sesión aquí
                </a>
            </div>
        </div>
    );
};

export default Register;
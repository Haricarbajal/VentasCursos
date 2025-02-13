import { useState, useEffect } from 'react';

function Menu() {
    const [rotation, setRotation] = useState(0);

    useEffect(() => {
        const handleMouseMove = (event) => {
            setRotation(event.clientX);
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <>
            <div
                className="h-[800px] w-full bg-black p-6 shadow-md relative"
                style={{
                    backgroundImage: 'url(/bgAzul.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                >
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: 'url(/bgAzul.jpg)',
                        filter: 'blur(0px)',
                        zIndex: 0,
                    }}
                ></div>
                <div className="absolute top-[3%] right-[0.02%] bg-[rgba(45,45,45,0.5)] h-[80%] w-[100%] rounded-lg border-2 border-white flex flex-col items-center px-4 shadow-lg backdrop-blur-md">
                    <div className="absolute top-[30%] text-center text-white mt-16 max-w-3xl">
                        <h2 className="text-5xl font-bold font-sans leading-tight drop-shadow-lg animate-fade-in">
                            Bienvenido a <span className="text-yellow-400">VentaCursos</span>
                        </h2>
                        <p className="mt-6 text-lg font-light tracking-wide leading-relaxed animate-slide-up">
                            Aprende <span className="font-semibold">programación</span> desde cero con nuestros
                            cursos especializados en <span className="text-yellow-400">Java, Python, Web Development, y más.</span>
                            Conviértete en un experto con nuestros instructores altamente calificados.
                        </p>
                        <a href="/section/">
                            <button className="mt-8 px-6 py-3 bg-yellow-400 text-gray-900 font-bold rounded-lg 
                shadow-md hover:scale-105 transition-transform duration-300">
                                Cursos
                            </button>
                        </a>
                    </div>
                </div>

            </div>

            <div
                className="h-[1100px] w-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-10 shadow-lg relative text-white"
            >
                <h1 className="text-5xl font-bold text-center mb-10 tracking-wide text-yellow-400">
                    Lenguajes de Programación para Frontend
                </h1>

                <div className="max-w-5xl mx-auto text-center">
                    <p className="text-lg leading-8 mb-6">
                        En el mundo del desarrollo web frontend, los lenguajes de programación juegan un papel crucial para construir
                        interfaces atractivas, interactivas y funcionales. Con las tecnologías modernas, los desarrolladores tienen
                        herramientas poderosas para crear experiencias de usuario asombrosas.
                    </p>

                    <p className="text-lg leading-8 mb-6">
                        Los principales lenguajes que dominan el desarrollo frontend incluyen <span className="text-yellow-400 font-semibold">HTML</span>,
                        <span className="text-yellow-400 font-semibold"> CSS</span> y <span className="text-yellow-400 font-semibold">JavaScript</span>. Estos lenguajes permiten estructurar páginas web,
                        diseñar su apariencia y agregar interactividad respectivamente.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                    {/* HTML */}
                    <div className="bg-gray-800 p-6 rounded-2xl shadow-md hover:scale-105 transition-transform">
                        <a href='/section/' className="text-3xl font-semibold mb-4 text-red-400 text-center">HTML</a>
                        <p className="text-md leading-7">
                            El lenguaje de marcado fundamental para la estructura de las páginas web. Define los elementos y su disposición
                            en la interfaz del usuario.
                        </p>
                    </div>

                    {/* CSS */}
                    <div className="bg-gray-800 p-6 rounded-2xl shadow-md hover:scale-105 transition-transform">
                        <a href='/section/' className="text-3xl font-semibold mb-4 text-blue-400 text-center">CSS Avanzado</a>
                        <p className="text-md leading-7">
                            Lenguaje de estilos que se encarga de definir la apariencia de la web, aplicando colores, diseños, animaciones
                            y efectos visuales.
                        </p>
                    </div>

                    {/* REACT */}
                    <div className="bg-gray-800 p-6 rounded-2xl shadow-md hover:scale-105 transition-transform">
                        <a href="/section/" className="text-3xl font-semibold mb-4 text-yellow-300 text-center">REACT</a>
                        <p className="text-md leading-7">
                            Domina el desarrollo web moderno con nuestro Curso de React para Frontend! Aprende desde
                            los fundamentos hasta técnicas avanzadas para crear aplicaciones web dinámicas y de alto rendimiento.
                            Con proyectos prácticos, entenderás cómo trabajar con componentes, estado, hooks y más.
                        </p>
                    </div>
                    {/* VUE */}
                    <div className="bg-gray-800 p-6 rounded-2xl shadow-md hover:scale-105 transition-transform">
                        <a href='/section/' className="text-3xl font-semibold mb-4 text-yellow-300 text-center">VUE</a>
                        <p className="text-md leading-7">
                            ¡Conviértete en un experto en desarrollo frontend con nuestro Curso de Vue.js!
                            Aprende a crear interfaces de usuario reactivas y escalables con esta poderosa y fácil de aprender biblioteca.
                        </p>
                    </div>

                    {/* VUE */}
                    <div className="bg-gray-800 p-6 rounded-2xl shadow-md hover:scale-105 transition-transform">
                        <a href='/section/' className="text-3xl font-semibold mb-4 text-yellow-300 text-center">ANGULAR</a>
                        <p className="text-md leading-7">
                            ¡Domina el desarrollo web con nuestro Curso de Angular para Frontend!
                            Aprende a construir aplicaciones web robustas y escalables con este potente framework de Google.
                            Desde los fundamentos hasta conceptos avanzados como módulos, componentes, servicios e integración con API REST.
                        </p>
                    </div>

                    {/* ASTRO */}
                    <div className="bg-gray-800 p-6 rounded-2xl shadow-md hover:scale-105 transition-transform">
                        <a href='/section/' className="text-3xl font-semibold mb-4 text-yellow-300 text-center">Astro</a>
                        <p className="text-md leading-7">
                            ¡Aprende a crear sitios web ultrarrápidos con nuestro Curso de Astro para Frontend!
                            Astro es el framework moderno que combina la velocidad de HTML estático con la flexibilidad de frameworks como React, Vue y Svelte.
                        </p>
                    </div>

                    {/* JavaScript */}
                    <div className="bg-gray-800 p-6 rounded-2xl shadow-md hover:scale-105 transition-transform">
                        <a href='/section/' className="text-3xl font-semibold mb-4 text-yellow-300 text-center">JavaScript</a>
                        <p className="text-md leading-7">
                            Lenguaje de programación que agrega interactividad y dinamismo a la web, permitiendo crear experiencias
                            enriquecidas para los usuarios.
                        </p>
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <p className="text-xl italic text-gray-400">
                        "Dominar estos lenguajes es el primer paso para convertirte en un desarrollador frontend experto."
                    </p>
                </div>
            </div>

            <div
                className="h-[800px] w-full bg-black p-6 shadow-md relative sm:block md:hidden"
                style={{
                    backgroundImage: 'url(/icFront.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
            </div>


            <div
                className="h-[800px] w-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-10 shadow-lg relative text-white"
            >
                <h1 className="text-5xl font-bold text-center mb-10 tracking-wide text-green-400">
                    Lenguajes de Programación para Backend y Bases de Datos
                </h1>

                <div className="max-w-5xl mx-auto text-center">
                    <p className="text-lg leading-8 mb-6">
                        El desarrollo backend abarca la lógica de negocio, la seguridad y la gestión de datos de las aplicaciones web.
                        Los desarrolladores utilizan diferentes lenguajes para construir servidores robustos y bases de datos eficientes.
                    </p>

                    <p className="text-lg leading-8 mb-6">
                        Entre los lenguajes más utilizados en el backend se encuentran
                        <span className="text-green-400 font-semibold"> Node.js</span>,
                        <span className="text-green-400 font-semibold"> Python</span>,
                        <span className="text-green-400 font-semibold"> Java</span>,
                        <span className="text-green-400 font-semibold"> PHP</span>,
                        <span className="text-green-400 font-semibold"> Ruby</span> y
                        <span className="text-green-400 font-semibold"> C#</span>.
                        Además, las bases de datos juegan un papel clave, con opciones SQL y NoSQL como
                        <span className="text-green-400 font-semibold"> MySQL</span>,
                        <span className="text-green-400 font-semibold"> PostgreSQL</span> y
                        <span className="text-green-400 font-semibold"> MongoDB</span>.
                    </p>
                </div>

                <h2 className="text-4xl font-semibold text-center mt-12 text-yellow-400">Lenguajes de Backend</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                    {/* Node.js */}
                    <div className="bg-gray-800 p-6 rounded-2xl shadow-md hover:scale-105 transition-transform flex flex-col items-center text-center">
                        <a href='/section/' className="text-3xl font-semibold mb-4 text-green-400">Node.js</a>
                        <p className="text-md leading-7">
                            Plataforma basada en JavaScript para construir aplicaciones rápidas y escalables.
                        </p>
                    </div>

                    {/* Python */}
                    <div className="bg-gray-800 p-6 rounded-2xl shadow-md hover:scale-105 transition-transform flex flex-col items-center text-center">
                        <a href='/section/' className="text-3xl font-semibold mb-4 text-blue-400">Python</a>
                        <p className="text-md leading-7">
                            Con frameworks como Django y Flask, facilita la creación de aplicaciones eficientes.
                        </p>
                    </div>

                    {/* Java */}
                    <div className="bg-gray-800 p-6 rounded-2xl shadow-md hover:scale-105 transition-transform flex flex-col items-center text-center">
                        <a href='/section/' className="text-3xl font-semibold mb-4 text-red-400">Java</a>
                        <p className="text-md leading-7">
                            Lenguaje seguro y escalable, ampliamente usado en entornos empresariales.
                        </p>
                    </div>

                    {/* PHP */}
                    <div className="bg-gray-800 p-6 rounded-2xl shadow-md hover:scale-105 transition-transform flex flex-col items-center text-center">
                        <a href='/section/' className="text-3xl font-semibold mb-4 text-purple-400">PHP</a>
                        <p className="text-md leading-7">
                            Popular en desarrollo web, especialmente con frameworks como Laravel.
                        </p>
                    </div>

                    {/* Ruby */}
                    <div className="bg-gray-800 p-6 rounded-2xl shadow-md hover:scale-105 transition-transform flex flex-col items-center text-center">
                        <h3 className="text-3xl font-semibold mb-4 text-pink-400">Ruby</h3>
                        <p className="text-md leading-7">
                            Lenguaje de sintaxis elegante, utilizado en Ruby on Rails para aplicaciones web.
                        </p>
                    </div>

                    {/* C# */}
                    <div className="bg-gray-800 p-6 rounded-2xl shadow-md hover:scale-105 transition-transform flex flex-col items-center text-center">
                        <a href='/section/' className="text-3xl font-semibold mb-4 text-blue-500">C#</a>
                        <p className="text-md leading-7">
                            Potente lenguaje de Microsoft para aplicaciones web con ASP.NET.
                        </p>
                    </div>
                </div>

                <h2 className="text-4xl font-semibold text-center mt-20 text-yellow-400">Bases de Datos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                    {/* Node.js */}
                    <div className="bg-gray-800 p-6 rounded-2xl shadow-md hover:scale-105 transition-transform">
                        <a href='/section/' className="text-3xl font-semibold mb-4 text-green-400 text-center block">Node.js</a>
                        <p className="text-md leading-7 text-center">
                            Plataforma basada en JavaScript para construir aplicaciones rápidas y escalables.
                        </p>
                    </div>

                    {/* Python */}
                    <div className="bg-gray-800 p-6 rounded-2xl shadow-md hover:scale-105 transition-transform">
                        <a href='/section/' className="text-3xl font-semibold mb-4 text-blue-400 text-center block">Python</a>
                        <p className="text-md leading-7 text-center">
                            Con frameworks como Django y Flask, facilita la creación de aplicaciones eficientes.
                        </p>
                    </div>

                    {/* Java */}
                    <div className="bg-gray-800 p-6 rounded-2xl shadow-md hover:scale-105 transition-transform">
                        <a href='/section/' className="text-3xl font-semibold mb-4 text-red-400 text-center block">Java</a>
                        <p className="text-md leading-7 text-center">
                            Lenguaje seguro y escalable, ampliamente usado en entornos empresariales.
                        </p>
                    </div>

                    {/* PHP */}
                    <div className="bg-gray-800 p-6 rounded-2xl shadow-md hover:scale-105 transition-transform">
                        <a href='/section/' className="text-3xl font-semibold mb-4 text-purple-400 text-center block">PHP</a>
                        <p className="text-md leading-7 text-center">
                            Popular en desarrollo web, especialmente con frameworks como Laravel.
                        </p>
                    </div>

                    {/* Ruby */}
                    <div className="bg-gray-800 p-6 rounded-2xl shadow-md hover:scale-105 transition-transform">
                        <h3 className="text-3xl font-semibold mb-4 text-pink-400 text-center">Ruby</h3>
                        <p className="text-md leading-7 text-center">
                            Lenguaje de sintaxis elegante, utilizado en Ruby on Rails para aplicaciones web.
                        </p>
                    </div>

                    {/* C# */}
                    <div className="bg-gray-800 p-6 rounded-2xl shadow-md hover:scale-105 transition-transform">
                        <a href='/section/' className="text-3xl font-semibold mb-4 text-blue-500 text-center block">C#</a>
                        <p className="text-md leading-7 text-center">
                            Potente lenguaje de Microsoft para aplicaciones web con ASP.NET.
                        </p>
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <p className="text-xl italic text-gray-400">
                        "Con una combinación adecuada de lenguajes backend y bases de datos, puedes construir aplicaciones sólidas y escalables."
                    </p>
                </div>
            </div>

            <div className="h-[1000px] mt-[1] w-full bg-black text-green-400 p-10 shadow-lg relative font-mono">
                <a href='/section/' className="text-5xl font-bold text-center mb-10 tracking-wide text-red-600 animate-pulse">
                    Zona Hacker: Lenguajes y Habilidades
                </a>

                <div className="max-w-5xl mx-auto text-center text-lg leading-8">
                    <p className="mb-6 text-gray-400">
                        El hacking es un mundo oscuro y misterioso que requiere conocimientos profundos de seguridad, programación y redes.
                        Para convertirte en un hacker ético, debes dominar una serie de lenguajes y habilidades técnicas.
                    </p>
                </div>

                <h2 className="text-4xl font-semibold text-center mt-12 text-green-500 underline decoration-red-600">
                    Lenguajes Clave
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
                    <div className="bg-gray-900 p-6 rounded-2xl shadow-md border border-green-500 hover:scale-105 transition-transform">
                        <a href='/section/' className="text-3xl font-semibold mb-4 text-red-400 text-center">Python</a>
                        <p>
                            Lenguaje fundamental para scripting, automatización y creación de herramientas de hacking.
                        </p>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-2xl shadow-md border border-green-500 hover:scale-105 transition-transform">
                        <a href='/section/' className="text-3xl font-semibold mb-4 text-blue-400 text-center">C</a>
                        <p>
                            Conocimiento esencial para explotación de vulnerabilidades y desarrollo de exploits.
                        </p>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-2xl shadow-md border border-green-500 hover:scale-105 transition-transform">
                        <a href='/section/' className="text-3xl font-semibold mb-4 text-yellow-400 text-center">Bash</a>
                        <p>
                            Lenguaje de scripting utilizado para automatizar ataques y administrar sistemas.
                        </p>
                    </div>
                </div>

                <h2 className="text-4xl font-semibold text-center mt-20 text-green-500 underline decoration-red-600">
                    Habilidades Clave
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
                    <div className="bg-gray-900 p-6 rounded-2xl shadow-md border border-green-500 hover:scale-105 transition-transform">
                        <a href='/section/' className="text-3xl font-semibold mb-4 text-orange-400 text-center">Pentesting</a>
                        <p>
                            Evaluación de la seguridad de sistemas mediante pruebas de penetración.
                        </p>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-2xl shadow-md border border-green-500 hover:scale-105 transition-transform">
                        <a href='/section/' className="text-3xl font-semibold mb-4 text-purple-400 text-center">Ingeniería Inversa</a>
                        <p>
                            Análisis de software para descubrir vulnerabilidades y funcionamiento interno.
                        </p>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-2xl shadow-md border border-green-500 hover:scale-105 transition-transform">
                        <a href='/section/' className="text-3xl font-semibold mb-4 text-cyan-400 text-center">Criptografía</a>
                        <p>
                            Implementación y análisis de técnicas para proteger la información.
                        </p>
                    </div>
                    <div className="bg-gray-900 p-6 rounded-2xl shadow-md border border-green-500 hover:scale-105 transition-transform">
                        <a href='/section/' className="text-3xl font-semibold mb-4 text-cyan-400 text-center">Kali Linux</a>
                        <p>
                            Implementación y análisis de técnicas para proteger la información.
                        </p>
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <p className="text-xl italic text-gray-500">
                        "El verdadero hacker es el que entiende cómo funcionan los sistemas y cómo pueden ser protegidos."
                    </p>
                </div>
            </div>

            <div className="relative h-[400px] w-full bg-black p-6 shadow-md">
            <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: 'url(/hacker.jpeg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                {/* Capa oscura encima */}
                <div className="absolute inset-0 bg-black opacity-90"></div>
            </div>
        </>
    );
}
export default Menu;
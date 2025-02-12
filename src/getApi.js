export async function obtenerCursos() {
    try {
        const response = await fetch(
            "https://ventascursos-f91c8-default-rtdb.firebaseio.com/cursos.json"
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function actualizarLikes(cursoId, nuevosLikes) {
    try {
        const response = await fetch(
            `https://ventascursos-f91c8-default-rtdb.firebaseio.com/cursos/${cursoId}/likes.json`,
            {
                method: 'PATCH', // Usamos PATCH para actualizar solo el campo "likes"
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ likes: nuevosLikes }),
            }
        );

        if (!response.ok) {
            throw new Error('Error al actualizar los likes');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}
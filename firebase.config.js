const dataBaseUrl = 'https://console.firebase.google.com/project/ventascursos-f91c8/database/ventascursos-f91c8-default-rtdb/data/~2F//cursos.json'

async function obtenerCursos() {
    try{
        const response = await fetch(dataBaseUrl);
        const cursos = await response.json();
        console.log(cursos)
    }catch(error){
        console.error(error)
    }
}

obtenerCursos();
document.getElementById('boton1').addEventListener('click', () => {
    const parrafo = document.getElementById('ejercicio1');
    parrafo.innerHTML = '';
    parrafo.innerHTML += 'Inicio del programa<br>';
    
    (async () => {
        await new Promise(resolve => setTimeout(resolve, 2000));
        parrafo.innerHTML += 'Este es el callback ejecutándose 2 segundos después<br>';
    })();
    
    parrafo.innerHTML += 'Fin del programa (¿o no?)<br>';
});

document.getElementById('boton2').addEventListener('click', async () => {
    const tabla = document.getElementById('ejercicio2');
    tabla.innerHTML = '';
    try {
        let response = await fetch('https://swapi.dev/api/films/');
        let data = await response.json();
        data.results.forEach(film => {
            tabla.innerHTML += `<tr><td>${film.title}</td><td>${film.director}</td><td>${film.release_date}</td></tr>`;
        });
    } catch (error) {
        console.log('Error al obtener los datos de la API:', error);
    }
});
const menu = document.getElementById('menu');
const indicador = document.getElementById('indicador');
const secciones = document.querySelectorAll('.seccion');

let tamanioIndicador = menu.querySelector('a').offsetWidth;
indicador.style.width = tamanioIndicador + 'px';

let indexSeccionActiva;

// Observer
const observer = new IntersectionObserver((entradas, observer) => {
    entradas.forEach(entrada => {
        if(entrada.isIntersecting) {
            // Obtenemos cual es la seccion que esta entrando en pantalla
            //console.log('La entrada ' + entrada.target.id + ' esta intersectando');

            // creamos un arreglo con las secciones y luego obtenemos el index de la seccion que esta en pantalla
            indexSeccionActiva = [...secciones].indexOf(entrada.target);
            indicador.style.transform = `translateX(${tamanioIndicador * indexSeccionActiva}px)`
        }
    });
}, {
    rootMargin: '-5% 0% 0% 0%',
    threshold: 0.2
});

// agregamos un observador para el hero
observer.observe(document.getElementById('hero'));

// asignamos un observador a cada una de las secciones
secciones.forEach(seccion => observer.observe(seccion));

// Evento para cuando la pántalla cambia de tamaño
const onResize = () => {
    // calculamos el nuevo tamaño que deberia tener el indicador
    tamanioIndicador = menu.querySelector('a').offsetWidth;

    //cambiamos el tamaño del indicador
    indicador.style.width = `${tamanioIndicador}px`;

    //Volvemos a posicionar el indicador
    indicador.style.transform = `translateX(${tamanioIndicador * indexSeccionActiva}px)`;
}

window.addEventListener('resize', onResize);
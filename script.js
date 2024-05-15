// Función para guardar datos en el almacenamiento local
function guardarDatosLocalmente(datos) {
    localStorage.setItem('datos', JSON.stringify(datos));
}

// Función para descargar los datos como un archivo JSON
function descargarDatosComoJSON() {
    const datos = localStorage.getItem('datos');
    const blob = new Blob([datos], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'datos.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Ejemplo de uso
const datos = {
    nombre: 'Ejemplo',
    edad: 30,
    imagen: 'imagen.jpg' // URL de la imagen temporal
};

guardarDatosLocalmente(datos);

// Luego, cuando el usuario esté listo para descargar los datos
descargarDatosComoJSON();

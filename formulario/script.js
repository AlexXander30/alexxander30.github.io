document.querySelector('form').addEventListener('submit', function(e) {
    let errores = [];
    
    const tipoDibujo = document.querySelector('input[name="tipo_dib"]:checked');
    if (!tipoDibujo) {
        errores.push('Debes seleccionar un tipo de dibujo');
    }
    
    const tamaño = document.querySelector('input[name="tamaño"]:checked');
    if (!tamaño) {
        errores.push('Debes seleccionar un tamaño del dibujo');
    }

    const referencia = document.getElementById('referencia').files[0];
    if (referencia) {
        const extensionesValidas = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
        const extension = referencia.name.split('.').pop().toLowerCase();
        if (!extensionesValidas.includes(extension)) {
            errores.push('La referencia visual debe ser una imagen válida (jpg, png, gif, webp)');
        }
    }

    const fechaEntrega = document.getElementById('fechamax').value;
    if (fechaEntrega) {
        const fechaSeleccionada = new Date(fechaEntrega);
        const fechaActual = new Date();
        const fechaMinima = new Date();
        fechaMinima.setDate(fechaActual.getDate() + 7);
        if (fechaSeleccionada < fechaMinima) {
            errores.push('La fecha de entrega debe ser al menos una semana a partir de hoy.');
        }
    }
    
    if (errores.length > 0) {
        alert(errores.join('\n'));
        e.preventDefault();
    }
});


function calcularPrecio() {
    const tipoDibujo = document.querySelector('input[name="tipo_dib"]:checked');
    const tamaño = document.querySelector('input[name="tamaño"]:checked');
    const fechaEntrega = document.getElementById('fechamax').value;
    
    let precio = 0;
    
    if (tipoDibujo) {
        precio += parseFloat(tipoDibujo.dataset.price) || 0;
    }
    
    if (tamaño) {
        precio += parseFloat(tamaño.dataset.price) || 0;
    }
    
    if (fechaEntrega) {
            precio += 15; 
        }
    
    
    document.getElementById('precio-total').textContent = `Precio estimado: $${precio}`;
}

document.querySelectorAll('input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', calcularPrecio);
});

document.getElementById('fechamax').addEventListener('change', calcularPrecio);
const form = document.querySelector('form');
form.addEventListener('submit', e => {
  if (!form.checkValidity()) { e.preventDefault(); form.reportValidity(); return; }
  alert('Gracias por tu comision! Revisaré tu formulario y me pondré en contacto contigo pronto.');
});



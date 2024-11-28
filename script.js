document.getElementById('guardar').addEventListener('click', guardarViaje);


let showTripsBtn = document.getElementById("show-trips-btn");
let tripsContainer = document.getElementById("trips-container");
let infoBtn = document.getElementById("infoBtn");
let modal = document.getElementById("infoModal");




showTripsBtn.addEventListener('click', function() {
    if (tripsContainer.style.display === 'block') {
      tripsContainer.style.display = 'none';
    } else {
      let cards_actuales = localStorage.getItem('viajes');
      if (cards_actuales) {
        tripsContainer.innerHTML = cards_actuales; 
        tripsContainer.style.display = 'block'; 
        
    } else {
        alert("No hay viajes guardados.");
        tripsContainer.style.display = 'none';
        
      }
    }
  });
  
  function guardarViaje() {
    let destino = document.getElementById('destino').value;
    let fecha = document.getElementById('fecha').value;
    let actividad = document.getElementById('actividad').value;
    let presupuesto = document.getElementById('presupuesto').value;
    let continente = document.getElementById('continente').value;
  
   
    if (!destino || !fecha || !actividad || !presupuesto || !continente) {
      alert('Por favor completa todos los campos.');
      return;
    }
  
    
    let tarjeta = document.createElement('div');
    tarjeta.classList.add('card-viajes');
    
    
    let colorContinente = getColorPorContinente(continente);
  
    tarjeta.innerHTML = `
    
    <div  class="card-cuerpo">
      <h15 class="card-tittle">${destino}</h15> 
      <p class="card-texto"> <strong>Fecha:</strong> <span>${fecha}</span></p>
      <p class="card-texto"> <strong>Actividad:</strong> <span>${actividad}</span></p>
      <p class="card-texto"> <strong>Presupuesto:</strong> <span>$${presupuesto}</span></p>
      <p class="card-texto"> <strong>Continente:</strong> <span>${continente}</span></p>
     <button class="eliminar" data-accion="eliminar">Eliminar</button>
    </div>
  
    `;


  
    tarjeta.style.borderColor = colorContinente;
  
    
    tripsContainer.prepend(tarjeta);
  
   
    let cards_actuales = tripsContainer.innerHTML;
    localStorage.setItem('viajes', cards_actuales);
  
    limpiarFormulario();
  }
  
  
  tripsContainer.addEventListener("click", function (e) {
    if (e.target.dataset.accion == "eliminar") { 
      let rta = confirm("¿Estás seguro que quieres eliminar esta tarjeta?");
      
      if (rta) {
        let tarjeta= e.target.parentElement.parentElement;
        tarjeta.remove();

        let cards_actuales = tripsContainer.innerHTML; 
        localStorage.setItem("viajes", cards_actuales); 
      }
    }
  });
  
  function limpiarFormulario() {
    document.getElementById('destino').value = '';
    document.getElementById('fecha').value = '';
    document.getElementById('actividad').value = '';
    document.getElementById('presupuesto').value = '';
    document.getElementById('continente').value = '';
  }
  
  function getColorPorContinente(continente) {
    let colores = {
      America: 'blue',
      Europa: 'pink',
      Asia: 'red',
      Africa: 'orange',
      Oceania: 'purple'
    };
    return colores[continente] || 'black'; 
  }





infoBtn.onclick = function() {
    modal.style.display = "block";
}



window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

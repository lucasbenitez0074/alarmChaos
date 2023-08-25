const headerPrincipal = document.getElementById("principal");
const btnCTA = document.querySelector(".callToAct");
const horaPantalla = document.querySelector(".horario");
const alarmTimers = {};

function actualizarHora(){
        let now = new Date();
        let hora = now.getHours();
        let minutos = now.getMinutes();
        let segundos = now.getSeconds();
    horaPantalla.textContent = `${hora}:${minutos}:${segundos}`
    setInterval(()=>{
        now = new Date();
        hora = now.getHours();
        minutos = now.getMinutes();
        segundos = now.getSeconds();
        let actHora = hora<10 ? `0${hora}` : hora;
        let actMinutos = minutos<10 ? `0${minutos}` : minutos;
        let actSegundos = segundos<10 ? `0${segundos}` : segundos;
        horaPantalla.textContent = `${actHora}:${actMinutos}:${actSegundos}`

        const nuevaHora = horaPantalla.textContent;
        horaRel = nuevaHora.substring(0, 2);
        minRel = nuevaHora.substring(3, 5);
        segRel = nuevaHora.substring(6,8);
    },1000)
}


btnCTA.addEventListener("click",(e)=>{
    headerPrincipal.classList.toggle("principalCollapsed");
    headerPrincipal.style.transition="1s"
})

actualizarHora();



// Obtener referencia al contenedor de alarmas
const alarmContainer = document.querySelector(".alarmContainer");

// Función para eliminar una alarma por su ID
function eliminarAlarma(id) {
    const alarmaAEliminar = document.getElementById(id);
    if (alarmaAEliminar) {
        alarmaAEliminar.remove();
        cancelarAlarmaTimer(id)
    }
}

// Función para agregar un evento de eliminación a un ícono de tacho
function agregarEventoEliminar(tacho) {
    tacho.addEventListener("click", () => {
        const id = tacho.parentNode.id;
        eliminarAlarma(id);
    });
}

function agregarSonidoAlarma(pija,teta){
    console.log("Función agregarSonidoAlarma se ejecutó");
    const aass = pija.textContent;
    const horaSonar = parseInt(aass.substring(0,2))
    const minSonar = parseInt(aass.substring(3,5))
    const horaAct = parseInt(horaRel);
    const minAct = parseInt(minRel);
    const segAct = parseInt(segRel);
    const interval = (horaSonar - horaAct)*3600000 + (minSonar - minAct)*60000 - (segAct)*1000;
    console.log(`la alarma sonara en ${interval}`);
    alarmTimers[teta] = setTimeout(()=>{
        const alarmas = document.getElementById("alarmSound");
        alarmas.play();
    },interval)
}

function cancelarAlarmaTimer(teta){
    if(alarmTimers[teta]){
        clearTimeout(alarmTimers[teta]);
        delete alarmTimers[teta];
    }
}

// Agregar evento para agregar una alarma
document.querySelector(".addAlarmBtn").addEventListener("click", () => {
    const inputHora = document.getElementById("inputAlarm").value;
    const inputMotivo = document.getElementById("inputMotivo").value;

    if (inputHora && inputMotivo) {
        const newAlarm = document.createElement("div");
        newAlarm.className = "newAlarm";
        newAlarm.id = `alarm-${Date.now()}`; // Generar un ID único

        newAlarm.innerHTML = `
            <p class="horaAlarma">${inputHora}</p>
            <p class="motivoAlarma">${inputMotivo}</p>
            <img class="delete" src="../assets/delete.png" alt="">
        `;

        alarmContainer.appendChild(newAlarm);

        const timeAlarma = newAlarm.querySelector(".horaAlarma")
        const tacho = newAlarm.querySelector(".delete");
        agregarEventoEliminar(tacho);
        agregarSonidoAlarma(timeAlarma,newAlarm.id)
    }
});


/*
FALTA AGREGAR FUNCIONALIDADES PARA QUE SE BORRE LA ALARMA LUEGO DE QUE SE EJECUTE SOLA
*/



/*
function sonar(){

}

sonar()
*/
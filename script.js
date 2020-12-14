const { BigIntStats } = require("fs");

function crear(){
    var filas = document.getElementById("numprocesos").value
    var table ="<table align=\"center\" border=\"1\" id=\"datos1\">";

    table+="<tr>";
    for(j=0;j<5;j++){ 
        if(j==0){
            table+="<th>Proceso</th>";
        }else if(j==1){
            table+="<th>Instante de llegada</th>";
        }else if(j==2){
            table+="<th>Duración</th>";
        }else if(j==3){
            table+="<th>Inicio Bloqueo</th>";
        }else if(j==4){
            table+="<th>Duración bloqueo</th>";
        }
    }

    for (j=0;j<filas;j++) {
        table+="<tr>"
        for(i=0;i<5;i++){
            if(i==0){
                table+="<td id=\""+j+","+i+"\"  value=\""+j+","+i+"\">"+(j+1)+"</td>"
            }else if(i==3){
                table+="<td><input type=\"number\" id=\""+j+","+i+"\" min=\"0\" max=\"19\"  value=\"1\"></td>"
            }else{
                table+="<td><input type=\"number\" id=\""+j+","+i+"\" min=\"0\" max=\"20\"  value=\"0\"></td>"
            }
            
        }
        table+="</tr>"
    }

    table+="</tr></table>";

    document.getElementById("datos").innerHTML=table;
}

var listaProcesos

function simular(){
    var filas = document.getElementById("numprocesos").value
    var aux = new Array(5)
    listaProcesos = new Array(filas)

    for(i=0;i<filas;i++){
        aux = [0,0,0,0,0]
        for(j=0;j<5;j++){
            if(j==0){
                aux[j] = document.getElementById(i+","+j).innerHTML
            }else{
                aux[j] = document.getElementById(i+","+j).value
            }
        }
        listaProcesos[i] = new procesos(aux)
    }
    
    var FCFS = FCFS()
    var SJF = SJF()
    var SRTF = SRTF()

    var enEjecucion = new Boolean(true)
    var instante = 0

    while(enEjecucion){
        var ocupado = new Boolean(false)

        for(i=0; i<filas; i++){
            if(FCFS[i].estado == 1 && !ocupado){
                ocupado = true
            }
            if(FCFS[i].insLlegada == instante){
                FCFS[i].estado = 2
            }
            if(instante == FCFS[i].tiempoEjecucion){
                FCFS[i].estado = 3
                ocupado = false
            }
            if(instante - FCFS[i].tiempoEjecucion == FCFS[i].durBloqueo){
                if(ocupado){
                    FCFS[i].estado = 2
                } else {
                    FCFS[i].estado = 1
                    ocupado = true
                    FCFS[i].tiempoFinal = instante + FCFS[i].duracion
                }
            }
            if(FCFS[i].tiempoFinal = instante + FCFS[i].duracion - FCFS[i].inBloqueo){
                FCFS[i].estado = 0
                ocupado = false
            }
        }

        for(i=0; i<filas && !ocupado; i++){
            if(FCFS[i].insLlegada <= instante && FCFS[i].estado != 3 && FCFS[i].estado != 0){
                FCFS[i].estado = 1
                FCFS[i].tiempoEjecucion = FCFS[i].inBloqueo + instante
                break
            }
        }

        instante++
    }

}

function procesos(aux){
    this.id = aux[0]
    this.insLlegada = aux[1]
    this.duracion = aux[2]
    this.inBloqueo = aux[3]
    this.durBloqueo = aux[4]
    var tiempoEjecucion = 99
    var tiempoFinal = 99
    var estado = 0

    /* 
        Cuando está en 0, el estado del proceso es no iniciado o terminado
        Cuando está en 1, el estado del proceso es activo
        Cuando está en 2, el estado del proceso es en espera
        Cuando está en 3, el estado del proceso es bloqueado
    */
}
   
function FCFS(){
    /*First come, first served*/
    var filas = document.getElementById("numprocesos").value
    var prioridad = new Array(filas)

    for(i=0; i<filas; i++){
        prioridad[i] = listaProcesos[i]
    }

    for (i=1; i<filas; i++) {
        for (j=0; j<(filas-i); j++) {
            if (prioridad[j].insLlegada > prioridad[j+1].insLlegada){
                aux = prioridad[j];
                prioridad[j] = prioridad[j+1];
                prioridad[j+1] = aux;
            }
        }
    }

    return prioridad
}

function SJF(){
    /*Shorted Job First*/
    var filas = document.getElementById("numprocesos").value
    var prioridad = new Array(filas)

    for(i=0; i<filas; i++){
        prioridad[i] = listaProcesos[i]
    }

    for (i=1; i<filas; i++) {
        for (j=0; j<(filas-i); j++) {
            if (prioridad[j].duracion > prioridad[j+1].duracion){
                aux = prioridad[j];
                prioridad[j] = prioridad[j+1];
                prioridad[j+1] = aux;
            }
        }
    }

    return prioridad
}

function SRTF(){
    /*Short Remaining Time First*/
    var filas = document.getElementById("numprocesos").value
    var prioridad = new Array(filas)

    for(i=0; i<filas; i++){
        prioridad[i] = listaProcesos[i]
    }

    for (i=1; i<filas; i++) {
        for (j=0; j<(filas-i); j++) {
            ola = prioridad[j].duracion - prioridad[j].inBloqueo
            ola2 = prioridad[j+1].duracion - prioridad[j+1].inBloqueo
            if (ola > ola2){
                aux = prioridad[j];
                prioridad[j] = prioridad[j+1];
                prioridad[j+1] = aux;
            }
        }
    }

    return prioridad
}
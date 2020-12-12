

function crear(){
    var table ="<table align=\"center\" border=\"1\" id=\"datos1\">";
    var filas = document.getElementById("numprocesos").value

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
                table+="<td><input type=\"number\" id=\""+j+","+i+"\" min=\"1\" max=\"19\"  value=\"1\"></td>"
            }else{
                table+="<td><input type=\"number\" id=\""+j+","+i+"\" min=\"0\" max=\"20\"  value=\"0\"></td>"
            }
            
        }
        table+="</tr>"
    }

    table+="</tr></table>";

    document.getElementById("datos").innerHTML=table;
}

function simular(){
    var filas = document.getElementById("numprocesos").value
    var listaProcesos = new Array(filas)
    var aux = new Array(5)

    for(i=0;i<filas;i++){
        aux = [0,0,0,0,0]
        for(j=0;j<5;j++){
            if(j==0){
                aux[j] = document.getElementById(i+","+j).innerHTML
            }else{
                aux[j] = document.getElementById(i+","+j).value
            }
            
        }
        listaProcesos[i] = procesos(aux)
    }
}


function procesos(aux){
    var id = aux[0]
    var insLlegada = aux[1]
    var duracion = aux[2]
    var inBloqueo = aux[3]
    var durBloqueo = aux[4]
}

function primerAlgoritmo(){
    
}
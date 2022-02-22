function cargarFotos() {
    fotos = new Array();
    cantidadFotos = 15;
    for (let i = 0; i < cantidadFotos; i++) {
        fotos[i] = new Image();
        switch (i) {
            case 0: {
                fotos[i].src = "./imgs/Pit_bull_terrier_americano.jpg";
                break;
            }
            case 1: {
                fotos[i].src = "./imgs/Bichón_maltés.jpg";
                break;
            }
            case 2: {
                fotos[i].src = "./imgs/bulldog.jpg";
                break;
            }
            case 3: {
                fotos[i].src = "./imgs/Schnauzer.jpg";
                break;
            }
            case 4: {
                fotos[i].src = "./imgs/Terranova_(perro).jpg";
                break;
            }
            case 5: {
                fotos[i].src = "./imgs/Dachshund.jpg";
                break;
            }
            case 6: {
                fotos[i].src = "./imgs/Dóberman.jpg";
                break;
            }
            case 7: {
                fotos[i].src = "./imgs/Golden_retriever.jpg";
                break;
            }
            case 8: {
                fotos[i].src = "./imgs/Shar_pei.jpg";
                break;
            }
            case 9: {
                fotos[i].src = "./imgs/Husky_siberiano.jpg";
                break;
            }
            case 10: {
                fotos[i].src = "./imgs/Dálmata_(perro).jpg";
                break;
            }
            case 11: {
                fotos[i].src = "./imgs/Poodle.jpg";
                break;
            }
            case 12: {
                fotos[i].src = "./imgs/Rottweiler.jpg";
                break;
            }
            case 13: {
                fotos[i].src = "./imgs/Shiba_Inu.jpg";
                break;
            }
            case 14: {
                fotos[i].src = "./imgs/Shih_Tzu.jpg";
                break;
            }
        }
        let arrayDeCadenas = fotos[i].src.split("/");
        arrayDeCadenas = arrayDeCadenas[arrayDeCadenas.length - 1].split(".");
        let nombre = arrayDeCadenas[0];
        fotos[i].title = nombre;
        fotos[i].alt = "Foto de un perro de raza " + nombre;
    }
    colocarFotoPanel(cantidadFotos);
    contador=fotos.length-1;
    cambiarDer();
    iniciarRotacion();
}

function colocarFotoPanel(cantidadFotos) {
    let html = ""
    for (let i = 0; i < cantidadFotos; i++) {
        html += "<img onclick='colocarFotoVisor(this)' src='" + fotos[i].src + "' title='" + fotos[i].title + "' alt='" + fotos[i].alt + "'  />";
    }
    document.getElementsByClassName("fotos")[0].innerHTML = html;
}

function cargarDescripcion(titulo) {
    let ajax = new XMLHttpRequest();
    let moreInfo = "<a href='https://es.wikipedia.org/wiki/"+titulo+"'>Ver mas...</a>";
    let url = "https://es.wikipedia.org/w/api.php?action=query&list=search&srprop=snippet&format=json&origin=*&utf8=&srsearch=" + titulo;
    ajax.open('GET', url, true);
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4) {
            let info = "";
            for (let i = 0; i < 5; i++) {
                res = JSON.parse(ajax.response).query.search[i];
                info += res.snippet;
            }
            let informacionVisor = info.split(".");
            if(titulo==="Shar_pei"){
                informacionVisor[0]+=".C";
            }
            document.getElementsByTagName("figcaption")[0].innerHTML = informacionVisor[0] + ". "+moreInfo;
        }
    }
    ajax.send();
}

function colocarFotoVisor(imagen) {
    aumento = 0;
    document.getElementById("fotoVisor").style.height = "100%";
    document.getElementById("fotoVisor").style.width = "unset";
    document.getElementById("fotoVisor").style.margin = "auto";
    document.getElementById("fotoVisor").src = imagen.src;
    document.getElementById("fotoVisor").title = imagen.title;
    document.getElementById("fotoVisor").alt = imagen.alt;

    seleccionarMiniatura(imagen.title);
    cargarDescripcion(imagen.title);
}

function aumentar() {
    let GFG = document.getElementById("fotoVisor");
    let currHeight = GFG.height;
    let currWidth = GFG.width;
    if(aumento<800) {
        aumento += 50;
        GFG.style.height = (currHeight + 50) + "px";
        GFG.style.width = (currWidth + 50) + "px";
        if(aumento>100){
            GFG.style.margin ="-50px";
        }
        if(aumento>300){
            GFG.style.margin ="-100px";
        }
        if(aumento>500){
            GFG.style.margin ="-150px";
        }
    }
}
function reducir() {
    let GFG = document.getElementById("fotoVisor");
    let currHeight = GFG.height;
    let currWidth = GFG.width;
    if(aumento>0) {
        aumento-=50;
        GFG.style.height = (currHeight - 50) + "px";
        GFG.style.width = (currWidth - 50) + "px";
        if(aumento<500){
            GFG.style.margin ="-50px";
        }
        if(aumento<250){
            GFG.style.margin ="-25px";
        }
        if(aumento<100){
        GFG.style.margin ="0px";
    }
    }
}

function seleccionarMiniatura(nombreFoto){
    let fotosPanel = document.getElementsByClassName("fotos")[0].getElementsByTagName("img");
    for (let i=0; i<fotosPanel.length;i++){
        if(fotosPanel[i].title === nombreFoto){
            fotosPanel[i].style.filter= "opacity(.5)";
        }else{
            fotosPanel[i].style.filter= "opacity(1)";
        }
    }
}

function cambiarDer(){
    if(contador==fotos.length-1){
        contador=0;
    }else{
        contador++;
    }
    colocarFotoVisor(fotos[contador]);
}

function cambiarIzq(){
    if(contador==0){
        contador=fotos.length-1;
    }else{
        contador--;
    }
    colocarFotoVisor(fotos[contador]);
}

function cambiarEstado(){
    if(estado) {
        detenerRotacion();
    }else{
        iniciarRotacion();
    }
}

function detenerRotacion() {
    estado = false;
    clearInterval(changing);
    document.getElementById("rotacionAutomatica").innerText = "Iniciar Rotación";

}
function iniciarRotacion(){
    estado=true;
    changing = setInterval("cambiarDer()", 10000); //Ejecuta una funcion cada determinado tiempo
    document.getElementById("rotacionAutomatica").innerText="Detener Rotación";
}

const btnVolverMemo = clase('.volver-memo');

const pMovimientos= clase('.movimientos-memo');
const pAciertos=clase('.aciertos-memo');
const pTiempo = clase('.tiempo-memo');
const btnNuevoMemo=clase('.nuevo-memo');

var imgMostradas=0;
var imagenesMemo = ['<img src="img/Memo-1.png" width="80%">','<img src="img/Memo-2.png" width="80%">','<img src="img/Memo-3.png" width="80%">','<img src="img/Memo-4.png" width="80%">','<img src="img/Memo-5.png" width="80%">','<img src="img/Memo-6.png" width="80%">','<img src="img/Memo-7.png" width="80%">','<img src="img/Memo-8.png" width="80%">','<img src="img/Memo-9.png" width="70%">','<img src="img/Memo-10.png" width="80%">','<img src="img/Memo-1.png" width="80%">','<img src="img/Memo-2.png" width="80%">','<img src="img/Memo-3.png" width="80%">','<img src="img/Memo-4.png" width="80%">','<img src="img/Memo-5.png" width="80%">','<img src="img/Memo-6.png" width="80%">','<img src="img/Memo-7.png" width="80%">','<img src="img/Memo-8.png" width="80%">','<img src="img/Memo-9.png" width="70%">','<img src="img/Memo-10.png" width="80%">'];
var tarjeta1;
var tarjeta2;
var primerResultado;
var segundoResultado;
var movimientosMemo=0;
var aciertosMemo=0;
var tiempoMemo=false;
var timer=35;
var timerInicial=30;
var tiempoRegresivo;


btnInicialJuegoMemoria.onclick= function(){sectionInicial.style.display='none'; sectionMemo.style.display='flex'; nuevoMemo(); imagenesMemo=imagenesMemo.sort(()=>{return Math.random()-0.5});}

function contarTiempo(){
    tiempoRegresivo = setInterval(()=>{
        timer--;
        pTiempo.innerHTML=`Tiempo: ${timer} segundos`;
        if(timer==0){
            clearInterval(tiempoRegresivo);
            bloquearTarjetas();
            pTiempo.innerHTML=`Te quedaste sin tiempo! 😢`;
            btnNuevoMemo.style.visibility='visible';
        }
    },1000);
}
function bloquearTarjetas(){
    for(let i=0;i<=19;i++){
        let tarjetaBloqueada=document.getElementById(i);
        tarjetaBloqueada.innerHTML = imagenesMemo[i];
        tarjetaBloqueada.disabled=true;
    }
}
function desbloquearTarjetas(){
    for(let i=0;i<=19;i++){
        let tarjetaDesbloqueada=document.getElementById(i);
        tarjetaDesbloqueada.innerHTML = '<img src="img/back-memo.png" width="80%">' ;
        tarjetaDesbloqueada.disabled=false;
    }
}

function mostrarImg(id){
    if(tiempoMemo == false){
        contarTiempo();
        tiempoMemo=true;
    }
    imgMostradas++;
    if(imgMostradas==1){
        tarjeta1 = document.getElementById(id);
        primerResultado = imagenesMemo[id]
        tarjeta1.innerHTML= primerResultado;
        tarjeta1.disabled=true;
    }else if (imgMostradas==2){
        
        tarjeta2 = document.getElementById(id);
        segundoResultado = imagenesMemo[id];
        tarjeta2.innerHTML=segundoResultado;
        tarjeta2.disabled=true; 
        movimientosMemo++;
        pMovimientos.innerHTML = `Movimientos: ${movimientosMemo}`;

        if(primerResultado==segundoResultado){
            imgMostradas=0;
            aciertosMemo++;
            pAciertos.innerHTML = `Aciertos: ${aciertosMemo}`;
            if(aciertosMemo==(imagenesMemo.length/2)){
                clearInterval(tiempoRegresivo);
                pAciertos.innerHTML='Ganaste esta ronda! Sumás 1 punto 🎉';
                pMovimientos.innerHTML=`Movimientos: ${movimientosMemo}.<br>Intentalo en ${movimientosMemo-1} 😉`;
                btnNuevoMemo.style.visibility='visible';
                pTiempo.innerHTML=`Tardaste ${timerInicial - timer} segundos`;
                puntaje++;
                tiempoMemo=false;
            }

        }else{
            setTimeout(()=>{
                tarjeta1.innerHTML='<img src="img/back-memo.png" width="80%">';
                tarjeta2.innerHTML='<img src="img/back-memo.png" width="80%">';
                tarjeta1.disabled=false;
                tarjeta2.disabled=false;
                imgMostradas =0;
            },800);
        }
    }
}

btnNuevoMemo.onclick=nuevoMemo;
function nuevoMemo(){
    //Reiniciar variables, timer, aciertos movimientos, vovler a sortear numeros, desbloquear tarjetas, function mostrarimg
    imagenesMemo=imagenesMemo.sort(()=>{return Math.random()-0.5});
    console.log(imagenesMemo);
    imgMostradas=0;
    movimientosMemo=0;
    aciertosMemo=0;
    tiempoMemo=false;
    timer=35;
    pMovimientos.innerHTML = `Movimientos: ${movimientosMemo}`;
    pTiempo.innerHTML=`Tiempo: ${timer} segundos`;
    pAciertos.innerHTML='Aciertos: 0';
    btnNuevoMemo.style.visibility='hidden'
    desbloquearTarjetas();

}

btnVolverMemo.onclick= volverMemo;
function volverMemo(){
    sectionMemo.style.display='none';
    sectionJuegoAhorcado.style.display='none';
    sectionInicial.style.display='flex';
    pPuntaje.innerHTML=`Puntaje: ${puntaje}`;
    tiempoMemo=false;
    clearInterval(tiempoRegresivo);
    imgMostradas=0;
}

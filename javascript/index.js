const somFundo = new Audio("../music/y2meta.com - Kero Kero Bonito - I’d Rather Sleep (Slowed+Muffled) “now i know whats real whats fake” (128 kbps).mp3");
const somGameOver = new Audio("../music/X2Download.com - ''You are dead, not big suprise!'' (Heavy Voice Lines) (128 kbps).mp3");
const somMover = new Audio("../music/y2meta.com - Grandma YEET [Sound Effect] (128 kbps).mp3");
const somComer = new Audio("../music/X2Download.com - TF2 Heavy Om Nom Nom Sound Effect (128 kbps).mp3");

var direcao = { x: 0, y: 1};
var cobrinha = [{ x: 5, y: 5}]
var fruta = { 
    x: Math.floor(Math.random() * 18),
    y: Math.floor(Math.random() * 18)
 }
var pontos = 0;

var ultimaVezAtualizada = 0;
var VELOCIDADE = 4;

function principal(tempoAtual) {
    window.requestAnimationFrame(principal);
    if((tempoAtual - ultimaVezAtualizada) / 1000 < (1 / VELOCIDADE)){
        return;
    }
ultimaVezAtualizada = tempoAtual;

atualizacaoGame();
}

function verificaColisao(){
    for(var  i = 1; i < cobrinha.length; i++){
        if(cobrinha[i].x == cobrinha[0].x && cobrinha[i].y == cobrinha[0].y){
            return true;
        }
    }


       // VERIFICA COLISÃO COM PAREDES
   if(cobrinha[0].x >= 18 || cobrinha[0].x <= 0 || cobrinha[0].y >= 18 || cobrinha[0].y <= 0) {
       return true;
   }
   return false;

}

function verificaComeuFrutinha(){
    if(cobrinha[0].x == fruta.x && cobrinha[0].y == fruta.y){
        somComer.play();
        pontos = pontos + 10;
        pontuacao.innerHTML = pontos + "pontos";
        cobrinha.unshift({ x: cobrinha[0].x + direcao.x, y: cobrinha[0].y + direcao.y})
        fruta.x = Math.floor(Math.random() * 16) + 1;
        fruta.y = Math.floor(Math.random() * 16) + 1;
        VELOCIDADE = VELOCIDADE + 0.5;
    }
}

function atualizacaoGame() {
    somFundo.play();

    var colidiu = verificaColisao();
    if(colidiu == true){
        somFundo.pause();
        somGameOver.play();
        alert("SE FUDEU!")
        cobrinha = [{ x: 5, y: 5 }]
        direcao.x = 0;
        direcao.y = 0;
        pontos = 10;

    }

    verificaComeuFrutinha();


    for (var i = cobrinha.length - 2; i >= 0; i--) {
       cobrinha[i + 1] = { ...cobrinha[i] }

    }
       cobrinha[0].y += direcao.y;
       cobrinha[0].x += direcao.x;

    board.innerHTML = "";
    for(var i = 0; i < cobrinha.length; i++){
        var parteCobrinha = document.createElement('div');
        parteCobrinha.style.gridRowStart = cobrinha[i].y;
        parteCobrinha.style.gridColumnStart = cobrinha[i].x;

        if(i == 0){
            parteCobrinha.classList.add("head");
        }else {
            parteCobrinha.classList.add("snake");
        }

        board.appendChild(parteCobrinha);
    }

var frutinha = document.createElement("div");
frutinha.style.gridColumnStart = fruta.x;
frutinha.style.gridRowStart = fruta.y;
frutinha.classList.add("fruta");
board.appendChild(frutinha);

}

function direcionaCobrinha(e) {
    somMover.play();
    switch(e.code){
        case "ArrowUp":
            direcao.x = 0
            direcao.y = -1;
            break;
        case "ArrowLeft":
            direcao.x = -1
            direcao.y = 0;
            break;
        case "ArrowDown":
            direcao.x = 0
            direcao.y = 1;
            break;
        case "ArrowRight":
            direcao.x = 1
            direcao.y = 0;
            break;
    }
}

window.addEventListener("keydown", (e) => direcionaCobrinha(e))




principal();
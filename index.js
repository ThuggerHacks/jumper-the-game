
let mario, pipe,marioTop, pipeTop, score, score_val, isPlaying, scene, isJumping, interval, vel, audio;

const playGame = () => {
    init();
    audio.play();
    setInterval(doneLost,1)
    doneLost()
    interval = setInterval(() => {
        score++;
       },2000)
    document.querySelector("button").style.display = "none"
}
const init = () => {
    mario = document.querySelector(".mario");
    pipe = document.querySelector(".pipe");
    score_val = document.querySelector(".score-val");
    scene = document.querySelector(".scene");
    marioTop = 120;
    pipeTop = 130;
    score = 0;
    isJumping = false;
    isPlaying = true;
    vel = 2;
    audio = new Audio();
    audio.src = "audios/01 Running About.mp3";
    scene.classList.remove("scene-night")
    scene.classList.remove("scene-rain")
    scene.classList.remove("scene-sun")
    pipe.classList.add("animate-pipe");
    document.addEventListener('click',jump);
    document.addEventListener('keydown',jump);
}

const jump = (event) => {
 
    if(isPlaying){
        let key = event.keyCode?event.keyCode:32;
        isJumping = true;
        marioTop = 150;
    
        if( key == 32 ) {
            mario.classList.add("jump");
            setTimeout(() => {
                mario.classList.remove("jump");
                marioTop = 120;
                isJumping = false;
            },400)
        }
    }
}

const doneLost = () => {

   if(isPlaying){
        score_val.innerText = score;
        let marioX = mario.offsetLeft
        let marioWidth = mario.offsetWidth;
        let pipeX = pipe.offsetLeft;
        let pipeWidth = pipe.offsetWidth;


    if((pipeX - pipeWidth) < marioX && marioTop <= pipeTop && (pipeX - pipeWidth) > (marioX - marioWidth)){
        pipe.classList.remove("animate-pipe");
        pipe.style.left = (pipeX) + "px"
        mario.style.animation = "none";
        mario.style.bottom = (+window.getComputedStyle(mario).bottom)
        mario.src = "images/game-over.png"
        mario.classList.remove("mario");
        mario.classList.add("mario-loser");
        isPlaying = false;
        clearInterval(interval);
        audio.src = "audios/smb_gameover.wav";
        audio.play()
      setTimeout(() => {
        audio.pause();
      },35000)
    }
    

    if(score%2 == 0 && vel > 0){
        vel-=0.1;
    }
    if(score >= 10 && score < 20) {
        scene.classList.add("scene-night")
        scene.classList.remove("scene-rain")
        scene.classList.remove("scene-sun")
        pipe.style.animationDelay = vel +"s";
    }else if(score >= 20 && score < 30){
        scene.classList.add("scene-rain")
        scene.classList.remove("scene-night")
        scene.classList.remove("scene-sun")
        pipe.style.animationDelay = vel +"s";
    }else if(score >= 30 && score < 50){
        scene.classList.add("scene-sun")
        scene.classList.remove("scene-rain")
        scene.classList.remove("scene-night")
        pipe.style.animationDelay = vel +"s";
    }else{
        scene.classList.remove("scene-night")
        scene.classList.remove("scene-rain")
        scene.classList.remove("scene-sun")
        pipe.style.animationDelay = vel +"s";
    }
   }
}
const playboard= document.querySelector(".play-board");
let intervalid;
let foodX  , foodY ,snakeX=9 , snakeY=5,velocityX=0,velocityY=0;
let score =0;
document.querySelector(".score b").innerHTML = score;
let snakeBody=[];
let gameover=false;
let highscore = document.querySelector(".high-score b");
const controls = document.querySelectorAll(".controls i");
if(localStorage.getItem("maxscore")==null){
   localStorage.setItem("maxscore",0);
}
highscore.innerHTML=localStorage.getItem("maxscore");



const changeFoodPosition =()=>{
    // passning a random number between 0 to 30
    foodX = Math.floor(Math.random()*30) +1;
    foodY = Math.floor(Math.random()*30) +1;
}
const changeDirection =(e)=>{
    //console.log(e);
   // changing direction on pressing  keyboard keys
    if(e.key === "ArrowUp" && velocityY!=1){
        velocityX =0;
        velocityY=-1;
    }
    else if(e.key === "ArrowDown" && velocityY!=(-1)){
        velocityX =0;
        velocityY=1;

    }
    else if(e.key === "ArrowLeft" && velocityX!=1){
        velocityX =-1;
        velocityY=0;
    }
    else if(e.key === "ArrowRight" && velocityX!=(-1)){
        velocityX =1;
        velocityY=0;
    }
   initGame();
    
    
}
const handleGameover=()=>{
    clearInterval(intervalid);
   
     alert( `Game over.Your score is ${score}.  Click on Ok to restart Game`);
     location.reload();
   // location.reload(forcedReload);
    //forcedReload (optional): A Boolean value. If true, the page will be reloaded from the server (ignoring the cache). If false or omitted, the browser may reload the page from the cache.

    
}
const initGame = ()=>{
    if(gameover){
        return handleGameover();
    }
    let htmlMarkup = `<div class ="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
    
    
    ;
    if(snakeX===foodX && snakeY === foodY){
        changeFoodPosition();
         //pusing food position to snake body array
        score++;
        let prev = localStorage.getItem("maxscore");
        if(score>prev){
           // localStorage.removeItem("maxscore");
            localStorage.setItem("maxscore",score);
            highscore.innerHTML=score;
    
        }

        document.querySelector(".score b").innerHTML = score;
        snakeBody.push([foodY,foodX]);
       // console.log(snakeBody);
    }
    //shifting forward the values of the elements in the snake body by one . see , next interval me kya hoga har ek block uske aage block ki place pe aa jega or head hoga vo current position pe aajega

    snakeX+=velocityX; 
    snakeY+=velocityY;
    for(let i = snakeBody.length-1;i>0;i--){
        snakeBody[i]=snakeBody[i-1]
    }
    snakeBody[0]=([snakeX,snakeY]); // head toh current position pe hoga .
    // Update the snake's head position based on the current velocity 


    if(snakeX<=0 || snakeX>30||snakeY<=0 || snakeY>30 ){
       return  gameover=true;
    }
    
    for(let i=0;i<snakeBody.length;i++){
            //adding a div for each part of the snake's body.
        // checking if snake head hits its own body 
        if(i==0){
            htmlMarkup+=`<div class ="front" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;    
        }
        else 
        {
            htmlMarkup+=`<div class ="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;}

        if(i!==0 && snakeBody[0][1]===snakeBody[i][1] && snakeBody[0][0]== snakeBody[i][0] ){
            gameover= true ;
            //handleGameover();
        } 
        
    }
    // htmlMarkup+= `<div class ="head" style="grid-area: ${snakeY} / ${snakeX}"></div>`;
    playboard.innerHTML = htmlMarkup;
    // creating snake body through snakeBody position where food eat.

    

}
changeFoodPosition();
initGame();
intervalid= setInterval(initGame,125);
// keydown is the event for keyboard keys .
 document.addEventListener("keydown",changeDirection);
controls.forEach(key=>{
    key.addEventListener("click",()=>
    {let e ={ key : key.id}
    changeDirection(e);})
})
let userClickedPattern = [];
let gamePattern = [];
var started = false;
var level = 0;

let buttonColours=["red", "green", "blue", "yellow"]

function playSound(name){
       var audio = new Audio( "sounds/" + name +".mp3");
        audio.play();
}

function animatePress(currentColour){
    $("." + currentColour).addClass("pressed")
    setTimeout(()=>{
        $("." + currentColour).removeClass("pressed")
    },100)
}

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id")
    userClickedPattern.push(userChosenColour)
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    })

function newsquence(){
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);
    let randomnumber = Math.floor((Math.random() * 4));
    let randomChosenColour = buttonColours[randomnumber]   
        gamePattern.push(randomChosenColour)
        $("#"+ randomChosenColour).fadeOut(100).fadeIn(100)
        playSound(randomChosenColour);
}
 
$("body").keypress(()=>{
    if(!started){
    $("#level-title").text("level " + level)
    newsquence();
    started = true;
    }
    
})



function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel] ){

        console.log("success")
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              newsquence();
            }, 1000);
    }
}
     else {
        $("#level-title").text("game Over, Press any key to restart")
        var audio = new Audio( "sounds/wrong.mp3");
        audio.play();
        $("body").addClass("gameover")
        setTimeout(()=>{
            $("body").removeClass("gameover")   
        },200);
        startOver();
     }

}
function startOver(){
    gamePattern =[];
    userClickedPattern = [];
    level = 0;
    started = false;
}
x = 0;
y = 0;
screen_width = 0;
screen_height = 0;
apple = "";
to_number = "";
draw_apple = "";

var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();

function start()
{
  document.getElementById("status").innerHTML = "System is listening please speak";  
  recognition.start();
} 
 
recognition.onresult = function(event) {
  content = event.results[0][0].transcript;
  console.log(content); 
  document.getElementById("status").innerHTML = "The speech has been recognized: " + content; 
  to_number = Number(content);
  if(Number.isInteger(to_number)){
    document.getElementById("status").innerHTML = "Started drawing apple";
    draw_apple = "set"
  }
  else{
    document.getElementById("status").innerHTML = "The system hasn't heard you say a number. Please try again and say a valid number.";
  }


}

function preload() {
  apple = loadImage("apple.png");
}

screen_width = window.innerWidth;
screen_height = window.innerHeight-150;
function setup() {
  canvas= createCanvas(screen_width, screen_height);
  canvas.position(0,150);
}

function draw() {
  if(draw_apple == "set")
  {
    for (var i = 0; i < to_number; i++) {
     x = Math.floor(Math.random()*screen_width)
     y = Math.floor(Math.random()*screen_height)
     image(apple,x,y,50,50);
      
    }
    document.getElementById("status").innerHTML = to_number + " Apples drawn";
    speak_data = "apples drawn";
    speak();
    draw_apple = "";
  }
}

function speak(){
    var synth = window.speechSynthesis;

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);

    speak_data = "";
}

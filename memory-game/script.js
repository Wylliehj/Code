const startButton = document.querySelector('#start');
const scoreDiv = document.getElementById('score');
let scoreVal = 0;
let scoreValLow = 0;
const gameContainer = document.getElementById("game");
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

function shuffle(array) { 
  let counter = array.length;
 
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--; 
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}
let shuffledColors = shuffle(COLORS);


function createDivsForColors(colorArray) {
  startButton.addEventListener('click', function(event){
    
    const score = document.createElement('div');
    score.classList.add('currentScore');
    score.innerText = 'Score: ';
    scoreDiv.append(score);
    const scoreNum = document.createElement('span');
    scoreNum.classList.add('scoreNum');
    scoreNum.innerText = scoreVal;
    score.append(scoreNum);

    const lowScore = document.createElement('div');
    lowScore.classList.add('lowScore')
    lowScore.innerText = 'Lowest Score: ';
    scoreDiv.append(lowScore);

    startButton.remove();

    for (let color of colorArray) {
      const newDiv = document.createElement("div");
      newDiv.classList.add(color);
      newDiv.addEventListener("click", handleCardClick);
      gameContainer.append(newDiv);
    }
  })
}

let compareArr = [];
let div1 = '';
let div2 = '';
function handleCardClick(event) {
  const newColor = event.target.className;
  const divClicked = event.target; //div clicked
  compareArr.push(newColor);
  
  

  if(compareArr.length < 3){
    event.target.style.backgroundColor = newColor;
    scoreVal += 1;
    divClicked.removeEventListener('click', handleCardClick); //remove the event listener
  }
  if(compareArr.length === 1){
    let div1 = divClicked; //attempt to assign div to value div 1
    console.log(div1)   //console.log works
  }

  if(compareArr.length === 2){
    let div2 = divClicked; //attempt to assign 2nd div clicked to value div 2
    console.log(div2)   //console.log works
    
    if(compareArr[0] === compareArr[1]){
      console.log('Match');
      compareArr = [];
    }
    else{
      setTimeout(function() {
        console.log('No match');
        let color1 = document.getElementsByClassName(compareArr[0]);
        let color2 = document.getElementsByClassName(compareArr[1]);
        console.log(div1, div2); //only displays div2
        div1.addEventListener('click', handleCardClick); //add event listener back if not a match, code only works on the div2
        div2.addEventListener('click', handleCardClick);
        
      
        for(let k of color1){
          k.style.backgroundColor = '';
        }

        for(let k of color2){
          k.style.backgroundColor = '';
        }
        compareArr = [];
      },1000)
    }
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);


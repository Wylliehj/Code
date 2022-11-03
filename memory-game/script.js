const startButton = document.querySelector('#start');
const scoreDiv = document.getElementById('score');
let scoreVal = null;
let scoreValLow = null;
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
function handleCardClick(event) {
  const newColor = event.target.className;
  compareArr.push(newColor);


  if(compareArr.length < 3){
    scoreVal += 1;
    const scoreNum = document.getElementsByClassName('scoreNum');
    scoreNum.innerText = scoreVal;
    event.target.style.backgroundColor = newColor;
    console.log(scoreNum)
  }
 
  if(compareArr.length === 2){
    if(compareArr[0] === compareArr[1]){
      console.log('Match');
      compareArr = [];
    }
    else{
      setTimeout(function() {
        console.log('No match');
        let color1 = document.getElementsByClassName(compareArr[0]);
        let color2 = document.getElementsByClassName(compareArr[1]);
      
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

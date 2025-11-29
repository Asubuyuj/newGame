const playBtn = document.getElementById('play-btn');
const howToBtn = document.getElementById('how-to-play-btn');
const message = document.getElementById('message');
const closeBtn = document.getElementById('close-btn');
//function to explain the game
function moveToPlayScreen(){
  window.location.href = "game.html";
}

//function to display rules on how to play blackjack
function howTo() {
  message.style.display = 'block';
  closeBtn.style.display = 'block';

}

function closeRules() {
  message.style.display = 'none';
  closeBtn.style.display = 'none';
}



// Event Listeners
playBtn.addEventListener('click', moveToPlayScreen)
howToBtn.addEventListener('click', howTo)
closeBtn.addEventListener('click', closeRules)
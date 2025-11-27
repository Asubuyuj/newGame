const playBtn = document.getElementById('play');
//function to explain the game
function moveToPlayScreen(){
  window.location.href = "index.html";
}

// Event Listeners
playBtn.addEventListener('click', moveToPlayScreen)
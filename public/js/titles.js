//slice titles that are too large to fit on one row
var gameTitles = document.querySelectorAll(".game-title");
for(let i =0; i < gameTitles.length; i++){
    let idealTitle = gameTitles[i].textContent.slice(0,32)+"...";
    if(gameTitles[i].textContent.length > 35){
        gameTitles[i].textContent = idealTitle;
    }
}

//this is to toggle between dark and light mode
function toggleMode(){
    const toggleBall = document.querySelector('.toggle-ball');
    const items = document.querySelectorAll(
      '.night-mode, .toggle-ball, .toggle,.featured-container,.intro'
    );
  
    toggleBall.addEventListener('click', () => {
      items.forEach((item) => {
        item.classList.toggle('active');
      });
    });
  }
  
  toggleMode();
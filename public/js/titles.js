//slice titles that are too large to fit on one row
var gameTitles = document.querySelectorAll(".game-title");
for(let i =0; i < gameTitles.length; i++){
    let idealTitle = gameTitles[i].textContent.slice(0,32)+"...";
    if(gameTitles[i].textContent.length > 35){
        gameTitles[i].textContent = idealTitle;
    }
}
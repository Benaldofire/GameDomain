window.addEventListener("DOMContentLoaded", expand);

//adds a class in order to expand the game card details when mouse hovers over it,
//collapses it once the mouse leaves
function expand(){
    console.log("expand func");
    let selected_game = document.querySelectorAll(".game");

    for(elem of selected_game){
        elem.addEventListener("mouseenter", (event) =>{
            console.log("Entered")
            console.log(event.target.classList);
            event.target.classList.add("active-game");
            console.log(event.target.classList);
        });
    
        elem.addEventListener("mouseleave", (event) =>{
            console.log("Exited");
            event.target.classList.remove("active-game");
        });
    }

}
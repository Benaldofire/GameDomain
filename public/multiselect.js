//multiselect js is in the game.ejs, as it applies to only that template
window.addEventListener("DOMContentLoaded", dropList);

//Utilizing the event caputuring and bubbling, if 3rd param of event listener is set to true then handler is in event capturing phase
function dropList(){
    let expanded = false;
    const dropdown = document.querySelector('.dropdown');
    const dropdownContent = document.querySelector(".dropdown-content");
    const dropdownName = document.querySelector(".dropdown-name");
    dropdown.addEventListener('click', function(event) {
        if (!expanded) {
        dropdownContent.style.display = "block";
        dropdownName.style.borderRadius  = "5px 5px 0 0";
        expanded = true;
    } else {
        dropdownContent.style.display = "none";
        dropdownName.style.borderRadius  = "5px";
        expanded = false;
    }
    event.stopPropagation();
    }, true);

    document.addEventListener('click', function(event){
    if (expanded) {
        dropdownContent.style.display = "none";
        dropdownName.style.borderRadius  = "5px";
        expanded = false;
    }
    }, false);
}

/*Learnt how to do this from
https://codepen.io/davidysoards/pen/QXYYYa?editors=1010
*/

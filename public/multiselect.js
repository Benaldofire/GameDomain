window.addEventListener("DOMContentLoaded", dropList);

function dropList(){
    console.log("here");
    let expanded = false;
    const all_genres = document.querySelector('.all_genres');

    all_genres.addEventListener('click', function(event) {
    const dropDown = document.querySelector("#dropDown");
        if (!expanded) {
        dropDown.style.display = "block";
        expanded = true;
    } else {
        dropDown.style.display = "none";
        expanded = false;
    }
    event.stopPropagation();
    }, true);

    document.addEventListener('click', function(event){
    if (expanded) {
        dropDown.style.display = "none";
        expanded = false;
    }
    }, false);
}

//Mobile navigation menu.
//Using Jquery. Exapands the menu when clicked, by adding/removing the class modifications to it.
$(document).ready(()=>{
    console.log("Loaded")
    //practice with JQuery
    $(".open_nav").click(()=>{
        $(".open_nav").toggleClass("change");
        $(".open_nav").toggleClass("open");
        $(".nav-content").toggleClass("open");
    });


});



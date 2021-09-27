
$(document).ready(()=>{
    console.log("Loaded")
    //practice with JQuery
    $(".open_nav").click(()=>{
        $(".open_nav").toggleClass("change");
        $(".nav-content").toggleClass("open");
    });
});



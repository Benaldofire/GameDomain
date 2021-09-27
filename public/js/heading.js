
$(document).ready(()=>{
    console.log("Loaded")
    //practice with JQuery
    $(".open_nav").click(()=>{
        $("#nav-content").css("width","75%");
    });

    $(".close_nav").click(()=>{
        $("#nav-content").css("width","0%");
    });
});



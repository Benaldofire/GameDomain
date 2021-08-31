
//slice titles that are too large to fit on one row
var gameTitle = document.getElementsByClassName("game-title");
for(let i =0; i < gameTitle.length; i++){
    let idealTitle = gameTitle[i].textContent.slice(0,32)+"...";
    
    if(gameTitle[i].textContent.length > 35){
        gameTitle[i].innerHTML = idealTitle;
    }
}

getFeatured();
let games = new Array();
async function getFeatured(){
    /*  
        Server Side code
        if we have in our database then, and its less than a week old then pull data from our database
        Else; use a GET request to get new data and add it to the database.
    */
   
}


//Slide show
function featuredImg(){
    //change the image in the featured container.
    let currentSlide = 0;
    let img = document.querySelector("#featured-img");
    let desc = document.querySelector("#featured_description");
    let title = document.querySelector("#featured_title");
   
    function next(){

    currentSlide++;
    //if its end of the list then return to 0 upon press
    if(currentSlide >= games.length ){
        currentSlide = 0;
    }

    // now change current image and desceiption to the new game
    img.src = games[currentSlide].background_img;
    desc.textContent = games[currentSlide].description;
    title.textContent = games[currentSlide].name;

    //remove active status on previous thumbnails
    let column_imgs = document.querySelectorAll(".column");
    for(column of column_imgs){
        column.classList.remove("active");
    }

    //change set current slide to active
    column_imgs[currentSlide].classList.add("active");
    }

    function prev(){
        currentSlide--;
        if(currentSlide < 0){
            currentSlide = games.length - 1;
        }
        img.src = games[currentSlide].background_img;
        desc.textContent = games[currentSlide].description;
        title.textContent = games[currentSlide].name;
    }

    document.querySelector("#next").addEventListener('click',next);
    document.querySelector("#prev").addEventListener('click',prev);
    

  
    //automatic slides
    
    let slideTimer = setInterval(next, 5000);

    //set the featured slide using the index number gained from the alt.
    function thumbnail_set(event){
        let column_imgs = document.querySelectorAll(".column");
        //remove active class from other classes to bring opacity down to 0.5
        for(column of column_imgs){
            column.classList.remove("active");
        }

        //identify the column # that was clicked on, then make it active and set it as the main featured app
        let idx = event.target.alt;
        column_imgs[idx].classList.add("active");
        img.src = event.target.src;
        desc.textContent = games[idx].description;
        title.textContent = games[idx].name;

        //update currentSlide number, to keep the automated events in sync
        currentSlide = idx;

        //then clear the timer and start a new one.
        
        clearInterval(slideTimer);
        slideTimer = setInterval(next, 5000);
        
    }

    //the alt of the image will be the index number of the specific game, which will be used to set the main featured slide.
    function thumbnail(){
        let row = document.querySelector("#row");
        for(let i =0; i<games.length; i++){
            let column = document.createElement('div');
            column.classList.add('column');
            let img = document.createElement('img');
            img.src = games[i].background_img;
            img.alt = i;
            column.append(img);
            row.append(column);
        }

        let columns = document.querySelectorAll(".column");
        //add event listener to all thumbnail images, use selected image as main profile.
        for(column of columns){
            column.addEventListener('click',thumbnail_set);
        }
    }
    thumbnail();

    
}

featuredImg();


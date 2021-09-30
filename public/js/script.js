
//Slide show
async function featuredImg(){
    //get the data from the server
    let response = await fetch('/popular');
    let games = await response.json();

    //change the image in the featured container.
    let currentSlide = 0;
    let img = document.querySelector("#featured-img");
    let desc = document.querySelector("#featured_description");
    let title = document.querySelector("#featured_title");
    let platforms_container = document.querySelector(".platform-list");
    let btnLink = document.querySelector(".featured-btn");

    function next(){
        currentSlide++;
        //if its end of the list then return to 0 upon press
        if(currentSlide >= games.length ){
            currentSlide = 0;
        }

        // now change current image and desceiption to the new game
        img.src = games[currentSlide].background_img;
        //desc.innerHTML = (games[currentSlide].description).slice(0,games[currentSlide].description.indexOf(".", 150));
        title.textContent = games[currentSlide].name;
        //rating.textContent = "Rating: "+games[currentSlide].rating;
        btnLink.href = `/games/${games[currentSlide].id}`;

        //Dont want 2 playstation logos for ps4 and ps5 so have a boolean to detect one of em
        let playstation = true; 
        //reset the innerhtml for the platforms for each game.
        platforms_container.innerHTML = "";
        for(platforms of games[currentSlide].platform){
            //insert image associated with the specific platform
            if(platforms == "Xbox One"){
                platforms_container.innerHTML += '<i class="fab fa-xbox"></i>';
            }
            if((platforms == "PlayStation 4" || platforms == "PlayStation 5") && playstation){
                playstation = false;
                platforms_container.innerHTML += '<i class="fab fa-playstation"></i>';
            }
            if(platforms == "PC"){
                platforms_container.innerHTML +='<i class="fab fa-windows"></i>';
            }
            if(platforms == "Nintendo"){
                platforms_container.innerHTML +=platforms;
            }
        }

        //remove active status on previous thumbnails
        let column_imgs = document.querySelectorAll(".column");
        for(column of column_imgs){
            column.classList.remove("active");
        }

        //change set current slide to active
        column_imgs[currentSlide].classList.add("active");
        clearInterval(slideTimer);
        slideTimer = setInterval(next, 5000);
    }

    //go to previous image when clicked
    function prev(){
        currentSlide--;
        if(currentSlide < 0){
            currentSlide = games.length - 1;
        }
        img.src = games[currentSlide].background_img;
        title.textContent = games[currentSlide].name;
        btnLink.href = `/games/${games[currentSlide].id}`;

        //loop needed for platforms and genres
        //Dont want 2 playstation logos for ps4 and ps5 so have a boolean to detect one of em
        let playstation = true; 
        //reset the innerhtml for the platforms for each game.
        platforms_container.innerHTML = "";
        for(platforms of games[currentSlide].platform){
            //insert image associated with the specific platform
            if(platforms == "Xbox One"){
                platforms_container.innerHTML += '<i class="fab fa-xbox"></i>';
            }
            if((platforms == "PlayStation 4" || platforms == "PlayStation 5") && playstation){
                playstation = false;
                platforms_container.innerHTML += '<i class="fab fa-playstation"></i>';
            }
            if(platforms == "PC"){
                platforms_container.innerHTML +='<i class="fab fa-windows"></i>';
            }
            if(platforms == "Nintendo"){
                platforms_container.innerHTML +=platforms;
            }
        }
        
        //remove active status on previous thumbnails
        let column_imgs = document.querySelectorAll(".column");
        for(column of column_imgs){
            column.classList.remove("active");
        }

        //change set current slide to active
        column_imgs[currentSlide].classList.add("active");
        clearInterval(slideTimer);
        slideTimer = setInterval(next, 5000);
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
            img.classList.add("column_img");
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

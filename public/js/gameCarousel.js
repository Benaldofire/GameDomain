const carousel = () => {
        
    //Get DOM elements
    const track = document.querySelector(".carousel__track");
    const slides = document.querySelectorAll(".carousel__slide");
    const nextButton = document.querySelector(".carousel__button--next");
    const prevButton = document.querySelector(".carousel__button--prev");

    console.log(slides);

    const slideWidth = slides[0].getBoundingClientRect().width;
    let currentSlide = 0;
    //do it based on the number of images that can fit in the current container width +1. But if the increment is more than the total number of images, then only increment by the remaining. 

    //When I click right, move slides to the right
    nextButton.addEventListener("click",()=>{
        containerWidth = track.getBoundingClientRect().width;
        let increment = Math.floor(containerWidth/slideWidth);
        console.log("increment by: "+increment)
        //increment the current slide pane, upon each click
        currentSlide = currentSlide+increment;
        console.log("current Slide: "+currentSlide)
        //reset the currentSlide when we get to the end
        if(currentSlide >= track.childElementCount){
            currentSlide = 0;
        }

        //we are going to keep our pointer on one of the slides and always transition to that slide. till we get to the end.
        let moveWidth = slideWidth*currentSlide;
        track.style.transform = "translateX(-"+(moveWidth)+"px)";
    });


    //When I click left, move slides to the left
    prevButton.addEventListener("click",()=>{
        containerWidth = track.getBoundingClientRect().width;
        let currentSlideDecre = Math.floor(containerWidth/slideWidth);
        
        if(currentSlide == 0){
            currentSlide = track.childElementCount - currentSlideDecre;
        }
        else if(currentSlide >= currentSlideDecre){
            currentSlide = currentSlide - currentSlideDecre;
        }
        else{
            currentSlide = 0;
        }
        console.log(currentSlide);
        
        
        let moveWidth = slideWidth*currentSlide;
        track.style.transform = "translateX(-"+(moveWidth)+"px)";
    })
}

carousel();

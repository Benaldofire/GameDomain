const carousel = () => {
        
    //Get DOM elements
    const track = document.querySelector(".carousel__track");
    const slides = document.querySelectorAll(".carousel__slide");
    const nextButton = document.querySelector(".carousel__button--next");
    const prevButton = document.querySelector(".carousel__button--prev");

    console.log(slides);

    const slideWidth = slides[0].getBoundingClientRect().width + 32;
    console.log(slideWidth);
    const slideTotal = track.childElementCount;
    const containerWidth = track.getBoundingClientRect().width;
    const slidesVisible = Math.floor(containerWidth/slideWidth);
    let currentSlide = 0;

    //When I click right, move slides to the right
    nextButton.addEventListener("click",()=>{
        //increment the current slide pane, upon each click
        currentSlide++;

        //reset the currentSlide when we get to the last image
        if(slideTotal - (slidesVisible + currentSlide) < 0){
            currentSlide = 0;
        }

        let moveWidth = slideWidth*currentSlide;
        track.style.transform = "translateX(-"+(moveWidth)+"px)";
    });


    //When I click left, move slides to the left
    prevButton.addEventListener("click",()=>{
        //decrement the current slide pane, upon each click
        currentSlide--;
        
        if(currentSlide < 0){
            currentSlide = track.childElementCount - slidesVisible;
        }
        
        let moveWidth = slideWidth*currentSlide;
        track.style.transform = "translateX(-"+(moveWidth)+"px)";
    })
}

carousel();

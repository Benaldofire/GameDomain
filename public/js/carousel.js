/*what if you use flexbox and set it to one another then use the overflow hidden. Then for the slides you get all the images that you need into an array. 
Then for the slidewidth you get the imagewidth instead of the width of the carousel container. 
*/
const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".carousel__button--right");
const prevButton = document.querySelector(".carousel__button--left");
const dotsNav = document.querySelector(".carousel__nav")
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

//arrange the slides next to one another
    //Set the left edge of a positioned slideImg to the slideWidth from the left edge of its nearest positioned ancestor

/*
1st slide is aligned at left 0,  
2nd slide is aligned at 0 + slideWidth; 
3rd slide is aligned at 0 + slideWidth * 2;
    e.g 200px * 0 = 0
        200px * 1 = 200px
        200px * 2 = 400px
        ...
*/

//may need to add event listener on the window to listen for any changes to the window width.
const setSlidePosition =  (slide, index)=>{
    slide.style.left = slideWidth * index + 'px';
}
slides.forEach(setSlidePosition);


const moveToSlide= (track, currentSlide, targetSlide) =>{
    //update the current slide to the next one.
    track.style.transform = "translateX(-"+ targetSlide.style.left+ ")";
    currentSlide.classList.remove("current-slide");
    targetSlide.classList.add("current-slide");
}

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove("current-slide");
    targetDot.classList.add("current-slide");
}
//When I click left, move slides to the left
prevButton.addEventListener('click', (e)=>{
    const currentSlide = track.querySelector(".current-slide");
    const currentDot = dotsNav.querySelector(".current-slide");
    let prevDot;
    //Go to the end, if no previous sibling exists

    //these can be solved by having a counter to keep track of current slide.
    let prevSlide;
    if(currentSlide.previousElementSibling){
        prevSlide = currentSlide.previousElementSibling;
        prevDot = currentDot.previousElementSibling;
    }
    else{
        //if we are on the last image we want to jump to the last one and restart.
        prevSlide = track.lastElementChild;
        prevDot = dotsNav.lastElementChild;
    }

    moveToSlide(track,currentSlide,prevSlide);
    updateDots(currentDot, prevDot);
});


//when I click right, move the slides to the right
nextButton.addEventListener('click', (e)=>{
    const currentSlide = track.querySelector(".current-slide");
    let nextSlide;
    const currentDot = dotsNav.querySelector(".current-slide");
    let nextDot;
    
    if(currentSlide.nextElementSibling){
        nextSlide = currentSlide.nextElementSibling;
        nextDot = currentDot.nextElementSibling;
    }
    else{
        nextSlide = track.firstElementChild;
        nextDot = dotsNav.firstElementChild;
    }
    
    moveToSlide(track,currentSlide,nextSlide);
    updateDots(currentDot, nextDot);
});

//when i click the indicator, move to that slide
dotsNav.addEventListener("click",(e)=>{
    const targetDot = e.target.closest("button");
    if(!targetDot) return;
    const currentSlide = track.querySelector(".current-slide");
    const currentDot = dotsNav.querySelector(".current-slide")
    const targetIndex = dots.findIndex(dot => dot === targetDot); //return index number of the dot clicked.
    const targetSlide = slides[targetIndex];

    //update the current dot class
    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
})
const carousel = () => {
  //Get DOM elements
  const track = document.querySelector('.carousel__track');
  const slides = document.querySelectorAll('.carousel__slide');
  const nextButton = document.querySelector('.carousel__button--next');
  const prevButton = document.querySelector('.carousel__button--prev');

  let currentSlide = 0;

  //variables set but not initialized.
  let slideTotal, containerWidth, slideWidth, slidesVisible;

  //update variables on click. To refresh values on screen size change.
  function updateWidths(){
    slideTotal = track.childElementCount;
    containerWidth = track.getBoundingClientRect().width;
    slideWidth = slides[0].getBoundingClientRect().width + 32;
    slidesVisible = Math.floor(containerWidth / slideWidth);
  }
  
  //When I click Next Button, move slides to the right
  nextButton.addEventListener('click', () => {
    updateWidths();
    //increment the current slide pane, upon each click
    currentSlide++;

    console.log(containerWidth);
    //reset the currentSlide when we get to the last image
    if (slideTotal - (slidesVisible + currentSlide) < 0) {
      currentSlide = 0;
    }

    let moveWidth = slideWidth * currentSlide;
    track.style.transform = 'translateX(-' + (slideWidth * currentSlide) + 'px)';
  });

  //When I click left, move slides to the left
  prevButton.addEventListener('click', () => {
    updateWidths();
    //decrement the current slide pane, upon each click
    currentSlide--;

    if (currentSlide < 0) {
      currentSlide = track.childElementCount - slidesVisible;
    }

    track.style.transform = 'translateX(-' + (slideWidth * currentSlide) + 'px)';
  });
};

carousel();

//trailer not ready yet. Work with youtube API
document.querySelector('.play-btn').addEventListener('click', () => {
  alert('Sorry, Work in progress');
});



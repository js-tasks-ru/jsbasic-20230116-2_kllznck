function initCarousel() {
  let rightArrow = document.querySelector('.carousel__arrow_right')
  let leftArrow = document.querySelector('.carousel__arrow_left')
  let carouselInner = document.querySelector('.carousel__inner')
  let x = 0
  leftArrow.style.display = 'none';

  offsetRight = () => {
    carouselInner.style.transform = `translateX(${x -= carouselInner.offsetWidth}px)`
    leftArrow.style.display = '';
    if(x < -carouselInner.offsetWidth * 2) {
      rightArrow.style.display = 'none'
    }
  }

  offsetLeft = () => {
    carouselInner.style.transform = `translateX(${x += carouselInner.offsetWidth}px)`
    rightArrow.style.display = '';
    if(x == 0) {
      leftArrow.style.display = 'none'
    }
  }

  rightArrow.addEventListener('click', offsetRight)
  leftArrow.addEventListener('click', offsetLeft)
}

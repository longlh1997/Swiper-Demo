let currentSlice = 0
let xDown = null;

function handleTouchStart(e) {
  xDown = e.touches[0].clientX;
}
function handleTouchMove(evt) {
  if ( ! xDown ) {
    return;
  }

  let xUp = evt.touches[0].clientX;

  let xDiff = xDown - xUp;

  if ( xDiff > 0 ) {
    nextSlice()
  } else {
    prevSlice()
  }
  xDown = null;
}

document.getElementById('swiper-container').addEventListener('touchstart', handleTouchStart)
document.getElementById('swiper-container').addEventListener('touchmove', handleTouchMove)

function widthResizer(){
  let width = window.innerWidth
  const slices = document.getElementsByClassName('slide')

  for (let slice of slices) {
    slice.style.minWidth = width + 'px'
  }
}

function changeSlice() {
  const swiperElement = document.getElementsByClassName('swiper-container')[0]
  const slices = document.getElementsByClassName('slide')
  const width = window.innerWidth
  const tx = Math.max(Math.min(currentSlice * width, width * slices.length), 0)

  if (swiperElement) {
    swiperElement.style.transform = `translate3d(-${tx}px, 0px, 0px)`
  }
}

function checkStatusOfArrowButton() {
  const slices = document.getElementsByClassName('slide')
  const arrowLeftElement = document.getElementById('arrow-left-btn')
  const arrowRightElement = document.getElementById('arrow-right-btn')

  if (currentSlice === 0) {
    arrowLeftElement.classList.add('arrow-disable')
  } else {
    arrowLeftElement.classList.remove('arrow-disable')
  }

  if (currentSlice === slices.length - 1) {
    arrowRightElement.classList.add('arrow-disable')
  } else {
    arrowRightElement.classList.remove('arrow-disable')
  }
}

function prevSlice() {
  currentSlice = Math.max(currentSlice - 1, 0)

  checkStatusOfArrowButton()
  changeSlice()
}

function nextSlice() {
  const slices = document.getElementsByClassName('slide')
  currentSlice = Math.min(currentSlice + 1, slices.length - 1)

  checkStatusOfArrowButton()
  changeSlice()
}

widthResizer()
checkStatusOfArrowButton()
window.addEventListener('resize', widthResizer)

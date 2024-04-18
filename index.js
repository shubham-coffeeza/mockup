document.addEventListener("DOMContentLoaded", function() {
    

function isMobileDevice() {
    return /Mobile|Android/i.test(navigator.userAgent);
}

function isTabletDevice() {
  return /iPad/i.test(navigator.userAgent) || (/(tablet|ipad|playbook|silk)|(android(?!.*mobile))/i.test(navigator.userAgent));
}
//screen loader start
    document.body.classList.add('loaded');
//screen loader end

//brand logo animation start
    window.addEventListener('scroll', function() {
        var targetElement = document.querySelector('header');
        var currentScrollPosition = window.scrollY;
        if (currentScrollPosition > 36) {
            targetElement.classList.add('scrolled');
        } else {
            targetElement.classList.remove('scrolled');
        }
        if (currentScrollPosition > 100) {
            document.querySelector('.banner-wrapper').classList.add('scrolled-pass-100');
        } else {
            document.querySelector('.banner-wrapper').classList.remove('scrolled-pass-100');
        }
    });

    // Function to check initial scroll position on page load
    function checkInitialScrollPosition() {
        if (window.scrollY > 100) {
            document.querySelector('header').classList.add('already-scrolled');
        }
    }

  // Check initial scroll position when the page loads
  checkInitialScrollPosition();
    
    // setTimeout(function() {
    //     document.querySelector('header').classList.add('scrolled');
    // }, 4000);
//brand logo animation end

//floating link start
    var isOpen = false;
    var startX, startY;
    var threshold = 50; // Minimum distance to be considered a swipe
    
    // Event listener for the floating link button click
    document.querySelector(".floating-link-btn").addEventListener("click", function(){
        if (!isOpen) {
            openFloatingLinkWindow();
        } else {
            closeFloatingLinkWindow();
        }
    });
    
    // Function to open the floating link window
    function openFloatingLinkWindow() {
        document.querySelector(".floating-link-window").style.transform = "translate(0, -50%)";
        document.querySelector(".floating-link-btn").style.transform = "translateY(-50%) rotate(180deg)";
        isOpen = true;
    }
    
    // Function to close the floating link window
    function closeFloatingLinkWindow() {
        document.querySelector(".floating-link-window").style.transform = "translate(240px, -50%)";
        document.querySelector(".floating-link-btn").style.transform = "translateY(-50%) rotate(0deg)";
        isOpen = false;
    }
    
    // Event listener for touch start
    document.querySelector(".floating-link-btn").addEventListener("touchstart", function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    // Event listener for touch end
    document.querySelector(".floating-link-btn").addEventListener("touchend", function(e) {
        var endX = e.changedTouches[0].clientX;
        var endY = e.changedTouches[0].clientY;
        
        var deltaX = endX - startX;
        var deltaY = endY - startY;
        
        // Check if the swipe is horizontal and greater than the threshold
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold) {
            if (deltaX > 0) {
                closeFloatingLinkWindow();
            } else {
                openFloatingLinkWindow();
            }
        }
    });
//floating link start


//Coupon Btn
    
    document.querySelector(".coupon-btn-wrapper").addEventListener("click", function(){
        document.querySelector(".coupon").classList.add("active");
    });

    document.querySelector("main").addEventListener("click", function(){
        document.querySelector(".coupon").classList.remove("active");
    });

    document.querySelector("footer").addEventListener("click", function(){
        document.querySelector(".coupon").classList.remove("active");
    });

    document.querySelector(".header-banner-wrapper").addEventListener("click", function(){
        document.querySelector(".coupon").classList.remove("active");
    });
    
//Coupon Btn

//hamburger
var hamburgerIsOpen = false;

document.querySelector(".hamburger").addEventListener("click", function(){
    document.querySelector(".navbar-mobile").classList.add("hamburger-active");
    hamburgerIsOpen = true;
});

document.querySelector(".close-btn").addEventListener("click", function(){
    document.querySelector(".navbar-mobile").classList.remove("hamburger-active");
    hamburgerIsOpen = false;
});
//hamburger


//Brand Slider
let currentSlide = 0;
const slides = document.querySelectorAll(".brand");
const totalSlides = slides.length/2;
const slideWidth = slides[0].clientWidth;
let startSliderX = 0;
let endX = 0;

//Show slide by index
function showSlide(index) {
  moveSlide(index);
}

//use transform for slides
function moveSlide(index) {
  const slideOffset = -index * slideWidth;
  if(isMobileDevice()){
    document.querySelector(".brand-wrapper").style.transform = `translateX(${slideOffset*2.5}px)`;
  }
  else
    document.querySelector(".brand-wrapper").style.transform = `translateX(${slideOffset}px)`;
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
  // If the next slide is the first slide, reset the transform to ensure looping
  if (currentSlide === (totalSlides/2)) {
    setTimeout(() => {
    //   document.querySelector(".brand-wrapper").style.transition = 'none';
      document.querySelector(".brand-wrapper").style.transform = `translateX(0px)`;
      setTimeout(() => {
        document.querySelector(".brand-wrapper").style.transition = '';
      }, 50);
    }, 500);
  }
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  showSlide(currentSlide);

  // If the previous slide is the last slide, reset the transform to ensure looping
  if (currentSlide === totalSlides - 1) {
    setTimeout(() => {
    //   document.querySelector(".brand-wrapper").style.transition = 'none';
      document.querySelector(".brand-wrapper").style.transform = `translateX(-${totalSlides-1 * slideWidth}px)`;
      setTimeout(() => {
        document.querySelector(".brand-wrapper").style.transition = '';
      }, 50);
    }, 500);
  }
}

document.querySelector(".prev").addEventListener("click", prevSlide);
document.querySelector(".next").addEventListener("click", nextSlide);

//Drag functionality for touch screens
function startDrag(event) {
  startSliderX = event.touches[0].clientX;
}

function drag(event) {
  endX = event.touches[0].clientX;
}

function endDrag() {
  const sensitivity = 50; // Adjust this value to control the sensitivity of the drag
  const dragDistance = startSliderX - endX;

  if (dragDistance > sensitivity) {
    nextSlide(); // Move to next slide
  } else if (dragDistance < -sensitivity) {
    prevSlide(); // Move to previous slide
  }
}

document.querySelector(".brand-wrapper").addEventListener("touchstart", startDrag);
document.querySelector(".brand-wrapper").addEventListener("touchmove", drag);
document.querySelector(".brand-wrapper").addEventListener("touchend", endDrag);
//Brand Slider

//Press Slider
let currentSlidePress = 0;
const slidesPress = document.querySelectorAll(".press");
const totalSlidesPress = slidesPress.length/2;
const slideWidthPress = slidesPress[0].clientWidth;
let startSliderXPress = 0;
let endXPress = 0;

//Show slide by index
function showSlidePress(index) {
  moveSlidePress(index);
}

//use transform for slidesPress
function moveSlidePress(index) {
  const slideOffset = -index * slideWidthPress;
  if(isMobileDevice()){
    document.querySelector(".press-wrapper").style.transform = `translateX(${slideOffset*2.5}px)`;
  }
  else
    document.querySelector(".press-wrapper").style.transform = `translateX(${slideOffset}px)`;
}

function nextSlidePress() {
  currentSlidePress = (currentSlidePress + 1) % totalSlidesPress;
  showSlidePress(currentSlidePress);
  // If the next slide is the first slide, reset the transform to ensure looping
  if (currentSlidePress === (totalSlidesPress/2)) {
    setTimeout(() => {
    //   document.querySelector(".brand-wrapper").style.transition = 'none';
      document.querySelector(".press-wrapper").style.transform = `translateX(0px)`;
      setTimeout(() => {
        document.querySelector(".press-wrapper").style.transition = '';
      }, 50);
    }, 500);
  }
}

function prevSlidePress() {
  currentSlidePress = (currentSlidePress - 1 + totalSlidesPress) % totalSlidesPress;
  showSlidePress(currentSlidePress);

  // If the previous slide is the last slide, reset the transform to ensure looping
  if (currentSlidePress === totalSlidesPress - 1) {
    setTimeout(() => {
    //   document.querySelector(".brand-wrapper").style.transition = 'none';
      document.querySelector(".press-wrapper").style.transform = `translateX(-${totalSlidesPress-1 * slideWidthPress}px)`;
      setTimeout(() => {
        document.querySelector(".press-wrapper").style.transition = '';
      }, 50);
    }, 500);
  }
}

document.querySelector(".press-prev").addEventListener("click", prevSlidePress);
document.querySelector(".press-next").addEventListener("click", nextSlidePress);

//Drag functionality for touch screens
function startDragPress(event) {
  startSliderXPress = event.touches[0].clientX;
}

function dragPress(event) {
  endXPress = event.touches[0].clientX;
}

function endDragPress() {
  const sensitivity = 50; // Adjust this value to control the sensitivity of the drag
  const dragDistance = startSliderXPress - endXPress;

  if (dragDistance > sensitivity) {
    nextSlidePress(); // Move to next slide
  } else if (dragDistance < -sensitivity) {
    prevSlidePress(); // Move to previous slide
  }
}

document.querySelector(".press-wrapper").addEventListener("touchstart", startDragPress);
document.querySelector(".press-wrapper").addEventListener("touchmove", dragPress);
document.querySelector(".press-wrapper").addEventListener("touchend", endDragPress);
//press Slider

//Exit intent popup
// Check if the exit intent popup has been shown in the last 5 hours
function canShowExitIntentPopup() {
  var lastClosedTime = localStorage.getItem("exitIntentLastClosedTime");
  if (!lastClosedTime) {
      return true; // Popup has not been closed before
  } else {
      var fiveHoursAgo = Date.now() - (5 * 60 * 60 * 1000); // Calculate the time 5 hours ago
      return parseInt(lastClosedTime) < fiveHoursAgo;
  }
}

document.addEventListener("mouseleave", function(event) {
  if (event.clientY < 0 && canShowExitIntentPopup()) {
      document.querySelector(".exit-intent-popup").style.display = "flex";
  }
});

document.querySelector(".exit-intent-popup, .exit-intent-popup .close").addEventListener("click", function(){
  document.querySelector(".exit-intent-popup").style.display = "none";
  
  // Save the current time when the popup is closed
  localStorage.setItem("exitIntentLastClosedTime", Date.now());
});
//Exit intent popup

//Third Section
var parentElement = document.querySelector('.third-section');
  var blockElement = document.querySelector('.third-section img');
  var detailElement = document.querySelector('.details-wrapper');

  window.addEventListener('scroll', function() {
    var parentRect = parentElement.getBoundingClientRect();
    const screenWidth = window.innerWidth;
    function getDeviceType() {
      if (screenWidth < 768) {
          blockElement.style.bottom = '55%';
      } else if (screenWidth >= 768 && screenWidth <= 1024) {
          blockElement.style.bottom = '15%';
      } else {
          blockElement.style.bottom = '28%';
      }
    }
    if (parentRect.top <= (screenWidth <= 1024 ? 600 : 300)) {
      blockElement.style.bottom = '8%';
      detailElement.style.opacity = '1';
    } else {
      getDeviceType();
      detailElement.style.opacity = '0';
    }
  });
//Third Section
    
});
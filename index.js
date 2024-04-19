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


//brands slider
const container = document.querySelector('.brand-wrapper');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

// Function to scroll the container to the left
function scrollLeft() {
  container.scrollBy({
    left: -container.offsetWidth, // Scroll by one container width
    behavior: 'smooth'
  });
}

// Function to scroll the container to the right
function scrollRight() {
  container.scrollBy({
    left: container.offsetWidth, // Scroll by one container width
    behavior: 'smooth'
  });
}

// Event listeners for navigation buttons
prevBtn.addEventListener('click', scrollLeft);
nextBtn.addEventListener('click', scrollRight);

// Automatic scrolling
const scrollInterval = 3000; // Interval in milliseconds
let scrollTimer;

function startAutoScroll() {
  scrollTimer = setInterval(scrollRight, scrollInterval);
}

function stopAutoScroll() {
  clearInterval(scrollTimer);
}

// Start auto-scrolling
startAutoScroll();

// Pause auto-scrolling when hovering over the container
container.addEventListener('mouseenter', stopAutoScroll);
container.addEventListener('mouseleave', startAutoScroll);
//brands slider

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
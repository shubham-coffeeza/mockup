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


  function checkInitialScrollPosition() {  // Function to check initial scroll position on page load
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
  var startXFloat, startY;
  var threshold = 50; 
  
  document.querySelector(".floating-link-btn").addEventListener("click", function(){
      if (!isOpen) {
          openFloatingLinkWindow();
      } else {
          closeFloatingLinkWindow();
      }
  });
  
  function openFloatingLinkWindow() {
      document.querySelector(".floating-link-window").style.transform = "translate(0, -50%)";
      document.querySelector(".floating-link-btn").style.transform = "translateY(-50%) rotate(180deg)";
      isOpen = true;
  }
  
  function closeFloatingLinkWindow() {
      document.querySelector(".floating-link-window").style.transform = "translate(240px, -50%)";
      document.querySelector(".floating-link-btn").style.transform = "translateY(-50%) rotate(0deg)";
      isOpen = false;
  }
  
  document.querySelector(".floating-link-btn").addEventListener("touchstart", function(e) {
      startXFloat = e.touches[0].clientX;
      startY = e.touches[0].clientY;
  });
  
  document.querySelector(".floating-link-btn").addEventListener("touchend", function(e) {
      var endX = e.changedTouches[0].clientX;
      var endY = e.changedTouches[0].clientY;
      
      var deltaX = endX - startXFloat;
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
//floating link End


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


//Best rated slider
  let currentSlide = 0;
  const slides = document.querySelectorAll(".testimonial.slide");
  const totalSlides = slides.length;
  const slideWidth = slides[0].clientWidth;
  let startX = 0;
  let endX = 0;

  //One dot for each slide
  slides.forEach((slide, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (index === 0) {
      dot.classList.add("active");
    }
    dot.addEventListener("click", () => {
      showSlide(index);
    });
    document.querySelector(".counter").appendChild(dot);
  });

  //Show slide by index
  function showSlide(index) {
    slides.forEach((slide, i) => {
      if (i === index) {
        document.querySelector(".counter").children[i].classList.add("active");
      } else {
        document.querySelector(".counter").children[i].classList.remove("active");
      }
    });
    moveSlide(index);
  }

  //use transform for slides
  function moveSlide(index) {
    const slideOffset = -index * slideWidth;
    document.querySelector(".slides").style.transform = `translateX(${slideOffset}px)`;
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
    setTimeout(nextSlide, 6000);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
  }

  document.querySelector(".best-rated-prev").addEventListener("click", prevSlide);
  document.querySelector(".best-rated-next").addEventListener("click", nextSlide);

  //Drag functionality for touch screens
  function startDrag(event) {
    startX = event.touches[0].clientX;
  }

  function drag(event) {
    endX = event.touches[0].clientX;
  }

  function endDrag() {
    const sensitivity = 50; // Adjust this value to control the sensitivity of the drag
    const dragDistance = startX - endX;

    if (dragDistance > sensitivity) {
      nextSlide(); // Move to next slide
    } else if (dragDistance < -sensitivity) {
      prevSlide(); // Move to previous slide
    }
  }

  document.querySelector(".slides").addEventListener("touchstart", startDrag);
  document.querySelector(".slides").addEventListener("touchmove", drag);
  document.querySelector(".slides").addEventListener("touchend", endDrag);
  
  setTimeout(nextSlide, 6000);

//Best rated slider

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
    

//Visibility in viewport
  function checkViewportVisibility() {
    const handleVisibility = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("viewport-active");
          // Once an element is intersecting, we can unobserve it
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleVisibility, {
      root: null, // Use the viewport as the root
      rootMargin: "0px", // No margin around the viewport
      threshold: 0.1 // Fire the callback when 10% of the target is visible
    });

    const elements = document.querySelectorAll(".in-viewport");

    elements.forEach((element) => {
      observer.observe(element);
    });
  }

checkViewportVisibility();
//Visibility in viewport

//Multi tab wrapper
  var divs = document.querySelectorAll(".collection-click");
  divs.forEach(function(div, index) {
    div.addEventListener("click", function() {
      var relatedDiv = document.getElementById("show-" + (index + 1));
      var allRelatedDivs = document.querySelectorAll('.collection-show');
      divs.forEach(function(d) {
        d.classList.remove('active');
      });

      div.classList.add('active');
      
      allRelatedDivs.forEach(function(element) {
        if (element === relatedDiv) {
          element.classList.remove("d-none");
          element.classList.add("d-block");
        } else {
          element.classList.remove("d-block");
          element.classList.add("d-none");
        }
      });
    });
  });
//Multi tab wrapper

//Overflow scroll
  const sliders = document.querySelectorAll(".scroll-slider-wrapper");
  var sliderWidth = isMobileDevice() ? 1 : 0.5;

  sliders.forEach(function(slider) {
      const scrollLeftBtn = slider.querySelector(".prev");
      const scrollRightBtn = slider.querySelector(".next");

      scrollLeftBtn.addEventListener("click", function() {
          const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
          const scrollAmount = -slider.offsetWidth * sliderWidth;
          const newScrollLeft = slider.scrollLeft + scrollAmount;
          console.log(maxScrollLeft, scrollAmount, newScrollLeft, slider.scrollLeft);
          if (newScrollLeft >= -200) {
              slider.scrollBy({
                  left: scrollAmount,
                  behavior: "smooth"
              });
          }
      });

      scrollRightBtn.addEventListener("click", function() {
          const maxScrollRight = slider.scrollWidth;
          const scrollAmount = slider.offsetWidth * sliderWidth;
          const newScrollRight = slider.scrollLeft + scrollAmount;
          console.log(maxScrollRight, scrollAmount, newScrollRight, slider.scrollLeft);  
          if (newScrollRight < maxScrollRight) {
              slider.scrollBy({
                  left: scrollAmount,
                  behavior: "smooth"
              });
          }
      });
  });
//Overflow scroll

//Navbar Hover
  var navs = document.querySelectorAll(".navbar-link");
  navs.forEach(function(nav, index) {
    var relatedDiv = document.getElementById("show-nav-" + (index + 1));
    var parentDiv = document.getElementById("navbar-wrapper-" + (index + 1));
    nav.addEventListener('mouseenter', function() {
        relatedDiv.classList.add('hovered');
        parentDiv.classList.add('hovered');
    });
    nav.addEventListener('mouseleave', function() {
        relatedDiv.classList.remove('hovered');
        parentDiv.classList.remove('hovered');
    });
  });

  var navWrappers = document.querySelectorAll(".navbar-dropdown-wrapper");
  navWrappers.forEach(function(navWrapper, index) {
    var relatedDiv = document.getElementById("show-nav-" + (index + 1));
    var parentDiv = document.getElementById("navbar-wrapper-" + (index + 1));
    navWrapper.addEventListener('mouseenter', function() {
        relatedDiv.classList.add('hovered');
        parentDiv.classList.add('hovered');
    });
    navWrapper.addEventListener('mouseleave', function() {
        relatedDiv.classList.remove('hovered');
        parentDiv.classList.remove('hovered');
    });
  });
//Navbar Hover

});
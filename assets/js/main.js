/**
 * Template Name: BizLand
 * Template URL: https://bootstrapmade.com/bizland-bootstrap-business-template/
 * Updated: Aug 07 2024 with Bootstrap v5.3.3
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");
    if (
      !selectHeader.classList.contains("scroll-up-sticky") &&
      !selectHeader.classList.contains("sticky-top") &&
      !selectHeader.classList.contains("fixed-top")
    )
      return;
    window.scrollY > 100
      ? selectBody.classList.add("scrolled")
      : selectBody.classList.remove("scrolled");
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }
  mobileNavToggleBtn.addEventListener("click", mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll(".skills-animation");
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: "80%",
      handler: function (direction) {
        let progress = item.querySelectorAll(".progress .progress-bar");
        progress.forEach((el) => {
          el.style.width = el.getAttribute("aria-valuenow") + "%";
        });
      },
    });
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll(".isotope-layout").forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute("data-layout") ?? "masonry";
    let filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
    let sort = isotopeItem.getAttribute("data-sort") ?? "original-order";

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector(".isotope-container"), function () {
      initIsotope = new Isotope(
        isotopeItem.querySelector(".isotope-container"),
        {
          itemSelector: ".isotope-item",
          layoutMode: layout,
          filter: filter,
          sortBy: sort,
        }
      );
    });

    isotopeItem
      .querySelectorAll(".isotope-filters li")
      .forEach(function (filters) {
        filters.addEventListener(
          "click",
          function () {
            isotopeItem
              .querySelector(".isotope-filters .filter-active")
              .classList.remove("filter-active");
            this.classList.add("filter-active");
            initIsotope.arrange({
              filter: this.getAttribute("data-filter"),
            });
            if (typeof aosInit === "function") {
              aosInit();
            }
          },
          false
        );
      });
  });

  /**
   * Frequently Asked Questions Toggle
   */
  document
    .querySelectorAll(".faq-item h3, .faq-item .faq-toggle")
    .forEach((faqItem) => {
      faqItem.addEventListener("click", () => {
        faqItem.parentNode.classList.toggle("faq-active");
      });
    });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener("load", function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: "smooth",
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll(".navmenu a");

  function navmenuScrollspy() {
    navmenulinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".navmenu a.active")
          .forEach((link) => link.classList.remove("active"));
        navmenulink.classList.add("active");
      } else {
        navmenulink.classList.remove("active");
      }
    });
  }
  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);
})();

// Replace the form submission section in your main.js with this improved version:

document.addEventListener("DOMContentLoaded", function () {
  // School License Order Summary Updater
  const studentInput = document.getElementById("student-qty");
  const teacherInput = document.getElementById("teacher-qty");
  const summary = document.getElementById("order-summary");
  const form = document.getElementById("school-license-form");
  const purchaseButton = document.getElementById("purchase-button");

  if (studentInput && teacherInput && summary) {
    function updateSummary() {
      const s = parseInt(studentInput.value, 10) || 0;
      const t = parseInt(teacherInput.value, 10) || 0;
      const total = s * 5 + t * 20;
      summary.innerHTML = `${s} Student License${s !== 1 ? "s" : ""} ($${
        s * 5
      }) + ${t} Teacher License${t !== 1 ? "s" : ""} ($${
        t * 20
      }) = <strong>$${total}</strong>`;
    }

    studentInput.addEventListener("input", updateSummary);
    teacherInput.addEventListener("input", updateSummary);
    updateSummary();

    // Handle form submission
    if (form && purchaseButton) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        purchaseButton.setAttribute("aria-busy", "true");
        purchaseButton.disabled = true;
        purchaseButton.textContent = "Processing...";

        try {
          const student_quantity = parseInt(studentInput.value, 10) || 0;
          const teacher_quantity = parseInt(teacherInput.value, 10) || 0;

          if (student_quantity === 0 && teacher_quantity === 0) {
            throw new Error("Please select at least one license");
          }

          console.log("Sending request with:", { student_quantity, teacher_quantity });

          const response = await fetch(
            "https://moneytalkspurchasing-g8g8gpd0gxebdhhv.centralus-01.azurewebsites.net/create-checkout-session",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
              },
              body: JSON.stringify({
                student_quantity,
                teacher_quantity,
              }),
            }
          );

          console.log("Response status:", response.status);
          console.log("Response headers:", response.headers);

          // Check if response is actually JSON
          const contentType = response.headers.get('content-type');
          if (!contentType || !contentType.includes('application/json')) {
            const textResponse = await response.text();
            console.error("Non-JSON response received:", textResponse);
            throw new Error(`Server returned ${response.status}: ${textResponse.substring(0, 100)}...`);
          }

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
              errorData.error || `Server error: ${response.status}`
            );
          }

          const data = await response.json();
          console.log("Success response:", data);
          
          if (!data.url) {
            throw new Error("No checkout URL received from server");
          }

          window.location.href = data.url;
        } catch (error) {
          console.error("Detailed error:", error);
          
          let errorMessage = "There was a problem processing your request. Please try again.";
          
          if (error.message.includes("fetch")) {
            errorMessage = "Unable to connect to the server. Please check your internet connection and try again.";
          } else if (error.message.includes("404")) {
            errorMessage = "The checkout service is currently unavailable. Please try again later.";
          } else if (error.message) {
            errorMessage = error.message;
          }

          alert(errorMessage);
        } finally {
          purchaseButton.setAttribute("aria-busy", "false");
          purchaseButton.disabled = false;
          purchaseButton.textContent = "Purchase Licenses";
        }
      });
    }
  }
});

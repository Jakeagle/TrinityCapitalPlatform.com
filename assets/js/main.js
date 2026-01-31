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
      // Check if there's a configuration script element
      let configElement = swiperElement.querySelector(".swiper-config");
      let config;

      if (configElement) {
        // Use configuration from script element if available
        config = JSON.parse(configElement.innerHTML.trim());
      } else {
        // Use default configuration for testimonials slider
        config = {
          loop: true,
          speed: 600,
          autoplay: {
            delay: 5000,
          },
          slidesPerView: "auto",
          pagination: {
            el: ".swiper-pagination",
            type: "bullets",
            clickable: true,
          },
        };
      }

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  /**
   * Init swiper with custom pagination (fallback function)
   */
  function initSwiperWithCustomPagination(swiperElement, config) {
    // For now, just use the regular Swiper initialization
    new Swiper(swiperElement, config);
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
        },
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
          false,
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

document.addEventListener("DOMContentLoaded", function () {
  // Individual License Price Calculator
  const studentInput = document.getElementById("student-qty");
  const teacherInput = document.getElementById("teacher-qty");
  const totalPriceSpan = document.getElementById("total-price");
  const studentHidden = document.getElementById("student-qty-hidden");
  const teacherHidden = document.getElementById("teacher-qty-hidden");
  const form = document.getElementById("school-license-form");
  const purchaseButton = document.getElementById("purchase-button");

  if (studentInput && teacherInput && totalPriceSpan) {
    function updatePrice() {
      const s = parseInt(studentInput.value, 10) || 0;
      const t = parseInt(teacherInput.value, 10) || 0;
      const total = s * 15 + t * 60;

      totalPriceSpan.textContent = `$${total}`;

      // Update hidden form fields
      if (studentHidden) studentHidden.value = s;
      if (teacherHidden) teacherHidden.value = t;

      // Update button text
      if (purchaseButton) {
        if (total === 0) {
          purchaseButton.innerHTML =
            '<i class="bi bi-credit-card"></i> Select Quantities';
          purchaseButton.disabled = true;
        } else {
          purchaseButton.innerHTML = `<i class="bi bi-credit-card"></i> Buy Now - $${total}`;
          purchaseButton.disabled = false;
        }
      }
    }

    studentInput.addEventListener("input", updatePrice);
    teacherInput.addEventListener("input", updatePrice);
    updatePrice(); // Initial calculation

    // Handle form submission
    if (form && purchaseButton) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        purchaseButton.setAttribute("aria-busy", "true");
        purchaseButton.disabled = true;

        try {
          const student_quantity = parseInt(studentInput.value, 10) || 0;
          const teacher_quantity = parseInt(teacherInput.value, 10) || 0;

          if (student_quantity === 0 && teacher_quantity === 0) {
            throw new Error("Please select at least one license");
          }

          const response = await fetch(
            "http://localhost:3001/create-checkout-session",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                student_quantity,
                teacher_quantity,
              }),
            },
          );

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
              errorData.error || "Failed to create checkout session",
            );
          }

          const { url } = await response.json();
          window.location.href = url;
        } catch (error) {
          console.error("Error:", error);
          alert(
            error.message ||
              "There was a problem processing your request. Please try again.",
          );
        } finally {
          purchaseButton.setAttribute("aria-busy", "false");
          purchaseButton.disabled = false;
        }
      });
    }
  }

  // Privacy Policy and Terms of Service button handlers
  const privacyBtn = document.getElementById("privacy-btn");
  const termsBtn = document.getElementById("terms-btn");
  if (privacyBtn) {
    privacyBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.open("privacy-policy.html", "_blank");
    });
  }
  if (termsBtn) {
    termsBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.open("terms-of-service.html", "_blank");
    });
  }

  // Request a Quote button handler
  const requestQuoteBtn = document.getElementById("request-quote-btn");
  const quoteDialog = document.getElementById("quotes-dialog");
  const closeQuoteDialogBtn = document.getElementById("close-quote-dialog-btn");

  if (requestQuoteBtn && quoteDialog) {
    requestQuoteBtn.addEventListener("click", (e) => {
      e.preventDefault();

      // Populate quote details from the main form
      const studentQty =
        parseInt(document.getElementById("student-qty").value, 10) || 0;
      const teacherQty =
        parseInt(document.getElementById("teacher-qty").value, 10) || 0;
      const studentTotal = studentQty * 15;
      const teacherTotal = teacherQty * 60;
      const grandTotal = studentTotal + teacherTotal;

      document.getElementById("quote-student-qty").textContent = studentQty;
      document.getElementById("quote-student-total").textContent =
        `$${studentTotal}`;

      document.getElementById("quote-teacher-qty").textContent = teacherQty;
      document.getElementById("quote-teacher-total").textContent =
        `$${teacherTotal}`;

      document.getElementById("quote-grand-total").textContent =
        `$${grandTotal}`;

      quoteDialog.showModal();
    });
  }

  // Bulk Quote button handler
  const bulkQuoteBtn = document.getElementById("bulk-quote-button");
  if (bulkQuoteBtn && quoteDialog) {
    bulkQuoteBtn.addEventListener("click", (e) => {
      e.preventDefault();

      // Set bulk pricing values (unlimited licenses for $20,000)
      document.getElementById("quote-student-qty").textContent = "∞";
      document.getElementById("quote-teacher-qty").textContent = "∞";
      document.getElementById("quote-student-total").textContent = "Included";
      document.getElementById("quote-teacher-total").textContent = "Included";
      document.getElementById("quote-grand-total").textContent = "$20,000";

      // Update the dialog header for bulk pricing
      const quoteHeader = quoteDialog.querySelector(".dialog-header h2");
      if (quoteHeader) {
        quoteHeader.textContent = "Request School-Wide License Quote";
      }

      // Add bulk pricing note if it doesn't exist
      const quoteDetails = quoteDialog.querySelector(".quote-details");
      let bulkNote = quoteDetails.querySelector(".bulk-note");
      if (!bulkNote && quoteDetails) {
        bulkNote = document.createElement("div");
        bulkNote.className = "bulk-note";
        bulkNote.style.cssText =
          "background: #e3f2fd; padding: 15px; border-radius: 8px; margin-top: 15px; border-left: 4px solid #007bff;";
        bulkNote.innerHTML =
          "<strong>School-Wide License:</strong><br>Unlimited students and teachers for one school. Includes priority support, training, and custom implementation.";
        quoteDetails.appendChild(bulkNote);
      }

      quoteDialog.showModal();

      // Store that this is a bulk quote for later reference
      window.currentQuoteType = "bulk";
    });
  }

  // Individual Quote button handler
  const individualQuoteBtn = document.getElementById("individual-quote-button");
  if (individualQuoteBtn && quoteDialog) {
    individualQuoteBtn.addEventListener("click", (e) => {
      e.preventDefault();

      // Populate quote details from the individual license inputs
      const studentQty =
        parseInt(document.getElementById("student-qty").value, 10) || 0;
      const teacherQty =
        parseInt(document.getElementById("teacher-qty").value, 10) || 0;
      const studentTotal = studentQty * 15;
      const teacherTotal = teacherQty * 60;
      const grandTotal = studentTotal + teacherTotal;

      document.getElementById("quote-student-qty").textContent = studentQty;
      document.getElementById("quote-student-total").textContent =
        `$${studentTotal}`;

      document.getElementById("quote-teacher-qty").textContent = teacherQty;
      document.getElementById("quote-teacher-total").textContent =
        `$${teacherTotal}`;

      document.getElementById("quote-grand-total").textContent =
        `$${grandTotal}`;

      // Remove any bulk note if it exists
      const existingBulkNote = quoteDialog.querySelector(".bulk-note");
      if (existingBulkNote) {
        existingBulkNote.remove();
      }

      quoteDialog.showModal();

      // Store that this is an individual quote for later reference
      window.currentQuoteType = "individual";
    });
  }

  // Free Trial button handler
  const freeTrialBtn = document.getElementById("free-trial-button");
  const freeTrialDialog = document.getElementById("free-trial-dialog");
  const closeFreeTrialBtn = document.getElementById("close-trial-dialog-btn");
  const cancelTrialBtn = document.getElementById("cancel-trial-btn");
  const startTrialBtn = document.getElementById("start-trial-btn");

  if (freeTrialBtn && freeTrialDialog) {
    freeTrialBtn.addEventListener("click", (e) => {
      e.preventDefault();
      freeTrialDialog.showModal();
    });
  }

  // Close free trial dialog handlers
  if (closeFreeTrialBtn && freeTrialDialog) {
    closeFreeTrialBtn.addEventListener("click", () => {
      freeTrialDialog.close();
    });
  }

  if (cancelTrialBtn && freeTrialDialog) {
    cancelTrialBtn.addEventListener("click", () => {
      freeTrialDialog.close();
    });
  }

  // Close dialog on backdrop click
  if (freeTrialDialog) {
    freeTrialDialog.addEventListener("click", (e) => {
      if (e.target === freeTrialDialog) {
        freeTrialDialog.close();
      }
    });
  }

  // Start trial button handler
  if (startTrialBtn) {
    startTrialBtn.addEventListener("click", async () => {
      const form = document.getElementById("free-trial-form");

      // Validate form
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // Get form data
      const formData = {
        admin_name: document.getElementById("trial-admin-name").value,
        admin_email: document.getElementById("trial-admin-email").value,
        school_name: document.getElementById("trial-school-name").value,
        district_name: document.getElementById("trial-district-name").value,
        teacher_quantity: parseInt(
          document.getElementById("trial-teacher-qty").value,
        ),
        student_quantity: parseInt(
          document.getElementById("trial-student-qty").value,
        ),
      };

      // Show loading state
      const originalText = startTrialBtn.innerHTML;
      startTrialBtn.innerHTML =
        '<i class="bi bi-hourglass-split"></i> Creating Trial...';
      startTrialBtn.disabled = true;

      try {
        const response = await fetch(
          `${window.API_BASE_URL}/create-free-trial`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          },
        );

        const result = await response.json();

        if (response.ok && result.success) {
          // Success! Close dialog and redirect
          freeTrialDialog.close();

          // Show success message
          alert(
            `🎉 Free trial activated successfully!\n\nYou will receive a confirmation email shortly with instructions on how to distribute teacher access codes.\n\nRedirecting to your admin dashboard...`,
          );

          // Redirect to license distribution with trial flag
          window.location.href = result.redirect_url;
        } else {
          throw new Error(result.error || "Failed to create free trial");
        }
      } catch (error) {
        console.error("Error creating free trial:", error);
        alert(
          `Error creating free trial: ${error.message}\n\nPlease try again or contact support if the problem persists.`,
        );
      } finally {
        // Reset button state
        startTrialBtn.innerHTML = originalText;
        startTrialBtn.disabled = false;
      }
    });
  }

  // Function to reset quote dialog to normal state
  function resetQuoteDialog() {
    window.currentQuoteType = null;
    const quoteHeader = quoteDialog?.querySelector(".dialog-header h2");
    if (quoteHeader) {
      quoteHeader.textContent = "Request a Quote";
    }
    const bulkNote = quoteDialog?.querySelector(".bulk-note");
    if (bulkNote) {
      bulkNote.remove();
    }
  }

  if (closeQuoteDialogBtn && quoteDialog) {
    closeQuoteDialogBtn.addEventListener("click", () => {
      resetQuoteDialog();
      quoteDialog.close();
    });
  }

  // Close dialog on backdrop click
  if (quoteDialog) {
    quoteDialog.addEventListener("click", (e) => {
      if (e.target === quoteDialog) {
        resetQuoteDialog();
        quoteDialog.close();
      }
    });
  }

  // PDF Creation Handler
  const downloadPdfBtn = document.getElementById("download-quote-pdf-btn");
  const emailQuoteBtn = document.getElementById("email-quote-btn"); // New button

  async function handlePdfCreation() {
    // 1. Validate form before proceeding
    const form = document.getElementById("quote-info-form");
    if (!form.checkValidity()) {
      alert(
        "Please fill out all required school information fields before downloading the PDF.",
      );
      form.reportValidity(); // Shows browser's validation UI on the invalid fields
      return;
    }

    // 2. Check for jsPDF and autoTable plugin
    if (
      typeof window.jspdf === "undefined" ||
      typeof window.jspdf.jsPDF === "undefined"
    ) {
      console.error(
        "The base jsPDF library is not loaded. Check the script tags in index.html.",
      );
      alert(
        "Error: The base PDF library (jsPDF) is not loaded. Please check your internet connection and try a hard refresh (Ctrl+F5).",
      );
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // With modern jsPDF and autoTable, the plugin attaches to the instance, not the prototype.
    // So, we check for the function on the created `doc` instance.
    if (typeof doc.autoTable !== "function") {
      console.error(
        "The jsPDF-AutoTable plugin is not loaded. Check the script tags in index.html.",
      );
      alert(
        "Error: The PDF table plugin (jsPDF-AutoTable) is not loaded. Please check your internet connection and try a hard refresh (Ctrl+F5).",
      );
      return;
    }

    // 3. Gather data from the dialog
    const adminName = document.getElementById("admin-name").value;
    const districtName = document.getElementById("district-name").value;
    const schoolName = document.getElementById("school-name").value;
    const schoolAddress = document.getElementById("school-address").value;

    const studentQty = document.getElementById("quote-student-qty").textContent;
    const studentTotal = document.getElementById(
      "quote-student-total",
    ).textContent;
    const teacherQty = document.getElementById("quote-teacher-qty").textContent;
    const teacherTotal = document.getElementById(
      "quote-teacher-total",
    ).textContent;
    const grandTotal = document.getElementById("quote-grand-total").textContent;

    // 4. Helper to load image and convert to Base64
    const getBase64Image = (url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          const dataURL = canvas.toDataURL("image/png");
          resolve({
            dataURL: dataURL,
            width: img.width,
            height: img.height,
          });
        };
        img.onerror = (err) =>
          reject(new Error("Failed to load image for PDF."));
        img.src = url;
      });
    };

    try {
      // --- PDF Header ---
      const logoUrl = "assets/img/FSSLogoPDF.png";
      const logoInfo = await getBase64Image(logoUrl);
      const logoWidth = 50;
      const logoHeight = (logoInfo.height * logoWidth) / logoInfo.width;
      doc.addImage(logoInfo.dataURL, "PNG", 15, 12, logoWidth, logoHeight);

      doc.setFontSize(26);
      doc.setFont("helvetica", "bold");
      doc.text("Quote", 148, 25);

      const today = new Date();
      const quoteDate = today.toLocaleDateString();
      const quoteId = `QUOTE-${today.toISOString().slice(0, 10).replace(/-/g, "")}`;

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`Date: ${quoteDate}`, 148, 32);
      doc.text(`Quote ID: ${quoteId}`, 148, 37);
      doc.text(`Quote for: ${adminName}`, 15, 40);

      // --- School Info ---
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("School Information", 15, 55);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(
        `District: ${districtName}\nSchool: ${schoolName}\nAddress: ${schoolAddress}`,
        15,
        62,
      );

      // --- Company Info ---
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Vendor Information", 135, 55); // Aligned with "Quote" header
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("FERGUSON SOFTWARE SOLUTIONS, LLC", 135, 62);
      doc.text("Email: jakobferguson@trinity-capital.net", 135, 67);
      doc.text("Phone: (682) 239-1209", 135, 72);
      doc.text("Tax ID: 99-1043982", 135, 77);
      // --- Line Items Table ---
      // Build table based on quote type
      let tableBody = [];
      let tableHeaders = [
        ["Item Description", "Quantity", "Unit Price", "Total"],
      ];

      if (window.currentQuoteType === "college" && window.currentCollegePlan) {
        const plan = window.currentCollegePlan;

        if (
          plan.planType === "college-section" ||
          plan.planType === "college-annual" ||
          plan.planType === "college-multi-section"
        ) {
          // Individual Professor Pricing - show license count per package
          tableHeaders = [["Package Description", "Capacity", "Price"]];
          tableBody = [
            [plan.planName, `${plan.studentQty} students`, plan.priceNote],
          ];
        } else if (
          plan.planType === "college-department" ||
          plan.planType === "college-large-department"
        ) {
          // Department Wide - show license type and total price (no per-section breakdown)
          const sectionsMin =
            plan.planType === "college-department" ? "5-10" : "10-20";
          tableHeaders = [["License Type", "Coverage", "Price"]];
          tableBody = [
            [plan.planName, `${sectionsMin} sections/semester`, plan.priceNote],
          ];
        } else if (plan.planType === "college-campus") {
          // Campus Wide - show unlimited with total
          tableHeaders = [["License Type", "Coverage", "Price"]];
          tableBody = [
            [plan.planName, "Unlimited sections & faculty", plan.priceNote],
          ];
        } else if (plan.planType === "college-enterprise") {
          // Multi-Campus - custom pricing
          tableHeaders = [["License Type", "Coverage", "Price"]];
          tableBody = [
            [plan.planName, "System-wide deployment", plan.priceNote],
          ];
        }
      } else {
        // K12 Pricing - show individual student and teacher licenses
        tableBody = [
          ["Student License", studentQty, "$15.00", studentTotal],
          ["Teacher License", teacherQty, "$60.00", teacherTotal],
        ];
      }

      doc.autoTable({
        startY: 85,
        head: tableHeaders,
        body: tableBody,
        theme: "striped",
        headStyles: { fillColor: [44, 62, 80] },
      });

      // --- Totals ---
      const finalY = doc.lastAutoTable.finalY;
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Total:", 148, finalY + 15);
      doc.text(grandTotal, 175, finalY + 15);

      // --- Notes / Terms ---
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(
        `• This quote is valid for 30 days from the issue date.\n` +
          `• Licenses are valid for 12 months from activation.\n` +
          `• Payment accepted via Purchase Order, ACH, or Check.\n` +
          `• For assistance, please contact jakobferguson@trinity-capital.net.`,
        15,
        finalY + 30,
      );

      // --- Save PDF ---
      doc.save(
        `Quote-${schoolName.replace(/\s/g, "_")}-${today.toISOString().slice(0, 10)}.pdf`,
      );
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert(
        "Could not generate the PDF. This may be due to a network issue or browser restrictions. Please try again.",
      );
    }
  }

  if (downloadPdfBtn) {
    downloadPdfBtn.addEventListener("click", handlePdfCreation);
  }

  // Email Quote Handler
  async function handleEmailQuote() {
    // Get the email button for UI updates
    const emailButton = document.getElementById("email-quote-btn");
    const originalButtonText = emailButton
      ? emailButton.textContent
      : "Email Quote";

    // Show spinner and disable button
    if (emailButton) {
      emailButton.innerHTML = '<span class="spinner"></span> Please wait...';
      emailButton.disabled = true;
      emailButton.style.opacity = "0.7";
    }

    // Validate form before proceeding
    const form = document.getElementById("quote-info-form");
    if (!form.checkValidity()) {
      // Reset button on validation failure
      if (emailButton) {
        emailButton.innerHTML = originalButtonText;
        emailButton.disabled = false;
        emailButton.style.opacity = "1";
      }
      alert(
        "Please fill out all required school information fields before emailing the quote.",
      );
      form.reportValidity();
      return;
    }

    // Check for jsPDF and autoTable plugin
    if (
      typeof window.jspdf === "undefined" ||
      typeof window.jspdf.jsPDF === "undefined"
    ) {
      alert(
        "Error: The base PDF library (jsPDF) is not loaded. Please check your internet connection and try a hard refresh (Ctrl+F5).",
      );
      return;
    }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    if (typeof doc.autoTable !== "function") {
      alert(
        "Error: The PDF table plugin (jsPDF-AutoTable) is not loaded. Please check your internet connection and try a hard refresh (Ctrl+F5).",
      );
      return;
    }

    // Gather data from the dialog
    const adminName = document.getElementById("admin-name").value;
    const districtName = document.getElementById("district-name").value;
    const schoolName = document.getElementById("school-name").value;
    const schoolAddress = document.getElementById("school-address").value;
    // Use admin email as recipient
    const adminEmailInput = document.getElementById("admin-email");
    if (!adminEmailInput) {
      alert(
        "Error: The administrator email field is missing from the form. Please add an input with id='admin-email'.",
      );
      return;
    }
    const recipientEmail = adminEmailInput.value;

    const studentQty = document.getElementById("quote-student-qty").textContent;
    const studentTotal = document.getElementById(
      "quote-student-total",
    ).textContent;
    const teacherQty = document.getElementById("quote-teacher-qty").textContent;
    const teacherTotal = document.getElementById(
      "quote-teacher-total",
    ).textContent;
    const grandTotal = document.getElementById("quote-grand-total").textContent;

    // Helper to load image and convert to Base64
    const getBase64Image = (url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          const dataURL = canvas.toDataURL("image/png");
          resolve({
            dataURL: dataURL,
            width: img.width,
            height: img.height,
          });
        };
        img.onerror = (err) =>
          reject(new Error("Failed to load image for PDF."));
        img.src = url;
      });
    };

    try {
      // --- PDF Header ---
      const logoUrl = "assets/img/FSSLogoPDF.png";
      const logoInfo = await getBase64Image(logoUrl);
      const logoWidth = 50;
      const logoHeight = (logoInfo.height * logoWidth) / logoInfo.width;
      doc.addImage(logoInfo.dataURL, "PNG", 15, 12, logoWidth, logoHeight);

      doc.setFontSize(26);
      doc.setFont("helvetica", "bold");
      doc.text("Quote", 148, 25);

      const today = new Date();
      const quoteDate = today.toLocaleDateString();
      const quoteId = `QUOTE-${today.toISOString().slice(0, 10).replace(/-/g, "")}`;

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`Date: ${quoteDate}`, 148, 32);
      doc.text(`Quote ID: ${quoteId}`, 148, 37);
      doc.text(`Quote for: ${adminName}`, 15, 40);

      // --- School Info ---
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("School Information", 15, 55);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(
        `District: ${districtName}\nSchool: ${schoolName}\nAddress: ${schoolAddress}`,
        15,
        62,
      );

      // --- Company Info ---
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Vendor Information", 135, 55);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("FERGUSON SOFTWARE SOLUTIONS, LLC", 135, 62);
      doc.text("Email: jakobferguson@trinity-capital.net", 135, 67);
      doc.text("Phone: (682) 239-1209", 135, 72);
      doc.text("Tax ID: 99-1043982", 135, 77);
      // --- Line Items Table ---
      // Build table based on quote type (same logic as download)
      let emailTableBody = [];
      let emailTableHeaders = [
        ["Item Description", "Quantity", "Unit Price", "Total"],
      ];

      if (window.currentQuoteType === "college" && window.currentCollegePlan) {
        const plan = window.currentCollegePlan;

        if (
          plan.planType === "college-section" ||
          plan.planType === "college-annual" ||
          plan.planType === "college-multi-section"
        ) {
          // Individual Professor Pricing - show license count per package
          emailTableHeaders = [["Package Description", "Capacity", "Price"]];
          emailTableBody = [
            [plan.planName, `${plan.studentQty} students`, plan.priceNote],
          ];
        } else if (
          plan.planType === "college-department" ||
          plan.planType === "college-large-department"
        ) {
          // Department Wide - show license type and total price (no per-section breakdown)
          const sectionsMin =
            plan.planType === "college-department" ? "5-10" : "10-20";
          emailTableHeaders = [["License Type", "Coverage", "Price"]];
          emailTableBody = [
            [plan.planName, `${sectionsMin} sections/semester`, plan.priceNote],
          ];
        } else if (plan.planType === "college-campus") {
          // Campus Wide - show unlimited with total
          emailTableHeaders = [["License Type", "Coverage", "Price"]];
          emailTableBody = [
            [plan.planName, "Unlimited sections & faculty", plan.priceNote],
          ];
        } else if (plan.planType === "college-enterprise") {
          // Multi-Campus - custom pricing
          emailTableHeaders = [["License Type", "Coverage", "Price"]];
          emailTableBody = [
            [plan.planName, "System-wide deployment", plan.priceNote],
          ];
        }
      } else {
        // K12 Pricing - show individual student and teacher licenses
        emailTableBody = [
          ["Student License", studentQty, "$15.00", studentTotal],
          ["Teacher License", teacherQty, "$60.00", teacherTotal],
        ];
      }

      doc.autoTable({
        startY: 85,
        head: emailTableHeaders,
        body: emailTableBody,
        theme: "striped",
        headStyles: { fillColor: [44, 62, 80] },
      });

      // --- Totals ---
      const finalY = doc.lastAutoTable.finalY;
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Total:", 148, finalY + 15);
      doc.text(grandTotal, 175, finalY + 15);

      // --- Notes / Terms ---
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(
        `• This quote is valid for 30 days from the issue date.\n` +
          `• Licenses are valid for 12 months from activation.\n` +
          `• Payment accepted via Purchase Order, ACH, or Check.\n` +
          `• For assistance, please contact jakobferguson@trinity-capital.net.`,
        15,
        finalY + 30,
      );

      // --- Get PDF as base64 string ---
      const pdfBlob = doc.output("blob");
      const filename = `Quote-${schoolName.replace(/\s/g, "_")}-${today.toISOString().slice(0, 10)}.pdf`;
      // Convert Blob to base64 string
      const pdfBase64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          // Remove the data:application/pdf;base64, prefix
          const base64 = reader.result.split(",")[1];
          resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(pdfBlob);
      });
      // Prepare JSON payload
      const payload = {
        pdfBase64,
        pdfFilename: filename,
        recipientEmail,
        adminName,
        districtName,
        schoolName,
        schoolAddress,
        studentQty,
        teacherQty,
        studentTotal,
        teacherTotal,
        grandTotal,
        quoteId,
        quoteDate,
      };
      // Send to server as JSON
      const response = await fetch("http://localhost:3001/send-quote-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        let errorMessage = "Failed to send quote email";
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          // Not JSON, fallback to status text
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      // Show success message
      if (emailButton) {
        emailButton.innerHTML = "✓ Successful";
        emailButton.style.backgroundColor = "#28a745";
        emailButton.style.color = "white";

        // Reset button after 3 seconds
        setTimeout(() => {
          emailButton.innerHTML = originalButtonText;
          emailButton.disabled = false;
          emailButton.style.opacity = "1";
          emailButton.style.backgroundColor = "";
          emailButton.style.color = "";
        }, 3000);
      }

      alert("Quote PDF emailed successfully!");
    } catch (error) {
      console.error("Error emailing PDF:", error);

      // Reset button on error
      if (emailButton) {
        emailButton.innerHTML = originalButtonText;
        emailButton.disabled = false;
        emailButton.style.opacity = "1";
      }

      alert(
        error.message ||
          "Could not email the PDF. This may be due to a network issue or browser restrictions. Please try again.",
      );
    } finally {
      const loadingBar = document.getElementById("email-loading-bar");
      if (loadingBar) loadingBar.style.display = "none";
    }
  }

  if (emailQuoteBtn) {
    emailQuoteBtn.addEventListener("click", handleEmailQuote);
  }

  // College Pricing Quote Handlers
  // Map all college pricing buttons to their plan details
  const collegeQuoteButtons = {
    // Individual Professor Pricing
    "section-license-quote": {
      planName: "Section License",
      description: "1 teacher license + up to 50 students",
      studentQty: 50,
      teacherQty: 1,
      basePrice: 500,
      priceNote: "$500/section/semester",
      planType: "college-section",
    },
    "annual-license-quote": {
      planName: "Annual License",
      description: "Fall & Spring semesters, up to 50 students/semester",
      studentQty: 100,
      teacherQty: 1,
      basePrice: 850,
      priceNote: "$850/section/year",
      planType: "college-annual",
    },
    "multiple-sections-quote": {
      planName: "Multiple Sections",
      description: "Volume discount pricing",
      studentQty: 150,
      teacherQty: 1,
      basePrice: null,
      priceNote: "Volume pricing available",
      planType: "college-multi-section",
    },
    // Department-Wide Pricing
    "department-license-quote": {
      planName: "Department License",
      description: "5-10 sections per semester, all faculty",
      studentQty: 300,
      teacherQty: 8,
      basePrice: 6500,
      priceNote: "$6,500/year",
      planType: "college-department",
    },
    "large-department-quote": {
      planName: "Large Department",
      description: "10-20 sections per semester, priority support",
      studentQty: 500,
      teacherQty: 15,
      basePrice: 12000,
      priceNote: "$12,000/year",
      planType: "college-large-department",
    },
    // Campus-Wide Pricing
    "small-campus-quote": {
      planName: "Small Campus",
      description: "Unlimited sections & faculty, 10-15 sections/year",
      studentQty: 750,
      teacherQty: 20,
      basePrice: 5500,
      priceNote: "$5,500/year",
      planType: "college-campus",
    },
    "medium-campus-quote": {
      planName: "Medium Campus",
      description: "Unlimited sections & faculty, 15-25 sections/year",
      studentQty: 1000,
      teacherQty: 30,
      basePrice: 8000,
      priceNote: "$8,000/year",
      planType: "college-campus",
    },
    "large-campus-quote": {
      planName: "Large Campus",
      description: "Unlimited sections & faculty, 25-40 sections/year",
      studentQty: 1500,
      teacherQty: 45,
      basePrice: 11000,
      priceNote: "$11,000+/year",
      planType: "college-campus",
    },
    "multi-campus-quote": {
      planName: "Multi-Campus System",
      description: "System-wide deployment, 40+ sections",
      studentQty: "Custom",
      teacherQty: "Custom",
      basePrice: null,
      priceNote: "Custom pricing",
      planType: "college-enterprise",
    },
  };

  // Add click handlers to all college pricing buttons
  Object.keys(collegeQuoteButtons).forEach((buttonId) => {
    const button = document.getElementById(buttonId);
    if (button) {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        const planDetails = collegeQuoteButtons[buttonId];

        // Show the quote dialog
        if (quoteDialog) {
          // Update the dialog header to indicate this is a college plan
          const quoteHeader = quoteDialog.querySelector(".dialog-header h2");
          if (quoteHeader) {
            quoteHeader.textContent = `Quote Request - ${planDetails.planName}`;
          }

          // For college plans, we use fixed amounts or custom
          if (planDetails.basePrice) {
            document.getElementById("quote-student-qty").textContent =
              typeof planDetails.studentQty === "number"
                ? planDetails.studentQty
                : planDetails.studentQty;
            document.getElementById("quote-teacher-qty").textContent =
              typeof planDetails.teacherQty === "number"
                ? planDetails.teacherQty
                : planDetails.teacherQty;

            // For college plans with fixed pricing, show the plan price
            document.getElementById("quote-student-total").textContent =
              `Plan Price`;
            document.getElementById("quote-teacher-total").textContent =
              `Included`;
            document.getElementById("quote-grand-total").textContent =
              `${planDetails.priceNote}`;
          } else {
            // For custom pricing
            document.getElementById("quote-student-qty").textContent =
              planDetails.studentQty;
            document.getElementById("quote-teacher-qty").textContent =
              planDetails.teacherQty;
            document.getElementById("quote-student-total").textContent =
              `Contact for pricing`;
            document.getElementById("quote-teacher-total").textContent = ``;
            document.getElementById("quote-grand-total").textContent =
              planDetails.priceNote;
          }

          // Add or update college plan note
          const quoteDetails = quoteDialog.querySelector(".quote-details");
          let collegePlanNote =
            quoteDetails.querySelector(".college-plan-note");

          if (!collegePlanNote) {
            collegePlanNote = document.createElement("div");
            collegePlanNote.className = "college-plan-note";
            const existingBulkNote = quoteDetails.querySelector(".bulk-note");
            if (existingBulkNote) {
              existingBulkNote.remove();
            }
            quoteDetails.insertBefore(
              collegePlanNote,
              quoteDetails.querySelector("hr"),
            );
          }

          collegePlanNote.innerHTML = `
            <div style="background-color: #e7f3ff; padding: 10px; margin-bottom: 10px; border-radius: 5px; border-left: 4px solid #17a2b8;">
              <small><strong style="color: #004085;">${planDetails.planName}</strong><br>
              ${planDetails.description}</small>
            </div>
          `;

          // Store college plan info for later reference
          window.currentQuoteType = "college";
          window.currentCollegePlan = planDetails;

          quoteDialog.showModal();
        }
      });
    }
  });

  // API Configuration
  window.API_BASE_URL = "http://localhost:3001"; // Force local for testing
  // window.API_BASE_URL = window.location.hostname === 'localhost'
  //   ? 'http://localhost:3001'
  //   : 'https://tcpurchasingserver-production.up.railway.app';

  // HTTPS Security and Mixed Content Detection
  function initSecurityChecks() {
    // Check for mixed content issues
    if (location.protocol !== "https:" && location.hostname !== "localhost") {
      console.warn("⚠️ Site is not served over HTTPS");
    } else {
      console.log("✅ Site is served over HTTPS");
    }

    // Log any network errors
    window.addEventListener("securitypolicyviolation", function (e) {
      console.error("🚫 CSP Violation:", e.violatedDirective, e.blockedURI);
    });

    // Check for insecure requests and auto-upgrade them
    const originalFetch = window.fetch;
    window.fetch = function (url, options) {
      if (
        typeof url === "string" &&
        url.startsWith("http://") &&
        location.protocol === "https:"
      ) {
        console.warn("🔧 Auto-upgrading HTTP request to HTTPS:", url);
        url = url.replace("http://", "https://");
      }
      return originalFetch.apply(this, arguments);
    };

    // Also patch XMLHttpRequest
    const originalOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (
      method,
      url,
      async,
      user,
      password,
    ) {
      if (
        typeof url === "string" &&
        url.startsWith("http://") &&
        location.protocol === "https:"
      ) {
        console.warn("🔧 Auto-upgrading XMLHttpRequest to HTTPS:", url);
        url = url.replace("http://", "https://");
      }
      return originalOpen.call(this, method, url, async, user, password);
    };

    // Check for mixed content in images, scripts, etc.
    window.addEventListener("load", function () {
      const allElements = document.querySelectorAll("*");
      allElements.forEach((el) => {
        ["src", "href", "action"].forEach((attr) => {
          const value = el.getAttribute(attr);
          if (
            value &&
            value.startsWith("http://") &&
            location.protocol === "https:"
          ) {
            console.warn("🔧 Found HTTP resource, auto-upgrading:", value);
            el.setAttribute(attr, value.replace("http://", "https://"));
          }
        });
      });
    });

    // Report successful HTTPS
    console.log("🔒 HTTPS Security Check Complete");
  }

  // Initialize security checks
  initSecurityChecks();

  // Stripe Integration (dynamic loading)
  window.loadStripe = function () {
    return new Promise((resolve) => {
      if (window.Stripe) {
        resolve(window.Stripe);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://js.stripe.com/v3/";
      script.onload = () => resolve(window.Stripe);
      document.head.appendChild(script);
    });
  };

  // Make Stripe loader globally available
  window.initStripe = window.loadStripe;

  // jsPDF compatibility shim
  if (
    typeof window.jspdf !== "undefined" &&
    typeof window.jsPDF === "undefined"
  ) {
    window.jsPDF = window.jspdf.jsPDF;
  }
});

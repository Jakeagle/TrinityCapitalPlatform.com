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
      summary.innerHTML = `${s} Student License${s !== 1 ? "s" : ""} (${
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

        try {
          const student_quantity = parseInt(studentInput.value, 10) || 0;
          const teacher_quantity = parseInt(teacherInput.value, 10) || 0;

          if (student_quantity === 0 && teacher_quantity === 0) {
            throw new Error("Please select at least one license");
          }

          const response = await fetch(
            "https://tcpurchasingserver-production.up.railway.app/create-checkout-session",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                student_quantity,
                teacher_quantity,
              }),
            }
          );

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
              errorData.error || "Failed to create checkout session"
            );
          }

          const { url } = await response.json();
          window.location.href = url;
        } catch (error) {
          console.error("Error:", error);
          alert(
            error.message ||
              "There was a problem processing your request. Please try again."
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
      const studentTotal = studentQty * 5;
      const teacherTotal = teacherQty * 20;
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

  if (closeQuoteDialogBtn && quoteDialog) {
    closeQuoteDialogBtn.addEventListener("click", () => {
      quoteDialog.close();
    });
  }

  // Close dialog on backdrop click
  if (quoteDialog) {
    quoteDialog.addEventListener("click", (e) => {
      if (e.target === quoteDialog) {
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
        "Please fill out all required school information fields before downloading the PDF."
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
        "The base jsPDF library is not loaded. Check the script tags in index.html."
      );
      alert(
        "Error: The base PDF library (jsPDF) is not loaded. Please check your internet connection and try a hard refresh (Ctrl+F5)."
      );
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // With modern jsPDF and autoTable, the plugin attaches to the instance, not the prototype.
    // So, we check for the function on the created `doc` instance.
    if (typeof doc.autoTable !== "function") {
      console.error(
        "The jsPDF-AutoTable plugin is not loaded. Check the script tags in index.html."
      );
      alert(
        "Error: The PDF table plugin (jsPDF-AutoTable) is not loaded. Please check your internet connection and try a hard refresh (Ctrl+F5)."
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
      "quote-student-total"
    ).textContent;
    const teacherQty = document.getElementById("quote-teacher-qty").textContent;
    const teacherTotal = document.getElementById(
      "quote-teacher-total"
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
        62
      );

      // --- Company Info ---
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Vendor Information", 135, 55); // Aligned with "Quote" header
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("FERGUSON SOFTWARE SOLUTIONS, LLC", 135, 62);
      doc.text("Email: trinitycapitalsim@gmail.com", 135, 67);
      doc.text("Phone: (682) 239-1209", 135, 72);
      doc.text("Tax ID: 99-1043982", 135, 77);
      // --- Line Items Table ---
      doc.autoTable({
        startY: 85,
        head: [["Item Description", "Quantity", "Unit Price", "Total"]],
        body: [
          ["Student License", studentQty, "$5.00", studentTotal],
          ["Teacher License", teacherQty, "$20.00", teacherTotal],
        ],
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
          `• For assistance, please contact trinitycapitalsim@gmail.com.`,
        15,
        finalY + 30
      );

      // --- Save PDF ---
      doc.save(
        `Quote-${schoolName.replace(/\s/g, "_")}-${today.toISOString().slice(0, 10)}.pdf`
      );
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert(
        "Could not generate the PDF. This may be due to a network issue or browser restrictions. Please try again."
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
        "Please fill out all required school information fields before emailing the quote."
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
        "Error: The base PDF library (jsPDF) is not loaded. Please check your internet connection and try a hard refresh (Ctrl+F5)."
      );
      return;
    }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    if (typeof doc.autoTable !== "function") {
      alert(
        "Error: The PDF table plugin (jsPDF-AutoTable) is not loaded. Please check your internet connection and try a hard refresh (Ctrl+F5)."
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
        "Error: The administrator email field is missing from the form. Please add an input with id='admin-email'."
      );
      return;
    }
    const recipientEmail = adminEmailInput.value;

    const studentQty = document.getElementById("quote-student-qty").textContent;
    const studentTotal = document.getElementById(
      "quote-student-total"
    ).textContent;
    const teacherQty = document.getElementById("quote-teacher-qty").textContent;
    const teacherTotal = document.getElementById(
      "quote-teacher-total"
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
        62
      );

      // --- Company Info ---
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Vendor Information", 135, 55);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("FERGUSON SOFTWARE SOLUTIONS, LLC", 135, 62);
      doc.text("Email: trinitycapitalsim@gmail.com", 135, 67);
      doc.text("Phone: (682) 239-1209", 135, 72);
      doc.text("Tax ID: 99-1043982", 135, 77);
      // --- Line Items Table ---
      doc.autoTable({
        startY: 85,
        head: [["Item Description", "Quantity", "Unit Price", "Total"]],
        body: [
          ["Student License", studentQty, "$5.00", studentTotal],
          ["Teacher License", teacherQty, "$20.00", teacherTotal],
        ],
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
          `• For assistance, please contact trinitycapitalsim@gmail.com.`,
        15,
        finalY + 30
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
      const response = await fetch("https://tcpurchasingserver-production.up.railway.app/send-quote-email", {
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
          "Could not email the PDF. This may be due to a network issue or browser restrictions. Please try again."
      );
    } finally {
      const loadingBar = document.getElementById("email-loading-bar");
      if (loadingBar) loadingBar.style.display = "none";
    }
  }

  if (emailQuoteBtn) {
    emailQuoteBtn.addEventListener("click", handleEmailQuote);
  }
});

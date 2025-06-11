document.addEventListener("DOMContentLoaded", function () {
  // School License Order Summary Updater
  const studentInput = document.getElementById("student-qty");
  const teacherInput = document.getElementById("teacher-qty");
  const summary = document.getElementById("order-summary");
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

    // Handle purchase button click
    if (purchaseButton) {
      purchaseButton.addEventListener("click", async (e) => {
        e.preventDefault();
        const studentQty = parseInt(studentInput.value, 10) || 0;
        const teacherQty = parseInt(teacherInput.value, 10) || 0;

        if (studentQty === 0 && teacherQty === 0) {
          alert("Please select at least one license to purchase");
          return;
        }

        try {
          const response = await fetch("https://moneytalkspurchasing-g8g8gpd0gxebdhhv.centralus-01.azurewebsites.net/create-checkout", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              studentQuantity: studentQty,
              teacherQuantity: teacherQty,
              total: studentQty * 5 + teacherQty * 20,
            }),
          });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const { url } = await response.json();
          window.location.href = url;
        } catch (error) {
          console.error("Error:", error);
          alert(
            "There was a problem processing your request. Please try again."
          );
        }
      });
    }
  }
});

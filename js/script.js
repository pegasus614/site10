document.addEventListener("DOMContentLoaded", () => {
  const screen1 = document.getElementById("screen1");
  const screen2 = document.getElementById("screen2");
  const transferSection = document.getElementById("transfer-section");
  const goToTickets = document.getElementById("goToTickets");

  // Function to show Screen 2
  function showScreen2() {
    screen1.style.display = "none";
    screen2.style.display = "block";
  }

  // Show screen 2 after 3.5 seconds automatically
  setTimeout(showScreen2, 3500);

  // Also show screen 2 when user clicks event card
  goToTickets.addEventListener("click", showScreen2);


  // When clicking "View Ticket"
  document.querySelectorAll(".view-ticket").forEach(btn => {
    btn.addEventListener("click", () => {
      transferSection.classList.add("show");
      transferSection.scrollIntoView({ behavior: "smooth" });
    });
  });

  // Count selected seats
  const inputs = document.querySelectorAll(".seat-input");
  const selectedCount = document.getElementById("selected-count");
  function updateCount() {
    const count = [...inputs].filter(i => i.checked).length;
    selectedCount.textContent = `${count} Selected`;
  }
  inputs.forEach(i => i.addEventListener("change", updateCount));
});

   // Open screen 4 when clicking "TRANSFER TO >"
document.querySelector(".transfer-link").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("screen4").classList.add("show");
  document.getElementById("screen4").scrollIntoView({ behavior: "smooth" });
});

// Go back to screen 3
document.getElementById("backToTransfer").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("screen4").classList.remove("show");
});

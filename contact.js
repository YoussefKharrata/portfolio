document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".copy-btn");
  if (!btn) return;
  btn.addEventListener("click", async () => {
    const text = btn.dataset.copy;
    try {
      await navigator.clipboard.writeText(text);
      const original = btn.textContent;
      btn.textContent = "copied";
      setTimeout(() => { btn.textContent = original; }, 1500);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Năm hiện tại ở chân trang
  document.querySelectorAll(".year").forEach((item) => {
    item.textContent = new Date().getFullYear();
  });

  // Dark mode: lưu lựa chọn trên trình duyệt
  const themeButtons = document.querySelectorAll(".theme-toggle");
  const savedTheme = localStorage.getItem("portfolio-theme");

  if (savedTheme === "dark") document.body.classList.add("dark");

  const updateThemeButtons = () => {
    themeButtons.forEach((button) => {
      button.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
      button.setAttribute("aria-label",
        document.body.classList.contains("dark") ? "Bật giao diện sáng" : "Bật giao diện tối");
    });
  };
  updateThemeButtons();

  themeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      localStorage.setItem("portfolio-theme",
        document.body.classList.contains("dark") ? "dark" : "light");
      updateThemeButtons();
    });
  });

  // Menu dành cho màn hình nhỏ
  const menuButton = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.textContent = isOpen ? "✕" : "☰";
    });
  }

  // Animation khi phần tử đi vào vùng nhìn thấy
  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("visible"));
  }
});

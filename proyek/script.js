document.addEventListener("DOMContentLoaded", function () {
  const nav = document.querySelector("nav");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 10) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });

  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

  smoothScrollLinks.forEach(link =>{
    link.addEventListener("click", function (e) {
        e.preventDefault();

        const href = this.getAttribute("href");
        const targetElement = document.querySelector(href);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start"
            })
        }
    });
  })

  const section = document.querySelectorAll("section[id], footer[id]");
  const navLinks = document.querySelectorAll("nav a");

  const observerOptions = {
    root : null,
    rootMargin: "0px",
    threshold: 0.6
  }

  const observerCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const currentSectionId = entry.target.getAttribute("id");

            navLinks.forEach(link => {
                link.classList.remove("active");
            });

            const activeLink = document.querySelector(`nav a[href="#${currentSectionId}"]`);
            if (activeLink) {
                activeLink.classList.add("active");
            }
        }
    });
  }

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  section.forEach(section => {
    observer.observe(section);
  })
});

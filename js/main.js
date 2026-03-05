// ── THEME SWITCH ──────────────────────────────────────────
const toggleBtn = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("theme") || "dark";
if (savedTheme === "dark") {
    document.body.classList.add("dark");
    toggleBtn.textContent = "☀️";
} else {
    document.body.classList.remove("dark");
    toggleBtn.textContent = "🌙";
}

toggleBtn.onclick = () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    toggleBtn.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
};

// ── NAVBAR SCROLL SHADOW ──────────────────────────────────
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 20);
});

// ── HAMBURGER MENU ────────────────────────────────────────
const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");

hamburger.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", isOpen);
});

// Close mobile nav on link click
document.querySelectorAll(".mobile-link").forEach(link => {
    link.addEventListener("click", () => {
        mobileNav.classList.remove("open");
    });
});

// ── SMOOTH SCROLL ─────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});

// ── SCROLL REVEAL ─────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll(".service-card, .project-card, .why-item").forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = "opacity 0.55s ease, transform 0.55s ease";
    observer.observe(el);
});

// ── EMAILJS ───────────────────────────────────────────────
(function () {
    emailjs.init("YOUR_PUBLIC_KEY");
})();

document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const btn = this.querySelector("button[type='submit']");
    const status = document.getElementById("status");

    btn.textContent = "Sending...";
    btn.disabled = true;
    status.textContent = "";
    status.style.color = "";

    emailjs.sendForm(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        this
    ).then(() => {
        status.textContent = "✅ Message sent successfully!";
        status.style.color = "#00cc88";
        this.reset();
    }, () => {
        status.textContent = "❌ Failed to send. Please try again.";
        status.style.color = "#ff5555";
    }).finally(() => {
        btn.textContent = "Send Message";
        btn.disabled = false;
    });
});

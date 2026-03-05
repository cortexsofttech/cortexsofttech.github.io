// THEME SWITCH
const toggleBtn = document.getElementById("themeToggle");

// Apply saved theme immediately on load
const savedTheme = localStorage.getItem("theme");
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

// SMOOTH SCROLL (for navbar links)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});

// EMAILJS
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
        status.textContent = "❌ Failed to send message. Please try again.";
        status.style.color = "#ff5555";
    }).finally(() => {
        btn.textContent = "Send Message";
        btn.disabled = false;
    });
});

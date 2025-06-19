const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const body = document.body;

function toggleSidebar() {
    sidebar.classList.toggle('active');
    body.classList.toggle('sidebar-active');
}

function closeSidebar() {
    sidebar.classList.remove('active');
    body.classList.remove('sidebar-active');
}

// Swipe gesture for mobile
let touchStartX = 0;
document.addEventListener("touchstart", function (e) {
    touchStartX = e.touches[0].clientX;
});

document.addEventListener("touchend", function (e) {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX;

    if (diff > 100) toggleSidebar();
    if (diff < -100 && sidebar.classList.contains("active")) closeSidebar();
});

window.addEventListener("DOMContentLoaded", () => {
    gsap.from(".content-home", {
        opacity: 0,
        y: 50,
        duration: 1.2,
        delay: 0.5,
        ease: "power2.out"
    });

    document.querySelectorAll(".timeline-block").forEach((block, i) => {
        const circle = block.querySelector(".timeline-circle");
        const contents = block.querySelectorAll(".content");

        gsap.from(block, {
            opacity: 0,
            y: 60,
            duration: 1,
            delay: i * 0.3,
            ease: "power3.out"
        });

        gsap.from(circle, {
            rotationY: 90,
            opacity: 0,
            duration: 0.8,
            delay: 0.3 + i * 0.3,
            ease: "back.out(1.7)"
        });

        gsap.from(contents, {
            opacity: 0,
            y: 30,
            duration: 0.6,
            delay: 0.5 + i * 0.3,
            stagger: 0.2,
            ease: "power2.out"
        });
    });
});
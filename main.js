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

        // Navigasi aktif saat scroll
        const navLinks = document.querySelectorAll('.nav-item');
        const sections = document.querySelectorAll('section');

        function activateLinkOnScroll() {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (scrollY >= sectionTop - 120) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', () => {
            activateLinkOnScroll();
        });

        window.addEventListener('DOMContentLoaded', () => {
            activateLinkOnScroll();

            // Hero animation
            gsap.from(".content-home", {
                opacity: 0,
                y: 50,
                duration: 1.2,
                delay: 0.5,
                ease: "power2.out"
            });

            // Timeline animation - hanya jalan sekali saat page dibuka
            const blocks = document.querySelectorAll('.timeline-block');

            blocks.forEach((block, i) => {
                const circle = block.querySelector('.timeline-circle');
                const contents = block.querySelectorAll('.content');

                gsap.from(block, {
                    opacity: 0,
                    y: 60,
                    duration: 1,
                    delay: i * 0.3,
                    ease: 'power3.out'
                });

                gsap.from(circle, {
                    rotationY: 90,
                    opacity: 0,
                    duration: 0.8,
                    delay: 0.3 + i * 0.3,
                    ease: 'back.out(1.7)'
                });

                gsap.from(contents, {
                    opacity: 0,
                    y: 30,
                    duration: 0.6,
                    delay: 0.5 + i * 0.3,
                    stagger: 0.2,
                    ease: 'power2.out'
                });
            });
        });

        // timeline
        const modal = document.getElementById('yearModal');
        const modalTitle = document.getElementById('modal-title');
        const modalText = document.getElementById('modal-text');
        const closeBtn = document.querySelector('.close-button');

        document.querySelectorAll('.timeline-circle').forEach(circle => {
            circle.addEventListener('click', () => {
                const year = circle.textContent.trim();
                showModal(year);
            });
        });

        function showModal(year) {
            const content = {
                "1400": "Cerita sejarah awal mula munculnya Cirebon dan pengaruh kerajaan maritim Nusantara.",
                "1600": "Perdagangan lintas negara mulai ramai di pelabuhan Cirebon.",
                "1800": "Masa kolonial Belanda dan pengaruhnya pada budaya lokal.",
                "1945": "Proklamasi kemerdekaan & kontribusi budaya Cirebon.",
                "Now": "Digitalisasi budaya oleh Kacirebonan, modern dan inspiratif."
            };

            modalTitle.textContent = `Tahun ${year}`;
            modalText.textContent = content[year] || "Belum ada deskripsi untuk tahun ini.";
            modal.classList.remove('hidden');

            gsap.fromTo('.modal-content',
                { scale: 0.85, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.5, ease: 'power3.out' }
            );
        }

        closeBtn.addEventListener('click', animateModalClose);
        window.addEventListener('click', (e) => {
            if (e.target === modal) animateModalClose();
        });

        function animateModalClose() {
            gsap.to('.modal-content', {
                scale: 0.85,
                opacity: 0,
                duration: 0.4,
                ease: 'power3.in',
                onComplete: () => {
                    modal.classList.add('hidden');
                }
            });
        }

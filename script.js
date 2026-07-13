document.addEventListener("DOMContentLoaded", () => {
    // 1. Scroll Fade-In Logic
    // This observer triggers the soft reveal as the user scrolls down
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once revealed so it stays visible
                fadeObserver.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.15, // Triggers when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Triggers slightly before it fully hits the viewport
    });

    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach(el => fadeObserver.observe(el));

    // 2. Falling Petals Generator for the Final Section
    const crescendoSection = document.querySelector('.crescendo');
    const petalsContainer = document.getElementById('petals-container');
    const petalColors = ['#e2a792', '#f9eee8', '#d4af37']; // Terracotta, Blush, Gold

    function createPetal() {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        
        // Randomize size, position, color, and fall speed
        const size = Math.random() * 15 + 10; // 10px to 25px
        const leftPos = Math.random() * 100; // 0% to 100vw
        const fallDuration = Math.random() * 8 + 6; // 6s to 14s
        const color = petalColors[Math.floor(Math.random() * petalColors.length)];

        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        petal.style.left = `${leftPos}%`;
        petal.style.top = `-20px`;
        petal.style.backgroundColor = color;
        petal.style.animationDuration = `${fallDuration}s`;

        petalsContainer.appendChild(petal);

        // Remove petal after it falls to prevent DOM bloat
        setTimeout(() => {
            petal.remove();
        }, fallDuration * 1000);
    }

    // Generate a new petal every 800ms
    setInterval(createPetal, 800);
});

// 3. Final Call-to-Action Logic
function revealSurprise() {
    const button = document.querySelector('.cta-button');
    const message = document.getElementById('surprise-message');
    
    // Softly fade out the button and fade in the message
    button.style.opacity = '0';
    setTimeout(() => {
        button.classList.add('hidden');
        message.classList.remove('hidden');
        // Small delay to allow display:block to apply before adding opacity class
        setTimeout(() => {
            message.classList.add('revealed');
        }, 50);
    }, 400); // Matches the CSS transition time
}
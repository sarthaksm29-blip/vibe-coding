document.addEventListener('DOMContentLoaded', () => {
    initKiteAnimation();
    initWishButton();
});

/* =========================================
   Kite Animation Logic
   ========================================= */
function initKiteAnimation() {
    const sky = document.getElementById('sky-container');
    const colors = ['#A0C878', '#DDEB9D', '#900C3F', '#F4D35E', '#FF6F61', '#6B5B95']; // Fresh Greens, Magenta, and complementary adjustments

    // Create a new kite at regular intervals
    setInterval(() => {
        createKite(sky, colors);
    }, 1500); // New kite every 1.5 seconds

    // Initial batch
    for (let i = 0; i < 5; i++) {
        setTimeout(() => createKite(sky, colors), i * 300);
    }
}

function createKite(container, colors) {
    const kite = document.createElement('div');
    kite.classList.add('kite');

    // Random Properties
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 20 + 20; // 20px to 40px
    const startLeft = Math.random() * 100; // 0% to 100% width
    const duration = Math.random() * 10 + 10; // 10s to 20s float time

    // Apply Styles
    kite.style.backgroundColor = randomColor;
    kite.style.width = `${size}px`;
    kite.style.height = `${size}px`;
    kite.style.left = `${startLeft}%`;
    kite.style.top = '110vh'; // Start below screen

    // Add tail color matching or contrasting
    // Note: The tail is a pseudo-element, so we can't easily change it via inline styles on the parent
    // without CSS variables. Let's stick to the CSS preset for the tail or improve implementation if needed.
    // For now the CSS handles the tail logic generally.

    // Animate
    kite.style.transition = `top ${duration}s linear, transform ${duration}s ease-in-out`;

    container.appendChild(kite);

    // Trigger Animation
    requestAnimationFrame(() => {
        kite.style.top = '-20vh'; // Float well above screen
        kite.style.transform = `rotate(${Math.random() * 90 - 45}deg)`; // Slight rotation
    });

    // Cleanup
    setTimeout(() => {
        kite.remove();
    }, duration * 1000);
}

/* =========================================
   Wish Button & Confetti Logic
   ========================================= */
function initWishButton() {
    const btn = document.getElementById('wish-btn');
    if (btn) {
        btn.addEventListener('click', () => {
            fireConfetti();
            setTimeout(() => {
                alert('ITM celebrates the sweetness of traditions with you!');
            }, 300);
        });
    }
}

function fireConfetti() {
    const count = 100;
    const body = document.body;

    for (let i = 0; i < count; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = ['#A0C878', '#900C3F', '#DDEB9D', '#FFC107', '#2C2C2C'].sort(() => Math.random() - 0.5)[0];
        confetti.style.left = '50%';
        confetti.style.top = '50%';
        confetti.style.zIndex = '9999';
        confetti.style.borderRadius = '50%';

        // Random destination
        const destX = (Math.random() - 0.5) * window.innerWidth;
        const destY = (Math.random() - 0.5) * window.innerHeight;

        confetti.style.transition = 'all 1s ease-out';

        body.appendChild(confetti);

        requestAnimationFrame(() => {
            confetti.style.transform = `translate(${destX}px, ${destY}px) scale(0)`;
            confetti.style.opacity = '0';
        });

        setTimeout(() => confetti.remove(), 1000);
    }
}

console.log("Bento Profile Loaded ✨");

// ============================================
// 1. 3D TILT EFFECT ON ALL CARDS
// ============================================
const bentoCards = document.querySelectorAll('.bento-card');

bentoCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        card.style.transition = 'transform 0.5s ease';
    });
    
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'transform 0.1s ease';
    });
});

// ============================================
// 2. MAGNETIC CURSOR EFFECT ON SOCIAL ICONS
// ============================================
const iconWrappers = document.querySelectorAll('.icon-wrapper');

iconWrappers.forEach(icon => {
    icon.addEventListener('mousemove', (e) => {
        const rect = icon.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        icon.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'translate(0, 0)';
        icon.style.transition = 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
    });
});

// ============================================
// 3. SKILL PILLS WAVE ANIMATION ON HOVER
// ============================================
const skillPills = document.querySelectorAll('.skill-pill');

skillPills.forEach((pill, index) => {
    pill.addEventListener('mouseenter', () => {
        // Animate this pill
        pill.style.transform = 'translateY(-8px) scale(1.1)';
        pill.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        
        // Create ripple effect on nearby pills
        skillPills.forEach((otherPill, otherIndex) => {
            const distance = Math.abs(index - otherIndex);
            if (distance > 0 && distance <= 2) {
                const scale = 1 + (0.05 / distance);
                const lift = 4 / distance;
                otherPill.style.transform = `translateY(-${lift}px) scale(${scale})`;
                otherPill.style.transition = `transform 0.3s ease ${distance * 0.05}s`;
            }
        });
    });
    
    pill.addEventListener('mouseleave', () => {
        skillPills.forEach(p => {
            p.style.transform = 'translateY(0) scale(1)';
            p.style.boxShadow = 'none';
            p.style.transition = 'all 0.3s ease';
        });
    });
});

// ============================================
// 4. STAGGERED ENTRANCE ANIMATION
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply initial hidden state and observe
bentoCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// ============================================
// 5. RANDOM EMOJI SPARKLE ON PAGE LOAD
// ============================================
function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = ['✨', '💫', '⭐', '🌟'][Math.floor(Math.random() * 4)];
    sparkle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: ${Math.random() * 20 + 10}px;
        pointer-events: none;
        z-index: 9999;
        animation: sparkle-float 1s ease-out forwards;
    `;
    document.body.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 1000);
}

// Add sparkle animation CSS dynamically
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkle-float {
        0% { opacity: 1; transform: translateY(0) scale(1); }
        100% { opacity: 0; transform: translateY(-50px) scale(0.5); }
    }
`;
document.head.appendChild(sparkleStyle);

// Sparkle burst on page load
setTimeout(() => {
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            createSparkle(x, y);
        }, i * 100);
    }
}, 500);

// ============================================
// 6. PROFILE PIC PULSE ON HOVER
// ============================================
const profilePic = document.querySelector('.profile-pic');
if (profilePic) {
    profilePic.addEventListener('mouseenter', () => {
        profilePic.style.animation = 'pulse-glow 0.6s ease';
    });
    
    profilePic.addEventListener('animationend', () => {
        profilePic.style.animation = '';
    });
    
    // Add pulse animation
    const pulseStyle = document.createElement('style');
    pulseStyle.textContent = `
        @keyframes pulse-glow {
            0% { box-shadow: 0 0 0 0 rgba(255, 183, 178, 0.7); }
            50% { box-shadow: 0 0 0 15px rgba(255, 183, 178, 0); }
            100% { box-shadow: 0 0 0 0 rgba(255, 183, 178, 0); }
        }
    `;
    document.head.appendChild(pulseStyle);
}

// ============================================
// 7. CLICK RIPPLE EFFECT ON CARDS
// ============================================
bentoCards.forEach(card => {
    card.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        const rect = card.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${e.clientX - rect.left - size / 2}px;
            top: ${e.clientY - rect.top - size / 2}px;
            background: rgba(255, 255, 255, 0.4);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple-effect 0.6s ease-out;
            pointer-events: none;
        `;
        
        card.style.position = 'relative';
        card.style.overflow = 'hidden';
        card.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple-effect {
        to { transform: scale(2); opacity: 0; }
    }
`;
document.head.appendChild(rippleStyle);

// ============================================
// 8. DYNAMIC GREETING BASED ON TIME
// ============================================
const profileName = document.querySelector('.profile-info h1');
if (profileName) {
    const hour = new Date().getHours();
    let greeting = '';
    let emoji = '';
    
    if (hour >= 5 && hour < 12) {
        greeting = 'Good Morning!';
        emoji = '☀️';
    } else if (hour >= 12 && hour < 17) {
        greeting = 'Good Afternoon!';
        emoji = '🌤️';
    } else if (hour >= 17 && hour < 21) {
        greeting = 'Good Evening!';
        emoji = '🌅';
    } else {
        greeting = 'Night Owl Mode';
        emoji = '🌙';
    }
    
    // Add greeting subtitle
    const greetingEl = document.createElement('p');
    greetingEl.className = 'dynamic-greeting';
    greetingEl.innerHTML = `${emoji} ${greeting}`;
    greetingEl.style.cssText = `
        font-size: 0.85rem;
        color: #888;
        margin-top: 8px;
        opacity: 0;
        animation: fade-in 0.8s ease 1s forwards;
    `;
    profileName.parentElement.appendChild(greetingEl);
    
    const fadeStyle = document.createElement('style');
    fadeStyle.textContent = `
        @keyframes fade-in {
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(fadeStyle);
}

console.log("All interactive features loaded! 🚀");

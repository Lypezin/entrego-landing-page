/* ============================================
   EntreGÔ Itaim — Landing Page Scripts
   Vanilla JS • Performance optimized
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initFAQAccordion();
    initDynamicSource();
});

/* ===== SCROLL ANIMATIONS (IntersectionObserver) ===== */
function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');

    if (!elements.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px',
        }
    );

    elements.forEach((el, index) => {
        // Stagger animations for elements in the same section
        el.style.transitionDelay = `${(index % 6) * 0.08}s`;
        observer.observe(el);
    });
}

/* ===== FAQ ACCORDION ===== */
function initFAQAccordion() {
    const faqList = document.querySelector('.faq-list');

    if (!faqList) return;

    faqList.addEventListener('click', (e) => {
        const button = e.target.closest('.faq-question');
        if (!button) return;

        const item = button.parentElement;
        const answer = item.querySelector('.faq-answer');
        const isActive = item.classList.contains('active');

        // Close all items
        document.querySelectorAll('.faq-item').forEach((otherItem) => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            }
        });

        // Toggle clicked item
        if (!isActive) {
            item.classList.add('active');
            button.setAttribute('aria-expanded', 'true');
            answer.style.maxHeight = `${answer.scrollHeight}px`;
        } else {
            item.classList.remove('active');
            button.setAttribute('aria-expanded', 'false');
            answer.style.maxHeight = null;
        }
    });
}

/* ===== DYNAMIC SOURCE TRACKING ===== */
function initDynamicSource() {
    const params = new URLSearchParams(window.location.search);
    const source = params.get('utm_source'); // Case insensitive check later

    if (!source) return;

    const lowerSource = source.toLowerCase();
    let message = '';

    // Define messages based on source (priority order)
    if (lowerSource.includes('tiktok')) {
        message = 'Vim do TikTok e quero mais informações sobre a EntreGÔ Itaim';
    } else if (lowerSource.includes('facebook')) {
        message = 'Vim do Facebook e quero mais informações sobre a EntreGÔ Itaim';
    } else if (lowerSource.includes('instagram')) {
        message = 'Vim do Instagram e quero mais informações sobre a EntreGÔ Itaim';
    } else if (lowerSource.includes('google')) {
        message = 'Vim do Google e quero mais informações sobre a EntreGÔ Itaim';
    }

    if (!message) return; // No matching source, keep default

    // Update all WhatsApp links
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');

    whatsappLinks.forEach(link => {
        const currentHref = link.getAttribute('href');
        if (!currentHref) return;

        // Extract phone number from current href
        // Supported formats: wa.me/5511... or api.whatsapp.com/send?phone=5511...
        // For this site we use wa.me/5511...
        const phoneMatch = currentHref.match(/wa\.me\/(\d+)/);

        if (phoneMatch && phoneMatch[1]) {
            const phone = phoneMatch[1];
            // Update href with new message
            const newHref = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
            link.setAttribute('href', newHref);
        }
    });
}

/* ===== YOUTUBE VIDEO CONTROL ===== */
var player; // Define global variable
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    const muteBtn = document.getElementById('unmute-btn');
    if (muteBtn) {
        muteBtn.addEventListener('click', () => {
            if (player && player.unMute) {
                player.unMute();
                muteBtn.classList.add('hidden');
            }
        });
    }
}

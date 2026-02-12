/* ============================================
   EntreGÔ Itaim — Landing Page Scripts
   Vanilla JS • Performance optimized
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initFAQAccordion();
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

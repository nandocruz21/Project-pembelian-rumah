// ========================
// Toggle Hamburger Menu
// ========================
const hamburger = document.querySelector('.hamburger');
const menuKiri = document.querySelector('.menu-kiri');

hamburger.addEventListener('click', () => {
    menuKiri.classList.toggle('active'); // Show / hide menu
});


// ========================
// FAQ Toggle
// (Tetap seperti aslinya: hanya 1 yang terbuka)
// ========================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Tutup semua FAQ
        faqItems.forEach(faq => {
            faq.classList.remove('active');
            faq.querySelector('.faq-toggle').textContent = '+';
        });

        // Buka jika sebelumnya tertutup
        if (!isActive) {
            item.classList.add('active');
            question.querySelector('.faq-toggle').textContent = '−';
        }
    });
});


// ========================
// Smooth Scroll
// ========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Jangan block klik link jika itu buka halaman baru
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});



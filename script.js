// =========================================
// SCRIPT UTAMA - Green Piece Website
// =========================================

// --- 1. DOM READY LISTENER ---
// Menunggu seluruh halaman dimuat sebelum menjalankan fungsi
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Script loaded successfully');
    
    // Inisialisasi semua fitur
    initHamburgerMenu();
    initFaqToggle();
    initSmoothScroll();
    initScrollToTop();
});


// --- 2. HAMBURGER MENU (MOBILE) ---
function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const menuKiri = document.querySelector('.menu-kiri');
    
    // Cek keberadaan elemen agar tidak error di halaman lain
    if (!hamburger || !menuKiri) return;
    
    // Event Klik pada Tombol Hamburger
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation(); // Mencegah klik tembus ke elemen lain
        menuKiri.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Toggle Overlay Gelap
        const overlay = document.querySelector('.mobile-menu-overlay') || createMobileOverlay();
        overlay.classList.toggle('active');
        
        // Kunci Scroll Body saat menu terbuka
        document.body.classList.toggle('no-scroll');
    });
    
    // Fungsi Membuat Overlay secara Dinamis
    function createMobileOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        document.body.appendChild(overlay);
        
        // Klik Overlay = Tutup Menu
        overlay.addEventListener('click', closeMenu);
        return overlay;
    }
    
    // Fungsi Menutup Menu
    function closeMenu() {
        menuKiri.classList.remove('active');
        hamburger.classList.remove('active');
        const overlay = document.querySelector('.mobile-menu-overlay');
        if (overlay) overlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }

    // Tutup menu saat salah satu link diklik
    const menuLinks = menuKiri.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

// --- 3. FAQ ACCORDION (TANYA JAWAB) ---
function initFaqToggle() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const toggleIcon = item.querySelector('.faq-toggle'); // Ambil elemen ikon +/-
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Tutup semua item FAQ lain agar hanya satu yang terbuka (Accordion Effect)
            faqItems.forEach(faq => {
                faq.classList.remove('active');
                const icon = faq.querySelector('.faq-toggle');
                if (icon) icon.textContent = '+';
            });
            
            // Jika yang diklik belum aktif, maka buka
            if (!isActive) {
                item.classList.add('active');
                if (toggleIcon) toggleIcon.textContent = '−'; // Ganti simbol jadi minus
            }
        });
    });
}

// --- 4. SMOOTH SCROLL (GULIR HALUS) ---
function initSmoothScroll() {
    // Pilih semua link yang diawali dengan '#'
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Abaikan link kosong atau link eksternal
            if (href === '#' || href.includes('http') || href.includes('mailto:') || href.includes('tel:')) {
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault(); // Matikan lompatan default browser
                
                // Tutup menu mobile jika sedang terbuka (UX yang baik)
                const menuKiri = document.querySelector('.menu-kiri');
                if (menuKiri && menuKiri.classList.contains('active')) {
                    // Panggil fungsi close manual (duplikasi logika closeMenu agar aman)
                    menuKiri.classList.remove('active');
                    const hamburger = document.querySelector('.hamburger');
                    if (hamburger) hamburger.classList.remove('active');
                    const overlay = document.querySelector('.mobile-menu-overlay');
                    if (overlay) overlay.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                }
                
                // Hitung posisi scroll dengan offset header
                const headerHeight = document.querySelector('.navigasi')?.offsetHeight || 70;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - headerHeight;
                
                // Eksekusi Scroll
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// --- 5. SCROLL TO TOP BUTTON ---
function initScrollToTop() {
    // 1. Buat elemen tombol secara dinamis
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '↑'; // Ikon panah atas
    scrollBtn.setAttribute('aria-label', 'Scroll ke atas');
    document.body.appendChild(scrollBtn);
    
    // 2. Tampilkan tombol hanya saat di-scroll ke bawah > 300px
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    // 3. Aksi klik untuk kembali ke atas
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Catatan: Styling CSS tombol ini sudah dipindahkan ke stylee.css
}

// --- 6. UTILITY (Opsional) ---
// Fungsi debounce untuk optimasi performa scroll/resize di masa depan
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
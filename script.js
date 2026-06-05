// =====================================================
// GLOW TALK - MAIN JAVASCRIPT
// =====================================================

// DOM Elements
const authModal = document.getElementById('authModal');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const languageForm = document.getElementById('languageForm');
const emailVerification = document.getElementById('emailVerification');

// Navigation
const navItems = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.page');

// =====================================================
// MODAL FUNCTIONS
// =====================================================

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal when clicking outside
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// =====================================================
// AUTH FORM SWITCHING
// =====================================================

function showLogin() {
    loginForm.classList.remove('hidden');
    signupForm.classList.add('hidden');
    languageForm.classList.add('hidden');
    emailVerification.classList.add('hidden');
}

function showSignup() {
    loginForm.classList.add('hidden');
    signupForm.classList.remove('hidden');
    languageForm.classList.add('hidden');
    emailVerification.classList.add('hidden');
}

function showLanguageSelection() {
    loginForm.classList.add('hidden');
    signupForm.classList.add('hidden');
    languageForm.classList.remove('hidden');
    emailVerification.classList.add('hidden');
}

function showEmailVerification() {
    loginForm.classList.add('hidden');
    signupForm.classList.add('hidden');
    languageForm.classList.add('hidden');
    emailVerification.classList.remove('hidden');
}

// =====================================================
// AUTH HANDLERS
// =====================================================

function handleLogin(e) {
    e.preventDefault();
    // Simulate login
    closeModal('authModal');
    showNotification('Welcome back, Merve! ?', 'success');
}

function handleSignup(e) {
    e.preventDefault();
    // Simulate signup - go to language selection
    showLanguageSelection();
}

// =====================================================
// LANGUAGE SELECTION
// =====================================================

const languageButtons = document.querySelectorAll('.language-btn');

languageButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        languageButtons.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
    });
});

// =====================================================
// PAGE NAVIGATION
// =====================================================

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetPage = item.dataset.page;
        
        // Update active nav item
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        
        // Show target page
        pages.forEach(page => {
            page.classList.remove('active');
            if (page.id === `${targetPage}Page`) {
                page.classList.add('active');
            }
        });
        
        // Close mobile menu if open
        document.querySelector('.sidebar').classList.remove('open');
    });
});

// =====================================================
// CATEGORY NAVIGATION
// =====================================================

function openCategory(categoryName) {
    // Hide all pages
    pages.forEach(page => page.classList.remove('active'));
    
    // Show category detail page
    document.getElementById('categoryDetailPage').classList.add('active');
    
    // Update nav (optional)
    navItems.forEach(nav => nav.classList.remove('active'));
}

// =====================================================
// TAB FUNCTIONALITY
// =====================================================

document.querySelectorAll('.profile-tabs .tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.profile-tabs .tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
    });
});

document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
    });
});

// =====================================================
// SETTINGS NAVIGATION
// =====================================================

document.querySelectorAll('.settings-nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.settings-nav-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    });
});

// =====================================================
// POST INTERACTIONS
// =====================================================

document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Toggle like
        if (this.querySelector('.fa-heart')) {
            const icon = this.querySelector('.fa-heart');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                icon.style.color = '#ef4444';
                
                // Update count
                const text = this.textContent.trim();
                const count = parseInt(text.match(/\d+/)[0]);
                this.innerHTML = `<i class="fas fa-heart" style="color: #ef4444"></i> ${count + 1}`;
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                icon.style.color = '';
                
                const text = this.textContent.trim();
                const count = parseInt(text.match(/\d+/)[0]);
                this.innerHTML = `<i class="far fa-heart"></i> ${count - 1}`;
            }
        }
        
        // Toggle bookmark
        if (this.querySelector('.fa-bookmark')) {
            const icon = this.querySelector('.fa-bookmark');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                icon.style.color = 'var(--primary)';
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                icon.style.color = '';
            }
        }
    });
});

// =====================================================
// NOTIFICATION SYSTEM
// =====================================================

function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 1rem;
        right: 1rem;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 2000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// =====================================================
// MOBILE MENU
// =====================================================

// Create mobile menu toggle
const mobileToggle = document.createElement('button');
mobileToggle.className = 'mobile-menu-toggle';
mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
document.body.appendChild(mobileToggle);

mobileToggle.addEventListener('click', () => {
    document.querySelector('.sidebar').classList.toggle('open');
});

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    const sidebar = document.querySelector('.sidebar');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && !toggle.contains(e.target)) {
            sidebar.classList.remove('open');
        }
    }
});

// =====================================================
// SEARCH FUNCTIONALITY
// =====================================================

const searchInputs = document.querySelectorAll('.search-bar input');

searchInputs.forEach(input => {
    input.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            const query = input.value.trim();
            if (query) {
                showNotification(`Searching for "${query}"...`, 'info');
                // Implement search functionality
            }
        }
    });
});

// =====================================================
// FORM VALIDATION
// =====================================================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 8;
}

// Real-time form validation
document.querySelectorAll('.auth-form input').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.type === 'email' && this.value) {
            if (!validateEmail(this.value)) {
                this.style.borderColor = 'var(--error)';
            } else {
                this.style.borderColor = 'var(--success)';
            }
        }
        
        if (this.type === 'password' && this.value) {
            if (!validatePassword(this.value)) {
                this.style.borderColor = 'var(--error)';
            } else {
                this.style.borderColor = 'var(--success)';
            }
        }
    });
    
    input.addEventListener('focus', function() {
        this.style.borderColor = 'var(--primary)';
    });
});

// =====================================================
// CHARACTER COUNTER
// =====================================================

const bioTextarea = document.querySelector('.settings-form textarea');
const charCount = document.querySelector('.char-count');

if (bioTextarea && charCount) {
    bioTextarea.addEventListener('input', function() {
        const count = this.value.length;
        const max = 200;
        charCount.textContent = `${count}/${max}`;
        
        if (count > max) {
            charCount.style.color = 'var(--error)';
            this.value = this.value.substring(0, max);
        } else {
            charCount.style.color = 'var(--text-muted)';
        }
    });
}

// =====================================================
// KEYBOARD SHORTCUTS
// =====================================================

document.addEventListener('keydown', (e) => {
    // Close modal with Escape
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    }
    
    // Focus search with Ctrl/Cmd + K
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('.search-bar input');
        if (searchInput) searchInput.focus();
    }
});

// =====================================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// =====================================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards for animation
document.querySelectorAll('.post-card, .category-card, .profile-post-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// =====================================================
// INITIALIZE
// =====================================================

document.addEventListener('DOMContentLoaded', () => {
    // Show home page by default
    document.getElementById('homePage').classList.add('active');
    
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.querySelectorAll('*').forEach(el => {
            el.style.transition = 'none';
            el.style.animation = 'none';
        });
    }
});

// =====================================================
// THEME TOGGLE (BONUS)
// =====================================================

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Check saved theme preference
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
}
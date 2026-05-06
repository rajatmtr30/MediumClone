// js/main.js

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    injectComponents();
    attachGlobalListeners();
});

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

function injectComponents() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    if (headerPlaceholder && typeof Components !== 'undefined') {
        headerPlaceholder.innerHTML = Components.renderNavbar();
    }

    if (footerPlaceholder && typeof Components !== 'undefined') {
        footerPlaceholder.innerHTML = Components.renderFooter();
    }
}

function attachGlobalListeners() {
    // Theme toggle
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            themeBtn.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        });
    }

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '65px';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.backgroundColor = 'var(--nav-bg)';
            navLinks.style.padding = '1rem';
            navLinks.style.borderBottom = '1px solid var(--border-color)';
        });
    }

    // Save Blog Button Listener (Event Delegation)
    document.body.addEventListener('click', (e) => {
        if (e.target.closest('.save-btn')) {
            const btn = e.target.closest('.save-btn');
            const blogId = btn.getAttribute('data-id');
            toggleSaveBlog(blogId, btn);
        }
    });
}

function toggleSaveBlog(id, btnElement) {
    let savedBlogs = JSON.parse(localStorage.getItem('savedBlogs') || '[]');
    
    if (savedBlogs.includes(id)) {
        savedBlogs = savedBlogs.filter(savedId => savedId !== id);
        btnElement.classList.remove('active');
        btnElement.textContent = '📑';
        showToast('Blog removed from saved list');
    } else {
        savedBlogs.push(id);
        btnElement.classList.add('active');
        btnElement.textContent = '🔖';
        showToast('Blog saved successfully');
    }
    
    localStorage.setItem('savedBlogs', JSON.stringify(savedBlogs));
}

// Toast System
function showToast(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <span>${message}</span>
        <button class="toast-close">&times;</button>
    `;

    container.appendChild(toast);

    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        toast.remove();
    });

    setTimeout(() => {
        if (document.body.contains(toast)) {
            toast.remove();
        }
    }, 3000);
}

// Helpers
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

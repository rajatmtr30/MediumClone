// js/components.js

const basePath = window.location.pathname.includes('/pages/') || window.location.pathname.includes('\\pages\\') ? '../' : './';

const Components = {
    renderNavbar: () => {
        const theme = localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
        const icon = theme === 'dark' ? '☀️' : '🌙';
        
        // Simple auth check
        const isLoggedIn = localStorage.getItem('user') !== null;
        
        let authLinks = `
            <a href="${basePath}pages/login.html" class="nav-link">Sign In</a>
            <a href="${basePath}pages/signup.html" class="btn btn-primary">Get Started</a>
        `;
        
        if (isLoggedIn) {
            authLinks = `
                <a href="${basePath}pages/write.html" class="nav-link">Write</a>
                <a href="${basePath}pages/saved.html" class="nav-link">Saved</a>
                <a href="${basePath}pages/notifications.html" class="nav-link">🔔</a>
                <a href="${basePath}pages/settings.html" class="nav-link">Profile</a>
                <button id="logout-btn" class="nav-link">Logout</button>
            `;
        }

        return `
            <nav class="navbar">
                <div class="container">
                    <div class="flex items-center gap-4">
                        <button class="mobile-menu-btn" id="mobile-menu-toggle">☰</button>
                        <a href="${basePath}index.html" class="nav-brand">MediumClone</a>
                        <div class="nav-links">
                            <a href="${basePath}index.html" class="nav-link">Our story</a>
                            <a href="${basePath}pages/explore.html" class="nav-link">Membership</a>
                            <a href="${basePath}pages/explore.html" class="nav-link">Write</a>
                            <!-- Mobile only auth links -->
                            <div class="mobile-auth-links" style="display: flex; flex-direction: column; gap: 1.5rem; margin-top: 1rem; border-top: 1px solid var(--border-color); padding-top: 1rem;">
                                ${authLinks}
                            </div>
                        </div>
                    </div>
                    <div class="nav-actions desktop-auth-links">
                        <a href="${basePath}pages/search.html" class="nav-link" aria-label="Search">🔍</a>
                        <button id="theme-toggle" class="theme-toggle" aria-label="Toggle Theme">${icon}</button>
                        <div class="auth-links-container" style="display: flex; gap: 1rem; align-items: center;">
                            ${authLinks}
                        </div>
                    </div>
                </div>
            </nav>
        `;
    },

    renderFooter: () => {
        return `
            <footer>
                <div class="container footer-content">
                    <a href="${basePath}pages/about.html" class="footer-link">About</a>
                    <a href="${basePath}pages/contact.html" class="footer-link">Help</a>
                    <a href="#" class="footer-link">Terms</a>
                    <a href="#" class="footer-link">Privacy</a>
                    <a href="${basePath}pages/categories.html" class="footer-link">Explore</a>
                </div>
            </footer>
        `;
    },

    renderBlogCard: (blog, isHorizontal = false) => {
        const classHorizontal = isHorizontal ? 'blog-card-horizontal' : '';
        const savedBlogs = JSON.parse(localStorage.getItem('savedBlogs') || '[]');
        const isSaved = savedBlogs.includes(blog.id);
        const saveIcon = isSaved ? '🔖' : '📑';
        
        return `
            <article class="blog-card ${classHorizontal}">
                <div class="blog-card-content">
                    <div class="blog-meta">
                        <img src="${blog.author.avatar}" alt="${blog.author.name}" class="author-avatar">
                        <a href="${basePath}pages/author.html?id=${blog.author.name}" class="author-name hover-text-primary">${blog.author.name}</a>
                    </div>
                    <a href="${basePath}pages/blog-details.html?id=${blog.id}">
                        <h2 class="blog-title">${blog.title}</h2>
                        <p class="blog-desc">${blog.description}</p>
                    </a>
                    <div class="blog-footer">
                        <div class="blog-meta">
                            <span>${blog.date}</span>
                            <span>·</span>
                            <span>${blog.readTime}</span>
                            <span class="badge badge-green ml-2">${blog.tags[0]}</span>
                        </div>
                        <div class="blog-actions">
                            <button class="action-btn save-btn ${isSaved ? 'active' : ''}" data-id="${blog.id}" title="Save">${saveIcon}</button>
                        </div>
                    </div>
                </div>
                ${blog.image ? `
                    <a href="${basePath}pages/blog-details.html?id=${blog.id}">
                        <img src="${blog.image}" alt="${blog.title}" class="blog-card-image">
                    </a>
                ` : ''}
            </article>
        `;
    },
    
    renderSkeletonCard: (isHorizontal = false) => {
        const classHorizontal = isHorizontal ? 'blog-card-horizontal' : '';
        return `
            <article class="blog-card ${classHorizontal}">
                <div class="blog-card-content w-full">
                    <div class="flex items-center gap-2 mb-2">
                        <div class="skeleton author-avatar"></div>
                        <div class="skeleton skeleton-text w-24" style="width: 100px;"></div>
                    </div>
                    <div class="skeleton skeleton-title"></div>
                    <div class="skeleton skeleton-text w-full"></div>
                    <div class="skeleton skeleton-text w-3/4" style="width: 75%;"></div>
                </div>
                <div class="skeleton skeleton-image"></div>
            </article>
        `;
    }
};

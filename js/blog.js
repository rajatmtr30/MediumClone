// js/blog.js

document.addEventListener('DOMContentLoaded', () => {
    loadBlogDetails();
});

async function loadBlogDetails() {
    const blogId = getQueryParam('id');
    const container = document.getElementById('blog-container');
    
    if (!blogId) {
        window.location.href = '../pages/404.html';
        return;
    }
    
    try {
        const blog = await API.getBlogById(blogId);
        
        if (!blog) {
            window.location.href = '../pages/404.html';
            return;
        }
        
        const savedBlogs = JSON.parse(localStorage.getItem('savedBlogs') || '[]');
        const isSaved = savedBlogs.includes(blog.id);
        const saveIcon = isSaved ? '🔖' : '📑';
        
        document.title = `${blog.title} - MediumClone`;
        
        container.innerHTML = `
            <div class="article-header">
                <h1 class="article-title">${blog.title}</h1>
                <h2 class="article-subtitle">${blog.subtitle}</h2>
                
                <div class="author-info-large">
                    <img src="${blog.author.avatar}" alt="${blog.author.name}" class="author-avatar-large">
                    <div>
                        <div class="flex items-center gap-2">
                            <a href="../pages/author.html?id=${blog.author.name}" class="font-bold hover-text-primary text-lg">${blog.author.name}</a>
                            <button class="text-accent text-sm font-medium hover:underline">Follow</button>
                        </div>
                        <div class="text-sm text-secondary mt-1">
                            <span>${blog.readTime}</span> · 
                            <span>Published on ${blog.date}</span>
                        </div>
                    </div>
                </div>
                
                <div class="article-actions">
                    <div class="flex items-center gap-4 text-secondary">
                        <button class="action-btn flex items-center gap-1" title="Clap">
                            <span>👏</span> <span>${blog.likes || 0}</span>
                        </button>
                        <button class="action-btn flex items-center gap-1" title="Respond">
                            <span>💬</span> <span>42</span>
                        </button>
                    </div>
                    <div class="flex items-center gap-4 text-secondary">
                        <button class="action-btn save-btn ${isSaved ? 'active' : ''}" data-id="${blog.id}" title="Save">${saveIcon}</button>
                        <button class="action-btn" title="Listen">🎧</button>
                        <button class="action-btn" title="Share">🔗</button>
                    </div>
                </div>
            </div>
            
            ${blog.image ? `<img src="${blog.image}" alt="${blog.title}" class="article-hero-image">` : ''}
            
            <div class="article-content">
                ${blog.content}
            </div>
            
            <div class="flex flex-wrap gap-2 mt-8 mb-8">
                ${blog.tags.map(tag => `<a href="../pages/categories.html?tag=${tag}" class="tag" style="background:var(--border-color); color:var(--text-primary); font-size: 0.9rem; padding: 0.4rem 0.8rem;">${tag}</a>`).join('')}
            </div>
            
            <div class="article-actions mt-8">
                <div class="flex items-center gap-4 text-secondary">
                    <button class="action-btn flex items-center gap-1" title="Clap">
                        <span>👏</span> <span>${blog.likes || 0}</span>
                    </button>
                    <button class="action-btn flex items-center gap-1" title="Respond">
                        <span>💬</span> <span>42</span>
                    </button>
                </div>
                <div class="flex items-center gap-4 text-secondary">
                    <button class="action-btn save-btn ${isSaved ? 'active' : ''}" data-id="${blog.id}" title="Save">${saveIcon}</button>
                    <button class="action-btn" title="Share">🔗</button>
                </div>
            </div>
        `;
        
    } catch (error) {
        console.error('Failed to load blog details', error);
        container.innerHTML = '<p class="text-secondary text-center py-8">Failed to load article. Please try again later.</p>';
    }
}

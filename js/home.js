// js/home.js

document.addEventListener('DOMContentLoaded', () => {
    loadHomeContent();
});

async function loadHomeContent() {
    const featuredContainer = document.getElementById('featured-blogs');
    const recommendedContainer = document.getElementById('recommended-blogs');
    const trendingContainer = document.getElementById('trending-list');
    
    // Show skeletons
    if (featuredContainer) {
        featuredContainer.innerHTML = Array(4).fill(0).map(() => Components.renderSkeletonCard()).join('');
    }
    
    try {
        const blogs = await API.fetchBlogs();
        
        if (featuredContainer) {
            const featured = blogs.filter(b => b.featured).slice(0, 4);
            featuredContainer.innerHTML = featured.length ? featured.map(b => Components.renderBlogCard(b)).join('') : '<p>No featured blogs.</p>';
        }

        if (recommendedContainer) {
            const recommended = blogs.filter(b => !b.featured).slice(0, 6);
            recommendedContainer.innerHTML = recommended.length ? recommended.map(b => Components.renderBlogCard(b, true)).join('') : '<p>No recommended blogs.</p>';
        }

        if (trendingContainer) {
            const trending = blogs.filter(b => b.trending).slice(0, 4);
            trendingContainer.innerHTML = trending.map((b, i) => `
                <div class="recommended-item">
                    <div class="text-secondary font-bold text-lg">0${i+1}</div>
                    <div>
                        <div class="flex items-center gap-2 mb-1">
                            <img src="${b.author.avatar}" class="author-avatar" style="width:20px;height:20px;" alt="${b.author.name}">
                            <span class="text-sm font-medium">${b.author.name}</span>
                        </div>
                        <a href="pages/blog-details.html?id=${b.id}">
                            <h4 class="recommended-title">${b.title}</h4>
                        </a>
                        <div class="text-sm text-secondary mt-1">${b.date} · ${b.readTime}</div>
                    </div>
                </div>
            `).join('');
        }

    } catch (error) {
        console.error('Failed to load home content', error);
        if (featuredContainer) featuredContainer.innerHTML = '<p class="text-secondary">Failed to load content.</p>';
    }
}

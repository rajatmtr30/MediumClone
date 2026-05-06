// js/api.js

const INITIAL_BLOGS = [
  {
    "id": "1",
    "title": "Modern Java in 2026: Why Records and Pattern Matching Change Everything",
    "subtitle": "A deep dive into how recent Java enhancements are revolutionizing backend development.",
    "description": "Java is no longer the verbose language it used to be. With the maturation of Records, Pattern Matching, and Virtual Threads, Java has positioned itself as a modern powerhouse for enterprise applications.",
    "content": "<p>For years, Java had a reputation for being reliable but verbose. Developers moving from expressive languages like Python or TypeScript often lamented the amount of boilerplate required just to define a simple data transfer object. But over the last few releases, Project Amber has systematically transformed the language.</p><h2>The Power of Records</h2><p>Introduced formally in Java 16, <code>record</code> types finally provided a concise syntax for immutable data carriers. Instead of generating getters, setters, <code>equals()</code>, and <code>hashCode()</code> methods, a single line of code handles it all. In 2026, using Records is the absolute standard for DTOs and API responses.</p><h2>Pattern Matching for switch</h2><p>Pattern matching has dramatically reduced the need for repetitive casting and complex <code>if-else</code> chains. Combined with sealed classes, developers can now write exhaustive domain models that are verified at compile time. This leads to fewer bugs and significantly cleaner business logic.</p><p>As we continue building highly concurrent, data-driven applications, these modern features ensure Java remains not just relevant, but arguably the best choice for large-scale backend systems.</p>",
    "author": {
      "name": "Sarah Chen",
      "avatar": "https://i.pravatar.cc/150?img=47",
      "bio": "Principal Java Architect & Open Source Contributor."
    },
    "date": "May 6, 2026",
    "readTime": "6 min read",
    "image": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    "tags": ["Java", "Programming", "Technology"],
    "likes": 3420,
    "featured": true,
    "trending": true
  },
  {
    "id": "2",
    "title": "Generative AI Architecture: Understanding the Transformer Model",
    "subtitle": "Breaking down the mechanics behind the AI revolution.",
    "description": "The Transformer architecture changed the world of Natural Language Processing. Here is an intuitive guide to understanding attention mechanisms and neural networks.",
    "content": "<p>When Google researchers published 'Attention Is All You Need' in 2017, few could have predicted the sheer scale of the revolution it would spark. The Transformer architecture is the beating heart of modern Generative AI, powering everything from conversational agents to code generation tools.</p><h2>The Core Idea: Self-Attention</h2><p>Traditional recurrent neural networks (RNNs) processed data sequentially, which made them slow and poor at retaining long-term context. Transformers solve this via the <strong>Self-Attention mechanism</strong>. Instead of reading a sentence word by word, the model looks at the entire sequence simultaneously and calculates which words are most relevant to each other, regardless of their position.</p><h2>Scaling Up</h2><p>By relying heavily on matrix multiplication, Transformers are highly parallelizable. This allowed engineers to train models on thousands of GPUs simultaneously, scaling from millions to trillions of parameters. Today, understanding these fundamentals is crucial for any developer looking to integrate LLMs into their applications.</p>",
    "author": {
      "name": "Dr. Marcus Vance",
      "avatar": "https://i.pravatar.cc/150?img=11",
      "bio": "AI Researcher and Machine Learning Engineer."
    },
    "date": "May 5, 2026",
    "readTime": "8 min read",
    "image": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
    "tags": ["Artificial Intelligence", "Machine Learning", "Tech"],
    "likes": 5100,
    "featured": true,
    "trending": true
  },
  {
    "id": "3",
    "title": "The Evolution of Micro-Frontends",
    "subtitle": "Are they the future of web architecture or an anti-pattern?",
    "description": "As web applications grow in complexity, teams are turning to micro-frontends to scale their development process. But do the benefits outweigh the performance costs?",
    "content": "<p>Microservices revolutionized backend architecture by allowing independent teams to build, deploy, and scale services autonomously. Naturally, the frontend ecosystem attempted to replicate this success with <strong>Micro-Frontends</strong>.</p><h2>The Promise</h2><p>The goal is simple: split a monolithic React or Angular application into smaller, independently deployable pieces. A team working on the 'Checkout' experience shouldn't have to coordinate releases with the 'Product Discovery' team. Using tools like Webpack Module Federation, this dream became a reality.</p><h2>The Reality</h2><p>However, the reality of micro-frontends is nuanced. While they solve organizational scaling issues, they often introduce technical complexity. Shared state management, duplicated dependencies, and complex CI/CD pipelines are significant hurdles. For teams smaller than 50 engineers, a well-structured monolith often remains the more pragmatic choice.</p>",
    "author": {
      "name": "Elena Rodriguez",
      "avatar": "https://i.pravatar.cc/150?img=32",
      "bio": "Frontend Infrastructure Lead."
    },
    "date": "May 2, 2026",
    "readTime": "5 min read",
    "image": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    "tags": ["Web Development", "Architecture", "Technology"],
    "likes": 1850,
    "featured": false,
    "trending": true
  },
  {
    "id": "4",
    "title": "Mastering the DOM in Vanilla JavaScript",
    "subtitle": "Why going back to basics is the ultimate developer superpower.",
    "description": "Frameworks come and go, but Vanilla JavaScript remains the foundation of the web. Learn how to leverage modern JS features without the bloat of libraries.",
    "content": "<p>Frameworks come and go, but Vanilla JavaScript remains the foundation of the web. With the continuous evolution of ECMAScript, many features that once required a complex library are now built directly into the language.</p><h2>Modern DOM APIs</h2><p>The modern DOM API is incredibly powerful. Methods like <code>querySelector</code>, the <code>IntersectionObserver</code> API, and the <code>Fetch</code> API have made third-party dependencies largely obsolete for basic interactivity.</p><p>Understanding the native web platform ensures that your skills remain relevant regardless of which framework is currently trending on GitHub.</p>",
    "author": {
      "name": "John Smith",
      "avatar": "https://i.pravatar.cc/150?img=60",
      "bio": "JavaScript Purist and Open Source Contributor."
    },
    "date": "April 28, 2026",
    "readTime": "4 min read",
    "image": "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&w=800&q=80",
    "tags": ["Programming", "JavaScript"],
    "likes": 850,
    "featured": false,
    "trending": false
  }
];

const API = {
    async fetchBlogs() {
        try {
            // Check if blogs are in local storage first (for simulated editing/creation)
            const localBlogs = localStorage.getItem('blogs');
            if (localBlogs) {
                return JSON.parse(localBlogs);
            }

            // Otherwise use hardcoded initial blogs
            const data = INITIAL_BLOGS;
            
            // Save to localStorage so edits persist locally
            localStorage.setItem('blogs', JSON.stringify(data));
            
            return data;
        } catch (error) {
            console.error('Error fetching blogs:', error);
            // Fallback empty data
            return [];
        }
    },

    async getBlogById(id) {
        const blogs = await this.fetchBlogs();
        return blogs.find(blog => blog.id === id);
    },

    async getFeaturedBlogs() {
        const blogs = await this.fetchBlogs();
        return blogs.filter(blog => blog.featured);
    },

    async getTrendingBlogs() {
        const blogs = await this.fetchBlogs();
        return blogs.filter(blog => blog.trending);
    },

    async saveBlog(blogData) {
        const blogs = await this.fetchBlogs();
        const existingIndex = blogs.findIndex(b => b.id === blogData.id);
        
        if (existingIndex > -1) {
            blogs[existingIndex] = { ...blogs[existingIndex], ...blogData };
        } else {
            // Create new
            const newBlog = {
                ...blogData,
                id: Date.now().toString(),
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                author: JSON.parse(localStorage.getItem('user')) || { name: 'Anonymous User', avatar: 'https://i.pravatar.cc/150?u=anon' }
            };
            blogs.unshift(newBlog);
        }
        
        localStorage.setItem('blogs', JSON.stringify(blogs));
        return true;
    },
    
    async searchBlogs(query) {
        const blogs = await this.fetchBlogs();
        const lowerQuery = query.toLowerCase();
        return blogs.filter(blog => 
            blog.title.toLowerCase().includes(lowerQuery) || 
            blog.description.toLowerCase().includes(lowerQuery) ||
            blog.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
        );
    }
};

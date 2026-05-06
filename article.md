# How I Built a Medium Clone Using Pure Vanilla JavaScript and CSS

As developers, we often find ourselves reaching for heavy frameworks like React, Next.js, or Angular the second a new project idea pops into our heads. We pull in TailwindCSS for styling and grab a handful of third-party NPM packages before writing a single line of logic. 

But recently, I challenged myself to take a step back: **Could I build a modern, high-quality blogging platform—a clone of Medium—using absolutely nothing but native HTML, CSS, and Vanilla JavaScript?**

The answer was an overwhelming yes. Here is a breakdown of how I accomplished it, the architecture I used, and why going "framework-less" is a superpower every web developer should hone.

---

## The Challenge

The goal was to recreate the core Medium.com experience. This meant I needed:
1. A **clean, minimalist UI** with beautiful typography.
2. A **functional routing system** (Home, Explore, Article View, Author Profile, Editor).
3. **Dynamic rendering** of content from a data source.
4. **Interactive features** like saving articles, Dark/Light mode toggling, and search.
5. A **Rich Text Editor** for writing articles.

And I had to do it all without `create-react-app`, without a backend, and without external CSS libraries.

## 1. Organizing the Architecture

Without a framework to dictate structure, organization is critical. I opted for a clean, modular approach:

```text
/css
  - style.css (CSS variables, typography, resets)
  - components.css (Navbars, buttons, blog cards)
  - pages.css (Specific layout grids)
/js
  - api.js (Handles fetching JSON data and LocalStorage)
  - components.js (Functions that return HTML strings for reusable UI)
  - main.js (Global event listeners and theme toggling)
/pages (Individual HTML files for routing)
/data
  - blogs.json (The simulated database)
```

By separating the CSS and JS into logical domains, the codebase remained just as maintainable as a React application.

## 2. Dynamic Rendering via JS Template Literals

One of the biggest arguments for React is JSX. However, modern JavaScript Template Literals (`...`) are incredibly powerful on their own.

Instead of writing a complex React component, I created a `components.js` file that houses functions returning HTML strings:

```javascript
const renderBlogCard = (blog) => {
    return `
        <article class="blog-card">
            <div class="blog-meta">
                <img src="${blog.author.avatar}" alt="Avatar">
                <span>${blog.author.name}</span>
            </div>
            <a href="pages/blog-details.html?id=${blog.id}">
                <h2>${blog.title}</h2>
                <p>${blog.description}</p>
            </a>
        </article>
    `;
};
```

I could then map over my fetched JSON array and inject this directly into the DOM using `container.innerHTML`. It's incredibly fast and requires zero build steps.

## 3. Simulating the Backend with LocalStorage

Since this was a frontend-only project, I needed a way to persist user actions (like bookmarking an article or saving a draft). 

I built an `api.js` layer that intercepts data requests. First, it checks `localStorage`. If data isn't there, it fetches from the `blogs.json` file. Whenever a user interacts with the app, the state is serialized and saved back to LocalStorage. This makes the static site feel like a fully-fledged, stateful application.

## 4. The Power of CSS Variables

Implementing Dark Mode used to require shipping duplicate stylesheets. Today, it takes about 10 lines of CSS using custom properties (variables).

I defined all my colors on the `:root` pseudo-class, and then redefined them under a `[data-theme="dark"]` attribute selector:

```css
:root {
    --bg-color: #ffffff;
    --text-primary: #242424;
}

[data-theme="dark"] {
    --bg-color: #121212;
    --text-primary: #f2f2f2;
}
```

A simple JavaScript toggle listener switches the `data-theme` attribute on the `<html>` tag, and the entire application repaints seamlessly.

## 5. Building the Editor

Perhaps the most fun part was building the writing interface. Instead of bringing in a massive dependency like Draft.js, I utilized the native `contenteditable="true"` HTML attribute. 

By wrapping a simple `div` and listening to `input` events, I was able to create an auto-saving draft system that feels remarkably close to Medium's actual editor. I implemented a debounce function to save the inner HTML to LocalStorage every 2 seconds, ensuring writers never lose their work.

## Conclusion

Building this clone was a refreshing reminder of how incredibly capable the native web platform has become. Frameworks exist for a reason—they handle complex state reconciliation, hydration, and massive team scaling. 

But sometimes, stripping away the abstractions and working directly with the DOM, CSS Grid, and vanilla JavaScript is the best way to level up your skills. It results in blazing-fast load times, zero dependencies to audit, and a deeper understanding of how the web truly works.

*The entire source code is available on my GitHub. If you want to see the power of Vanilla JS for yourself, clone it and take it for a spin!*

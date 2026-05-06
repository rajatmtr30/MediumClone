# MediumClone

A fully functional, responsive, and beautifully designed blogging platform inspired by Medium.com, built entirely with **HTML, CSS, and Vanilla JavaScript**. No backend frameworks, no CSS libraries—just native web technologies.

## 🌟 Features

- **Pixel-Perfect UI**: A clean, minimalist design heavily inspired by Medium.
- **Dark & Light Mode**: Built-in theme toggling utilizing CSS Variables.
- **Dynamic Content**: Articles are rendered dynamically via JavaScript utilizing a simulated JSON backend.
- **Fully Responsive**: Adapts seamlessly to Desktop, Tablet, and Mobile devices.
- **Rich Text Editor**: A `contenteditable` draft editor mimicking Medium's seamless writing experience.
- **Local Storage Integration**: Saves user preferences, drafted stories, and bookmarked articles locally.
- **Search & Filtering**: Real-time content filtering based on tags, authors, and article titles.

## 📁 Project Structure

```text
/
├── index.html           # Main home page feed
├── pages/               # Additional application pages
│   ├── article.html     # Blog reading interface
│   ├── write.html       # Draft editor
│   ├── login.html       # Authentication flows
│   └── ...              # (Categories, Search, Profile, Settings)
├── css/                 
│   ├── style.css        # Core variables and typography
│   ├── components.css   # Reusable UI cards, buttons, navbars
│   └── pages.css        # Page-specific styling rules
├── js/
│   ├── main.js          # Core application logic and event listeners
│   ├── api.js           # Simulated API endpoints via Fetch
│   └── components.js    # JS-based HTML component injection
└── data/
    └── blogs.json       # JSON data representing the database
```

## 🚀 Getting Started

Since the application uses the JavaScript `fetch()` API to load the blog data from `blogs.json`, you must run it through a local web server to avoid CORS (Cross-Origin Resource Sharing) restrictions on local file systems.

### Prerequisites

You can use any local web server. Below are two of the easiest methods:

**Method 1: Using Node.js / NPX**
```bash
npx serve .
```

**Method 2: Using Python**
```bash
python -m http.server 8000
```

Once the server is running, navigate to `http://localhost:8000` (or the port provided) in your web browser.

## 🛠️ Technology Stack

- **HTML5**: Semantic markup for accessibility and SEO.
- **CSS3**: Custom properties (variables), Flexbox, Grid, and smooth transitions.
- **Vanilla JavaScript (ES6+)**: Promises, Async/Await, DOM manipulation, and LocalStorage.

## 📝 License

This project is open-source and available under the [MIT License](LICENSE). Feel free to use it for learning purposes or as a starting point for your own static site generator!

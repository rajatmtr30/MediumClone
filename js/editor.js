// js/editor.js

document.addEventListener('DOMContentLoaded', () => {
    initEditor();
});

function initEditor() {
    const publishBtn = document.getElementById('publish-btn');
    const titleInput = document.getElementById('editor-title');
    const contentEditor = document.getElementById('editor-content');
    
    // Check if editing existing
    const blogId = getQueryParam('id');
    if (blogId) {
        loadExistingDraft(blogId);
    }
    
    // Auto-save draft
    let timeoutId;
    contentEditor.addEventListener('input', () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(saveDraft, 2000);
    });
    titleInput.addEventListener('input', () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(saveDraft, 2000);
    });
    
    if (publishBtn) {
        publishBtn.addEventListener('click', async () => {
            const title = titleInput.value.trim();
            const content = contentEditor.innerHTML.trim();
            
            if (!title) {
                showToast('Please add a title', 'error');
                return;
            }
            if (!content || content === '<br>') {
                showToast('Please add some content', 'error');
                return;
            }
            
            // Extract a simple description from content
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = content;
            const textContent = tempDiv.textContent || tempDiv.innerText || '';
            const description = textContent.substring(0, 150) + '...';
            
            const blogData = {
                id: blogId || null,
                title: title,
                subtitle: "A story on " + title,
                description: description,
                content: content,
                tags: ["General"], // Simplified
                readTime: Math.ceil(textContent.split(' ').length / 200) + " min read",
                image: "https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&w=800&q=80",
                likes: 0,
                featured: false,
                trending: false
            };
            
            try {
                publishBtn.disabled = true;
                publishBtn.textContent = 'Publishing...';
                
                await API.saveBlog(blogData);
                showToast('Blog published successfully!');
                
                // Remove draft
                localStorage.removeItem('editorDraft');
                
                setTimeout(() => {
                    window.location.href = '../index.html';
                }, 1500);
            } catch (error) {
                console.error(error);
                showToast('Failed to publish', 'error');
                publishBtn.disabled = false;
                publishBtn.textContent = 'Publish';
            }
        });
    }
}

async function loadExistingDraft(id) {
    try {
        const blog = await API.getBlogById(id);
        if (blog) {
            document.getElementById('editor-title').value = blog.title;
            document.getElementById('editor-content').innerHTML = blog.content;
        }
    } catch (e) {
        console.error("Failed to load existing post for edit", e);
    }
}

function saveDraft() {
    const title = document.getElementById('editor-title').value;
    const content = document.getElementById('editor-content').innerHTML;
    
    localStorage.setItem('editorDraft', JSON.stringify({
        title, content, date: new Date().toISOString()
    }));
    
    showToast('Draft saved', 'info');
}

// Simple bold/italic formatting commands
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        if (e.key === 'b') {
            e.preventDefault();
            document.execCommand('bold', false, null);
        } else if (e.key === 'i') {
            e.preventDefault();
            document.execCommand('italic', false, null);
        }
    }
});

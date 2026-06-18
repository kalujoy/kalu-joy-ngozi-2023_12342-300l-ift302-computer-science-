 document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. DARK/LIGHT MODE LOGIC ---
    const themeBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Set initial theme
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeBtn.innerHTML = '☀️ Light Mode';
    }

    // Toggle theme on click
    themeBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeBtn.innerHTML = '🌙 Dark Mode';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeBtn.innerHTML = '☀️ Light Mode';
        }
    });

    // --- 2. SEARCH AND FILTER LOGIC ---
    const searchBox = document.getElementById('searchBox');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const bookCards = document.querySelectorAll('.book-card');
    const noResults = document.getElementById('noResults');

    let currentFilter = 'all';

    // Function to apply both Search and Category Filter
    const filterBooks = () => {
        const searchTerm = searchBox.value.toLowerCase().trim();
        let visibleCount = 0;

        bookCards.forEach(card => {
            const title = card.querySelector('.book-title').textContent.toLowerCase();
            const desc = card.querySelector('.book-description').textContent.toLowerCase();
            const category = card.getAttribute('data-category');

            const matchesSearch = title.includes(searchTerm) || desc.includes(searchTerm);
            const matchesCategory = currentFilter === 'all' || category === currentFilter;

            if (matchesSearch && matchesCategory) {
                card.style.display = 'flex';
                // Small animation reset
                card.style.animation = 'none';
                card.offsetHeight; /* trigger reflow */
                card.style.animation = null; 
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    };

    // Listen for typing in the search box
    searchBox.addEventListener('input', filterBooks);

    // Listen for category button clicks
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            e.target.classList.add('active');
            
            // Set current filter and run function
            currentFilter = e.target.getAttribute('data-filter');
            filterBooks();
        });
    });

    // --- 3. TOAST NOTIFICATION ON DOWNLOAD ---
    const downloadBtns = document.querySelectorAll('.download-btn');
    const toast = document.getElementById('toast');

    downloadBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            toast.classList.add('show');
            // Hide toast after 3 seconds
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        });
    });
});
let books = [
    { title: "Pride and Prejudice", author: "Jane Austen", category: "Classic", borrowed: false, borrowedDate: null },
    { title: "Moby-Dick", author: "Herman Melville", category: "Classic", borrowed: false, borrowedDate: null },
    { title: "Brave New World", author: "Aldous Huxley", category: "Dystopian", borrowed: false, borrowedDate: null },
    { title: "The Hobbit", author: "J.R.R. Tolkien", category: "Fantasy", borrowed: false, borrowedDate: null },
    { title: "War and Peace", author: "Leo Tolstoy", category: "Historical Fiction", borrowed: false, borrowedDate: null },
    { title: "The Road", author: "Cormac McCarthy", category: "Post-Apocalyptic", borrowed: false, borrowedDate: null },
    { title: "The Hitchhiker's Guide to the Galaxy", author: "Douglas Adams", category: "Science Fiction", borrowed: false, borrowedDate: null },
    { title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", category: "Fantasy", borrowed: false, borrowedDate: null },
    { title: "The Da Vinci Code", author: "Dan Brown", category: "Mystery/Thriller", borrowed: false, borrowedDate: null },
    { title: "The Alchemist", author: "Paulo Coelho", category: "Philosophical Fiction", borrowed: false, borrowedDate: null },
];

let history = [];

function showSection(sectionId) {
    document.querySelectorAll('main section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';

    if (sectionId === 'categories') {
        displayCategories();
    } else if (sectionId === 'history') {
        displayHistory();
    } else {
        displayBooks(books);
    }
}

function displayBooks(booksToDisplay) {
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '';

    booksToDisplay.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.className = 'book';
        bookDiv.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Category: ${book.category}</p>
            <p>Status: ${book.borrowed ? 'Borrowed' : 'Available'}</p>
            <button onclick="toggleBorrow('${book.title}')">${book.borrowed ? 'Return' : 'Borrow'}</button>
        `;
        bookList.appendChild(bookDiv);
    });
}

function searchBooks() {
    const query = document.getElementById('search').value.toLowerCase();
    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(query) || 
        book.author.toLowerCase().includes(query) || 
        book.category.toLowerCase().includes(query)
    );
    displayBooks(filteredBooks);
}

function toggleBorrow(title) {
    books = books.map(book => {
        if (book.title === title) {
            book.borrowed = !book.borrowed;
            book.borrowedDate = book.borrowed ? new Date().toLocaleDateString() : null;
            if (book.borrowed) {
                history.push({
                    title: book.title,
                    date: book.borrowedDate,
                    action: 'Borrowed'
                });
            } else {
                history.push({
                    title: book.title,
                    date: new Date().toLocaleDateString(),
                    action: 'Returned'
                });
            }
        }
        return book;
    });
    displayBooks(books);
}

function displayCategories() {
    const categories = [...new Set(books.map(book => book.category))];
    const categoryList = document.getElementById('category-list');
    categoryList.innerHTML = '';

    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'category';
        categoryDiv.innerHTML = `
            <h3>${category}</h3>
            <p>Books in this category: ${books.filter(book => book.category === category).length}</p>
        `;
        categoryList.appendChild(categoryDiv);
    });
}

function displayHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';

    history.forEach(entry => {
        const historyDiv = document.createElement('div');
        historyDiv.className = 'history-item';
        historyDiv.innerHTML = `
            <p>${entry.date}: ${entry.title} - ${entry.action}</p>
        `;
        historyList.appendChild(historyDiv);
    });
}
showSection('home');

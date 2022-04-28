const STORAGE_KEY = 'BOOKSHELF_APPS';
let books = [];

function isStorageExist() {
    if (typeof Storage === undefined) {
        alert('Browser kamu tidak mendukung local storage');
        return false;
    }

    return true;
}

function saveBook() {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event('ondatasaved'));
}

function loadBook() {
    const serializedBook = localStorage.getItem(STORAGE_KEY);
    let book = JSON.parse(serializedBook);

    if (book !== null) books = book;

    document.dispatchEvent(new Event('ondataloaded'));
}

function updateBook() {
    if (isStorageExist()) saveBook();
}

function composeBooksObject(title, author, year, isFinished) {
    return {
        id: +new Date(),
        title,
        author,
        year,
        isFinished,
    };
}

function findBook(bookId) {
    for (book of books) {
        if (book.id === bookId) return book;
    }

    return null;
}

function findBookIndex(bookId) {
    let index = 0;
    for (book of books) {
        if (book.id === bookId) return index;

        index++;
    }

    return -1;
}
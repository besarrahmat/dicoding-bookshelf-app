const UNFINISHED_BOOK_LIST = 'unfinishedBookshelfList';
const FINISHED_BOOK_LIST = 'finishedBookshelfList';
const BOOK_ID = 'bookId';

function addBook() {
    const unfinishedBookList = document.getElementById(UNFINISHED_BOOK_LIST);
    const finishedBookList = document.getElementById(FINISHED_BOOK_LIST);

    const bookTitle = document.getElementById('inputBookTitle').value;
    const bookAuthor = document.getElementById('inputBookAuthor').value;
    const bookYear = document.getElementById('inputBookYear').value;
    if (document.getElementById('inputBookIsFinished').checked) {
        isFinished = true;
    } else {
        isFinished = false;
    }

    const book = makeBookList(bookTitle, bookAuthor, bookYear, isFinished);
    const bookObject = composeBooksObject(bookTitle, bookAuthor, bookYear, isFinished);
    book[BOOK_ID] = bookObject.id;
    books.push(bookObject);
    if (isFinished) {
        finishedBookList.append(book);
        window.alert(bookTitle + ' dimasukkan ke rak "Selesai Dibaca".');
    } else {
        unfinishedBookList.append(book);
        window.alert(bookTitle + ' dimasukkan ke rak "Belum Selesai Dibaca".');
    }

    updateBook();
}

function makeBookList(title, author, year, isFinished) {
    const bookTitle = document.createElement('h3');
    bookTitle.innerText = title;
    const bookAuthor = document.createElement('p');
    bookAuthor.innerHTML = `Penulis: <span id="author">` + author + `</span>`;
    const bookYear = document.createElement('p');
    bookYear.innerHTML = `Tahun: <span id="year">` + year + `</span>`;

    const action = document.createElement('div');
    action.classList.add('action');

    if (isFinished) {
        action.append(createUndoButton(), createTrashButton());
    } else {
        action.append(createFinishButton(), createTrashButton());
    }

    const article = document.createElement('article');
    article.classList.add('book_item');
    article.append(bookTitle, bookAuthor, bookYear, action);

    return article;
}

function createButton(buttonTypeClass, innerText, eventListener) {
    const button = document.createElement('button');
    button.classList.add(buttonTypeClass);
    button.innerText = innerText;
    button.addEventListener('click', event => {
        eventListener(event);
    });

    return button;
}

function createFinishButton() {
    return createButton('green', 'Selesai dibaca', event => {
        addFinishedBook(event.target.parentElement);
    });
}

function createUndoButton() {
    return createButton('green', 'Belum selesai dibaca', event => {
        undoFinishedBook(event.target.parentElement);
    });
}

function createTrashButton() {
    return createButton('red', 'Hapus buku', event => {
        const confirm = window.confirm('Anda yakin menghapusnya?');
        if (confirm) removeFinishedBook(event.target.parentElement);
    });
}

function addFinishedBook(bookElement) {
    bookParent = bookElement.parentElement;
    const title = bookParent.querySelector('h3').innerText;
    const author = bookParent.querySelector('#author').innerText;
    const year = bookParent.querySelector('#year').innerText;

    const finishedBook = makeBookList(title, author, year, true);
    const finishedBookList = document.getElementById(FINISHED_BOOK_LIST);
    const book = findBook(bookParent[BOOK_ID]);
    book.isFinished = true;
    finishedBook[BOOK_ID] = book.id;

    finishedBookList.append(finishedBook);
    bookParent.remove();

    updateBook();
}

function undoFinishedBook(bookElement) {
    bookParent = bookElement.parentElement;
    const title = bookParent.querySelector('h3').innerText;
    const author = bookParent.querySelector('#author').innerText;
    const year = bookParent.querySelector('#year').innerText;

    const unfinishedBook = makeBookList(title, author, year, false);
    const unfinishedBookList = document.getElementById(UNFINISHED_BOOK_LIST);
    const book = findBook(bookParent[BOOK_ID]);
    book.isFinished = false;
    unfinishedBook[BOOK_ID] = book.id;

    unfinishedBookList.append(unfinishedBook);
    bookParent.remove();

    updateBook();
}

function removeFinishedBook(bookElement) {
    bookParent = bookElement.parentElement;

    const bookPosition = findBookIndex(bookParent[BOOK_ID]);
    books.splice(bookPosition, 1);
    bookParent.remove();

    updateBook();
}

function refreshBooks() {
    const listUnfinished = document.getElementById(UNFINISHED_BOOK_LIST);
    let listFinished = document.getElementById(FINISHED_BOOK_LIST);

    for (book of books) {
        const loadBook = makeBookList(book.title, book.author, book.year, book.isFinished);
        loadBook[BOOK_ID] = book.id;

        if (book.isFinished) {
            listFinished.append(loadBook);
        } else {
            listUnfinished.append(loadBook);
        }
    }
}
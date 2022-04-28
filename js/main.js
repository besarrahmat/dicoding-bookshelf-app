document.addEventListener('DOMContentLoaded', function() {
    const submitForm = document.getElementById('inputBook');

    submitForm.addEventListener('submit', (event) => {
        event.preventDefault();
        addBook();
    });

    if (isStorageExist()) loadBook();

    const links = document.querySelectorAll('ul li');
    const pages = document.querySelectorAll('.page');
    const allBtns = document.querySelectorAll('.close-btn');

    let selectedPageBtn = '';
    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function(event) {
            event.preventDefault();
            for (let i = 0; i < pages.length; i++) {
                pages[i].style.display = 'none';
            }
            pages[i].style.display = 'block';
            selectedPageBtn = i;
            document.querySelector('header').style.filter = 'blur(2px)';
        });
    }

    for (let i = 0; i < allBtns.length; i++) {
        allBtns[i].addEventListener('click', function() {
            allBtns[i].parentElement.style.display = 'none';
            document.querySelector('header').style.filter = 'blur(0px)';
        });
    }
});

document.addEventListener('ondatasaved', () => {
    console.log('Buku berhasil disimpan.');
});

document.addEventListener('ondataloaded', () => {
    refreshBooks();
});
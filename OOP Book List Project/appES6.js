class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this. author = author;
        this.isbn = isbn;
    }

}

class UI {
    addBookToList(book) {
        const list = document.getElementById('book-list');
    
        // Create tr element
        const row = document.createElement('tr');
        // Insert cols
        row.innerHTML = `
            <td>${book.title}<td>
            <td>${book.author}<td>
            <td>${book.isbn}<td>
            <td><a href=#" class="delete">X</a><td>
        `;

        list.appendChild(row);
    }

    showAlert(message, className) {
        // Create div
        const div = document.createElement('div');
        // Add classes
        div.className = `alert ${className}`;
        // Add text
        div.appendChild(document.createTextNode(message));
        // Get parent
        const container = document.querySelector('.container');
        // Get form
        const form = document.querySelector('#book-form');
        // Insert alert
        container.insertBefore(div, form);

        // Timeout after 3 secs
        setTimeout(function(){
            document.querySelector('.alert').remove()
        }, 3000);
    }

    deleteBook(target) {
        if(target.className === 'delete'){ 
            target.parentElement.parentElement.remove();
        }
    } 

    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

// Event Listener for add book
document.getElementById('book-form').addEventListener('submit', function(e){
    
    // Get form values
    const title = document.getElementById('title').value, 
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;

          //console.log(title, author, isbn);

    // Instantiating a book
    const book = new Book(title, author, isbn);
    
    // Instantiate UI
    const ui = new UI();
    console.log(ui);

    // Validate
    if(title === '' || author ==='' || isbn === '') {
        //alert('Failed');
        // Error alert
        ui.showAlert('Insert all fields', 'error');
    }
    else {
        // Add book to list
        ui.addBookToList(book);
        // console.log(book);

        // Show success
        ui.showAlert('Book Added', 'success');


        // Clear fields
        ui.clearFields();
    }

    e.preventDefault();
});

// Event listener for delete book
// koristim parenta
document.getElementById('book-list').addEventListener('click', function(e) {
    //console.log('123')
    // Instantiate UI
    const ui = new UI();

    // Delete book
    if(e.target.className === 'delete') {
        ui.deleteBook(e.target);

        // Show alert
        ui.showAlert('Book removed', 'success');
    }
    
    e.preventDefault();
});


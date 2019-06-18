class UI {
    constructor() {
        this.posts = document.querySelector('#posts');
        this.titleInput = document.querySelector('#title');
        this.bodyInput = document.querySelector('#body');
        this.idInput = document.querySelector('#id');
        this.postSubmit = document.querySelector('.post-submit');
        // formState?
        this.forState = 'add';
    }

    // show all posts
    showPosts(posts) {
        console.log(posts);
        let output = '';

        // data u okviru <a> sluzi da znam kom elementu pristupam
        posts.forEach((post) => {
            output += `
                <div class="card mb-3">
                    <div class="card-body">
                        <h4 class="card-title">${post.title}</h4>
                        <p class="card-text">${post.body}</p>
                        
                        <a href="#" class="edit card-link" data-id="${post.id}">
                            <i class="fa fa-pencil"></i>
                        </a>
                        <a href="#" class="delete card-link" data-id="${post.id}">
                            <i class="fa fa-remove"></i>
                        </a>
                    </div>
                </div>
            `;
        });

        this.posts.innerHTML = output;
    }

    // show alert
    showAlert(message, className){
        this.clearAlert();

        //create div
        const div = document.createElement('div');
        div.className = className;
        div.appendChild(document.createTextNode(message));
        // get parent
        const container = document.querySelector('.postContainer');
        // get posts div
        const posts = document.querySelector('#posts');
        // insert alert div
        container.insertBefore(div, posts);

        // timeout
        setTimeout(() => {
            this.clearAlert();
        }, 3000);

    }

    // clear alert
    clearAlert(){
        const currentAlert = document.querySelector('.alert');

        if(currentAlert){
            currentAlert.remove();
        }
    }

    // clear fields
    clearFields(){
        this.titleInput.value = '';
        this.bodyInput.value = '';
    }

    // Clear ID hidden value
    clearIdInput(){
        this.idInput.value = '';
    }

    // Fill form to edit
    fillForm(data) {
        this.titleInput.value = data.title;
        this.bodyInput.value = data.body;
        this.idInput.value = data.id;

        this.changeFormState('edit');
    }

    // Change form state
    changeFormState(type){
        if(type === 'edit'){
            this.postSubmit.textContent = 'Update Post';
            // className je citav skup klasa
            this.postSubmit.className = 'post-submin btn btn-warning btn-block';

            // Create cancel button
            const button = document.createElement('button');
            button.className = 'post-cancel btn btn-light btn-block';
            button.appendChild(document.createTextNode('Cancel Edit'));

            // Get Parent
            const cardForm = document.querySelector('.card-form');
            // Get element to insert before
            // ubacujemo pre spana form end (taj span je koristan za ovakva ubacivanja)
            const formEnd = document.querySelector('.form-end');
            // Insert cancel button
            cardForm.insertBefore(button, formEnd);
        }
        else {
            this.postSubmit.textContent = 'Post it';
            // className je citav skup klasa
            this.postSubmit.className = 'post-submin btn btn-primary btn-block';
            // Remove cancel button if is there
            if(document.querySelector('.post-cancel')){
                document.querySelector('.post-cancel').remove();
            }
            // Clear ID from hidden field
            this.clearIdInput();
            // Clear text
            this.clearFields();

        }
    }

}

export const ui = new UI();
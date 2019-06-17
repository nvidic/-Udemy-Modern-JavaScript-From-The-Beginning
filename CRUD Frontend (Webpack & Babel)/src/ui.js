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

    // Fill form to edit
    fillForm(data) {
        this.titleInput.value = data.title;
        this.bodyInput.value = data.body;
        this.idInput.value = data.id;
    }

}

export const ui = new UI();
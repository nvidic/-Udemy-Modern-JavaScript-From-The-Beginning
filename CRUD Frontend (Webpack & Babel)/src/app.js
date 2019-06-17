// common js module synthax
//const person = require('./mymodule1');

// es2015 module
//import { person, sayHello } from './mymodule2';


//import * as mod from './mymodule2';

// console.log(person.name);

//console.log(mod.sayHello());

// Nesto ne radi ovde
//import greeting from './mymodule2';
//console.log(greeting);

import {http} from './http';
import {ui} from './ui';

// Get Posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// Listen for add and edit post
document.querySelector('.post-submit').addEventListener('click', submitPost);

// Listen for delete
document.querySelector('#posts').addEventListener('click', deletePost);

// Listen for edit state
document.querySelector('#posts').addEventListener('click', enableEdit);

// Get posts
function getPosts(){
    // async & await vraca promise 
    http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
};

// Submit posts
function submitPost() {
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;

    const data = {
        title: title, 
        body: body
    }

    // Create post
    http.post('http://localhost:3000/posts', data)
    .then(data => {
        // nakon sto dodam post hocu da se prikaze
        ui.showAlert('Post added', 'alert alert-success');
        ui.clearFields();
        getPosts();
    })
    .catch(err => console.log(err))

}

// Delete post
function deletePost(e){


    e.preventDefault();

    if(e.target.parentElement.classList.contains('delete')){

        const id = e.target.parentElement.dataset.id;
        if(confirm('Are you sure?')){
            http.delete(`http://localhost:3000/posts/${id}`)
            .then(data => {
                ui.showAlert('Post removed', 'alert alert-success');
                getPosts();
            })
            .catch(err => console.log(err));
        }
    }    
}

// Enable edit state
function enableEdit(e) {
    if(e.target.parentElement.classList.contains('edit')){
        //console.log(e.target.parentElement.previousElementSibling.textContent);
        const id = e.target.parentElement.dataset.id;
        const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        const body = e.target.parentElement.previousElementSibling.textContent;

        //console.log(title);
        const data = {
            id,
            title,
            body
        }

        // Fill form with current post
        ui.fillForm(data);
    }
    
    
    e.preventDefault();

}

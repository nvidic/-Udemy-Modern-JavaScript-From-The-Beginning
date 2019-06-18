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


/* ******************************************* */
/* ***********   npm run build     *********** */
/* ******************************************* */
// Smesta sve u build folder 
// index.html, css folder i build folder su sve sto mi
// treba za produkciju


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

// Listen for cancel edit
document.querySelector('.card-form').addEventListener('click', cancelEdit);

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
    const id = document.querySelector('#id').value;

    // ne mora u else
    const data = {
        title: title, 
        body: body
    }

    // Validate input 
    if(title === '' || body === ''){
        ui.showAlert('Please fill in all fields', 'alert alert-danger');
    }
    else {
        // Check for ID
        // hidden ID nema vrednost za add, a ima za edit
        if(id === ''){
            // Create post
            http.post('http://localhost:3000/posts', data)
            .then(data => {
            // nakon sto dodam post hocu da se prikaze
            ui.showAlert('Post added', 'alert alert-success');
            ui.clearFields();
            getPosts();
        })
        .catch(err => console.log(err));

        }
        else {
            // Update post
             // Create post
            http.put(`http://localhost:3000/posts/${id}`, data)
            .then(data => {
            // nakon sto dodam post hocu da se prikaze
            ui.showAlert('Post updated', 'alert alert-success');
            ui.changeFormState('add');
            getPosts();
        })
        .catch(err => console.log(err));
        }

        
    
       
    }



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

// Cancel edit state
function cancelEdit(e){
    if(e.target.classList.contains('post-cancel')){
        ui.changeFormState('add');
    }
    e.preventDefault();
}

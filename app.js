// ------------ Add html -----------------

const divRow = document.createElement('div');
divRow.classList.add('row', 'mt-5');

const divList = document.createElement('div');
divList.classList.add('col', 'col-6', 'userList');

const ul = document.createElement('ul');
document.body.appendChild(divRow);
divRow.appendChild(divList);
divList.appendChild(ul);

const divInfo = document.createElement('div');
divInfo.classList.add('col', 'col-6', 'card', 'userInfo');
divRow.appendChild(divInfo);
divInfo.innerHTML = 'Please, select user to see details';

// -------------------- GET Request ------------------------

function makeGetRequest(method, url, cb) {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);

    xhr.addEventListener('load', () => {
        const resBody = JSON.parse(xhr.responseText);
        cb(resBody);
    });

    xhr.addEventListener('error', () => {
        console.log('error');
    });
    xhr.send();
}

makeGetRequest('GET', 'https://jsonplaceholder.typicode.com/users', res => {
    renderUsers(res);
});


//------------------------------ Create users list and user details--------------------------

function renderUsers(users) {

    users.forEach(user => {
        const li = document.createElement('li');
        li.classList.add('userName');
        li.textContent = user.name;
        ul.appendChild(li);

    });

    const getUserInfo = document.querySelector('.userInfo');

    const userLink = document.querySelector('.userList');
    userLink.addEventListener('click', event => {
        const {target} = event;
        if (target.classList.contains('userName')) {

            const user = users.find(user => user.name === target.textContent);

            if (user !== undefined) {
                console.log(user);
                let userBoxInfo = '<p> <b>Name:</b> ' + user.name + '</p>';
                userBoxInfo += '<p> Username: ' + user.username + '</p>';
                userBoxInfo += '<p> Email: ' + user.email + '</p>';
                userBoxInfo += '<p> Phone: ' + user.phone + '</p>';
                getUserInfo.innerHTML = userBoxInfo;
            }
        }
    });
}

// ----------------------- Create Post Request -----------------------

function makePostRequest(method, url, body, cb) {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.addEventListener('load', () => {
        const resBody = [JSON.parse(xhr.responseText)];
        cb(resBody);
    });

    xhr.addEventListener('error', () => {
        console.log('error');
    });
    xhr.send(JSON.stringify(body));
}


//--------------------- Create Add User Forms ----------------------

const form = document.forms['addUser'];
form.addEventListener("submit", onFormSubmitHandler);

const inputName = form.elements['name'];
const inputUsername = form.elements['username'];
const inputEmail = form.elements['email'];
const inputPhone = form.elements['phone'];

function onFormSubmitHandler(e) {
    e.preventDefault();

    const titleName = inputName.value;
    const titleUsername = inputUsername.value;
    const titleEmail = inputEmail.value;
    const titlePhone = inputPhone.value;
    if (!titleName || !titleUsername || !titlePhone || !titleEmail) {
        alert('Заполните все поля');
        return;
    }
    const newUser = {
        name: titleName,
        username: titleUsername,
        email: titleEmail,
        phone: titlePhone
    };

    makePostRequest('POST', 'https://jsonplaceholder.typicode.com/users', newUser, renderUsers);
    form.reset();
}

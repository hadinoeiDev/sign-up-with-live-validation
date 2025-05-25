const $ = document;
const bodyElem = $.body;
const ulELem = $.querySelector('.userListElem');

fetch('https://hadi-noei-sign-up-form-default-rtdb.firebaseio.com/users.json')
    .then(res => {
        console.log(res);
        return res.json();
    })
    .then(data => {
        
        let usersData = Object.entries(data);

        usersData.forEach(user => {
            ulELem.insertAdjacentHTML('beforeend',
                `<li class="newUserElem">
                    <div class="userIdBox">${user[1].id}</div>
                    <div class = "user-data">
                        <p class="newUserName"><span>${user[1].userFirstName} ${user[1].userLastName}</span></p>
                        <p class="newUserEmail">Email: <span>${user[1].userEmail}</span></p>
                        <p class="newUserPassword">password: <span>${user[1].userPassword}</span></p>
                    </div>
                    <div class = "buttons">
                        <button class="editButton">edit</button>
                        <button class="deleteButton">delete</button>
                    </div>
                </li>
                `
            );      
        });
    });

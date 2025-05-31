const $ = document;
const bodyElem = $.body;
const ulELem = $.querySelector('.userListElem');

fetch('https://hadi-noei-sign-up-form-default-rtdb.firebaseio.com/users.json')
    .then(res => {
        console.log(res);
        return res.json();
    })
    .then(data => {
        console.log(data);
        
        let usersData = Object.entries(data);

        usersData.forEach(user => {
            const userId = user[0]; // این ID اصلیه از Firebase
            const userInfo = user[1]; // این اطلاعات کاربره

            ulELem.insertAdjacentHTML('beforeend',
                `<li class="newUserElem">
                    <div class = "user-data">
                        <p class="newUserName"><span>${userInfo.userFirstName} ${userInfo.userLastName}</span></p>
                        <p class="newUserEmail">Email: <span>${userInfo.userEmail}</span></p>
                        <p class="newUserPassword">password: <span>${userInfo.userPassword}</span></p>
                        <p class="newUserId">ID:  <span>${userInfo.id}</span></p>
                    </div>
                    <div class = "buttons">
                        <button onclick='deleteBtn(event)' class="deleteButton" data-id="${userId}">delete</button>
                    </div>
                </li>
                `
            );      
        });
    });

const editContainer = $.querySelector('.editContainer');
const firstNmeEdit = $.querySelector('.firstNmeEdit');
const lastNmeEdit = $.querySelector('.lastNmeEdit');
const emailEdit = $.querySelector('.emailEdit');
const submitEdit = $.querySelector('.submitEdit');

let userIdToEdit = null;

function editBtn(event) {
    editContainer.style.display = 'flex';
    userIdToEdit = event.target.dataset.id;

    fetch(`https://hadi-noei-sign-up-form-default-rtdb.firebaseio.com/users/${userIdToEdit}.json`)
        .then(res => res.json())
        .then(userData => {
            // ذخیره پسورد قبلی
            oldPassword = userData.userPassword;
            // پر کردن فرم با اطلاعات کاربر
            firstNmeEdit.value = userData.userFirstName;
            lastNmeEdit.value = userData.userLastName;
            emailEdit.value = userData.userEmail;
        });


}

function submitEditBtn(event) {
    event.preventDefault();
    
    let editedData = {
        userFirstName: firstNmeEdit.value,
        userLastName: lastNmeEdit.value,
        userPassword: oldPassword,
        userEmail: emailEdit.value,
    }

    fetch(`https://hadi-noei-sign-up-form-default-rtdb.firebaseio.com/users/${userIdToEdit}.json`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedData)
    })
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data);

        })
    
    editContainer.style.display = 'none';
}

submitEdit.addEventListener('click',submitEditBtn);
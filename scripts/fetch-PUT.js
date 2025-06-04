const editContainer = $.querySelector('.editContainer');
const firstNmeEdit = $.querySelector('.firstNmeEdit');
const lastNmeEdit = $.querySelector('.lastNmeEdit');
const emailEdit = $.querySelector('.emailEdit');
const submitEdit = $.querySelector('.submitEdit');

const firstNameEditCheck = $.querySelector('#firstNameEditCheck');
const lastNameEditCheck = $.querySelector('#lastNameEditCheck');
const emailEditCheck = $.querySelector('#emailEditCheck');

let isFirstNameEditValid = false;
let isLastNameEditValid = false;
let isEmailEditValid = false;

let userIdToEdit = null;

function firstNameEditValidation() {
     let val = firstNmeEdit.value;

    const hasOnlyEnglishChars = /^[A-Za-z]+$/.test(val);

    if(val.trim() === '') {
        return isFirstNameEditValid = false;
    }
    
    if(hasOnlyEnglishChars) {
        isFirstNameEditValid = true;
        firstNameEditCheck.style.display = 'none';

    } else {
        isFirstNameEditValid = false;
        firstNameEditCheck.style.display = 'flex';
    }
}


function lastNameEditValidation() {
     let val = lastNmeEdit.value;

    const hasOnlyEnglishChars = /^[A-Za-z]+$/.test(val);

    if(val.trim() === '') {
        return isLastNameEditValid = false;
    }
    
    if(hasOnlyEnglishChars) {
        isLastNameEditValid = true;
        lastNameEditCheck.style.display = 'none';

    } else {
        isLastNameEditValid = false;
        lastNameEditCheck.style.display = 'flex';
    }
}


function emailEditValidation() {
    const val = emailEdit.value;  // اگر userPassword یعنی input ایمیله اوکیه

    const emailValidRegex = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo)\.com$/.test(val);

    const targetEmail = emailEdit.value; 

     
    if (val.trim() === '') {
        return isEmailEditValid = false;
    }
    
    fetch('https://hadi-noei-sign-up-form-default-rtdb.firebaseio.com/users.json')
        .then(res => {
            console.log(res);
            return res.json();
        })
        .then(data =>{
            let objData = Object.entries(data);

            let someUserEmail = objData.some(userData => {
                return userData[1].userEmail === targetEmail;
            });

            if(someUserEmail) {
                console.log('there is a same email');
                isEmailEditValid = false;
                emailEditCheck.style.color = 'red';
                emailEditCheck.textContent = "Enter a valid and unique email address.";
            }
        })
        .catch(err => {
            console.error(`data base is empty : ${err}`);
        })
        

    if(val.trim() === '') {
        isEmailEditValid = false;
        emailEditCheck.style.color = 'red';
        return;
    }

    emailEditCheck.style.display = "flex";
    
    if (emailValidRegex) {
        emailEditCheck.textContent = 'Valid email';
        emailEditCheck.style.color = '#00c500';
        isEmailEditValid = true;

    } else {
        emailEditCheck.textContent = "Enter a valid and unique email address!";
        emailEditCheck.style.color = 'red';
        isEmailEditValid = false;

    }
};


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

firstNmeEdit.addEventListener('input', firstNameEditValidation);
lastNmeEdit.addEventListener('input', lastNameEditValidation);
emailEdit.addEventListener('input', emailEditValidation);
submitEdit.addEventListener('click',submitEditBtn);
const editContainer = $.querySelector('.editContainer');
const firstNameEdit = $.querySelector('.firstNameEdit');
const lastNameEdit = $.querySelector('.lastNameEdit');
const emailEdit = $.querySelector('.emailEdit');
const submitEdit = $.querySelector('.submitBtn');

const firstNameEditCheck = $.querySelector('#firstNameEditCheck');
const lastNameEditCheck = $.querySelector('#lastNameEditCheck');
const emailEditCheck = $.querySelector('#emailEditCheck');
const submitCheck = $.querySelector('#submitEditCheck');


let isFirstNameEditValid = false;
let isLastNameEditValid = false;
let isEmailEditValid = false;

let userIdToEdit = null;

function firstNameEditValidation() {
     let val = firstNameEdit.value;

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
     let val = lastNameEdit.value;

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
        isEmailEditValid = false;
        emailEditCheck.style.color = 'red';
        return;
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

    });
    
    
}


function submitEditBtn(event) {
    event.preventDefault();

    let allValid = isFirstNameEditValid && isLastNameEditValid && isEmailEditValid ;
    
    console.log(isFirstNameEditValid, isLastNameEditValid, isEmailEditValid);
    
    if(allValid) {

        let editedData = {
            userFirstName: firstNameEdit.value,
            userLastName: lastNameEdit.value,
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
            autoCleanEdit();
            editContainer.style.display = 'none';
            location.reload();
            
        })

        

    } else {
        submitCheck.style.display = 'flex';
    }



}

function autoCleanEdit() {

    [firstNameEdit, lastNameEdit, emailEdit].forEach(para => {
        para.value = "";
    })  

    console.log(firstNameEditCheck, lastNameEditCheck, emailEditCheck, submitCheck);

    [firstNameEditCheck, lastNameEditCheck, emailEditCheck, submitCheck].forEach(para => {
        para.style.display = 'none';
    });
    
}

firstNameEdit.addEventListener('input', firstNameEditValidation);
lastNameEdit.addEventListener('input', lastNameEditValidation);
emailEdit.addEventListener('input', emailEditValidation);
submitEdit.addEventListener('click',submitEditBtn);

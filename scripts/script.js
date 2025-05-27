const $ = document;

const userFirstName = $.querySelector('#userFirstName');
const userLastName = $.querySelector('#userLastName');
const togglePassword = $.querySelector('#togglePassword');
const userPassword = $.querySelector('#userPassword');
const userEmail = $.querySelector('#userEmail');
const checkBox = $.querySelector("#terms");
const submit = $.querySelector('#submit');

// FirstName validation
const firstNameCheck = $.querySelector('#firstNameVal');

// lastName validation
const lastNameCheck = $.querySelector('#lastNameVal');

// password validation
const passwordRules = $.querySelector('.passwordRules');
const onlyEnglishCheck = $.querySelector('#onlyEnglish')
const lengthCheck = document.querySelector("#length");
const uppercaseCheck = document.querySelector("#uppercase");
const numberCheck = document.querySelector("#number");

// email validation
const emailRules = $.querySelector('.emailRules');
const emailCheck = $.querySelector('#emailVal');

// checkBox validation
const checkBoxCheck = $.querySelector('#checkBoxCheck');

// submit validation
const submitCheck = $.querySelector('#submit-validation');

// show and hide eyes

const hide = `
    <svg id="togglePass" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>`;

const show = 
    `<svg id="togglePass" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">            
    <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />             
    </svg>`;

let passwordFlag = false;

let isFirstNameIsValid = false;
let isLastNameIsValid = false;
let isPasswordValid = false;
let isEmailValid = false;
let isCheckBoxValid = false;

function LastNameValidation() {
    let val = userLastName.value;

    const hasOnlyEnglishChars = /^[A-Za-z]+$/.test(val);

    if(val.trim() === '') {
        isLastNameIsValid = false;
    }

    
    if(hasOnlyEnglishChars) {
        isLastNameIsValid = true;
        lastNameCheck.style.display = 'none';
    } else {
        isLastNameIsValid = false;
        lastNameCheck.style.display = 'flex';
    }
    
}


function FirstNameValidation() {
    let val = userFirstName.value;

    const hasOnlyEnglishChars = /^[A-Za-z]+$/.test(val);

    if(val.trim() === '') {
        isFirstNameIsValid = false;
    }

    
    if(hasOnlyEnglishChars) {
        isFirstNameIsValid = true;
        firstNameCheck.style.display = 'none';

    } else {
        isFirstNameIsValid = false;
        firstNameCheck.style.display = 'flex';
    }

    
}


function passwordValidation() {
    const val = userPassword.value;
    
    const hasOnlyEnglishChars = /^[\x00-\x7F]*$/.test(val);
    const hasUpperCase = /[A-Z]/.test(val);
    const hasNumber = /[0-9]/.test(val);
    
    if (val.trim() === '') {
        isPasswordValid = false;
    }

    [passwordRules, onlyEnglishCheck, lengthCheck, uppercaseCheck, numberCheck].forEach(para => {
        para.style.display = "flex";
    })
    
    onlyEnglishCheck.style.display = hasOnlyEnglishChars ? 'none' : 'flex';
    lengthCheck.style.color = val.length >= 8 ? '#00c500' : 'red';
    uppercaseCheck.style.color = hasUpperCase ? '#00c500' : 'red';
    numberCheck.style.color = hasNumber ? '#00c500' : 'red';

    if(val.length >= 8 && hasUpperCase && hasNumber && hasOnlyEnglishChars) {
        isPasswordValid = true;
        
    } else {
        isPasswordValid = false;

    }
   
}


function showHidePassword() {

    if(passwordFlag) {
    
        console.log(`password is hidden ${passwordFlag}`);
    
        userPassword.type= "password";
        togglePassword.innerHTML = hide;
    } else {
    
        console.log(`password is shown ${passwordFlag}`);
    
        userPassword.type = "text";
        togglePassword.innerHTML = show;
    }
    passwordFlag = !passwordFlag;

}


function emailValidation() {
    const val = userEmail.value;  // اگر userPassword یعنی input ایمیله اوکیه

    const emailValidRegex = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo)\.com$/.test(val);

     const targetEmail = userEmail.value; 

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
                isEmailValid = false;
                emailCheck.style.color = 'red';
                emailCheck.textContent = "Enter a valid and unique email address.";

            }

        });
        

    if(val.trim() === '') {
        isEmailValid = false;
        emailCheck.style.color = 'red';
        return;
    }

    [emailRules, emailCheck].forEach(para => {
        para.style.display = "flex";
    });

    if (emailValidRegex) {
        emailCheck.textContent = 'Valid email';
        emailCheck.style.color = '#00c500';
        isEmailValid = true;

    } else {
        emailCheck.textContent = "Enter a valid and unique email address!";
        emailCheck.style.color = 'red';
        isEmailValid = false;

    }
};


function checkBoxValidation() {

    if(checkBox.checked) {
        isCheckBoxValid = true;
    } else {
        isCheckBoxValid = false;
    }

};




userFirstName.addEventListener('input', FirstNameValidation);
userLastName.addEventListener('input', LastNameValidation);
userPassword.addEventListener('input', passwordValidation);
togglePassword.addEventListener('click', showHidePassword);
userEmail.addEventListener('input', emailValidation);
checkBox.addEventListener('input', checkBoxValidation);

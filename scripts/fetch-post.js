function postUserData(event) {

    event.preventDefault();
     
    // if user clicked submit before fill inputs , these conditions gonna run
   
    inputsConditions();

    // submitCheck validation conditions

    const allValid = isPasswordValid && isEmailValid && isCheckBoxValid && isFirstNameIsValid && isLastNameIsValid;
    
    const onlyPasswordInvalid = !isPasswordValid && isEmailValid && isCheckBoxValid && isFirstNameIsValid && isLastNameIsValid;

    const onlyEmailInvalid = isPasswordValid && !isEmailValid && isCheckBoxValid && isFirstNameIsValid && isLastNameIsValid;

    const onlyCheckBoxInvalid = isPasswordValid && isEmailValid && !isCheckBoxValid && isFirstNameIsValid && isLastNameIsValid;

     const onlyFirstNameInvalid = isPasswordValid && isEmailValid && isCheckBoxValid && !isFirstNameIsValid && isLastNameIsValid;

     const onlyLastNameInvalid = isPasswordValid && isEmailValid && isCheckBoxValid && isFirstNameIsValid && !isLastNameIsValid;
    
    const onlyOneFieldCorrect = 
    (isPasswordValid && !isEmailValid && !isCheckBoxValid && !isFirstNameIsValid && !isLastNameIsValid) ||
    (!isPasswordValid && isEmailValid && !isCheckBoxValid && !isFirstNameIsValid && !isLastNameIsValid) ||
    (!isPasswordValid && !isEmailValid && isCheckBoxValid && !isFirstNameIsValid && !isLastNameIsValid) ||
    (!isPasswordValid && !isEmailValid && !isCheckBoxValid && isFirstNameIsValid && !isLastNameIsValid) ||
    (!isPasswordValid && !isEmailValid && !isCheckBoxValid && !isFirstNameIsValid &  isLastNameIsValid);
  
    if (allValid) {
        console.log(allValid);
        
        const val = userPassword.value;

        submitCheck.textContent = 'Loading...'
        submitCheck.style.display = 'flex';
        submitCheck.style.color = '#00c500';
        
        let userData = {
            id: Math.floor(Math.random() * 1000000000),
            userFirstName: userFirstName.value,
            userLastName: userLastName.value,
            userPassword: userPassword.value,
            userEmail: userEmail.value,
        };
        
        console.log(userData);
        
        // testPassword(val); 

        fetch('https://hadi-noei-sign-up-form-default-rtdb.firebaseio.com/users.json', {
            method: 'POST',
            headers: {
            'content-type': 'application/json'
            },
            body: JSON.stringify(userData),
        })
        .then((res) => {
            autoClean();
            hideElements();

            inputsConditions();
            resetValidationUI();

        })
        .catch((error) => {
            console.error('Error:', error);
        })
        
        
    } else if(onlyPasswordInvalid) {
        submitCheck.style.display = 'flex';
        submitCheck.style.color = 'red';
        submitCheck.textContent = 'Make sure your password is correct!';
        
    } else if(onlyEmailInvalid) {
        submitCheck.style.display = 'flex';
        submitCheck.style.color = 'red';
        submitCheck.textContent = 'Make sure your email is correct!'; 

    } else if (onlyCheckBoxInvalid){
        submitCheck.style.display = 'flex';
        submitCheck.style.color = 'red';
        submitCheck.textContent = `you have to agree with term's and conditions first!`;    

    } else if (onlyOneFieldCorrect) {

        submitCheck.style.display = 'flex';
        submitCheck.style.color = 'red';
        submitCheck.textContent = `Only one field is correct! Please fill out all fields properly.`;
    
    } else if (onlyFirstNameInvalid) {

        submitCheck.style.display = 'flex';
        submitCheck.style.color = 'red';
        submitCheck.textContent = 'Make sure your first name is correct!'; 
    
    } else if (onlyLastNameInvalid) {

        submitCheck.style.display = 'flex';
        submitCheck.style.color = 'red';
        submitCheck.textContent = 'Make sure your last name is correct!'; 
    
    } else {
        submitCheck.style.display = 'flex';
        submitCheck.style.color = 'red';
        submitCheck.textContent = `Make sure all field's are correct!`;
    }

};


function autoClean() {
    userFirstName.value = "";
    userLastName.value = "";
    togglePassword.value = "";
    userPassword.value = "";
    userEmail.value = "";
    checkBox.checked = false;
    
    submitCheck.textContent = 'done';

}

function hideElements() {

    const hideElements = [
        passwordRules, onlyEnglishCheck, lengthCheck,
        uppercaseCheck, numberCheck, emailRules, emailCheck
    ];
    
    hideElements.forEach(el => el.style.display = 'none');

    setTimeout(() => {
        submitCheck.style.display = 'none';
    }, 1000);

    userPassword.type= "password";
    togglePassword.innerHTML = hide;

}

function inputsConditions() {

    if (!isFirstNameIsValid) {
        firstNameCheck.style.display = 'flex';
    } 
    
    if (!isLastNameIsValid) {
        lastNameCheck.style.display = 'flex';
    } 
    
    if (!isPasswordValid) {
        [passwordRules ,onlyEnglishCheck ,lengthCheck ,uppercaseCheck ,numberCheck].forEach(para => {
            para.style.display = 'flex';
        })
    } 
    
    if (!isEmailValid) {
        emailCheck.textContent = 'Invalid email';
        
        [emailRules, emailCheck].forEach(para => {
            para.style.display = 'flex';
        })
    }
    
    if (!isCheckBoxValid) {
        checkBoxCheck.style.display = 'flex';
        
    } else {
        checkBoxCheck.style.display = 'none';
        
    }
}

function resetValidationUI() {
    isFirstNameIsValid = false;
    isLastNameIsValid = false;
    isPasswordValid = false;
    isEmailValid = false;
    isCheckBoxValid = false;

    [passwordRules ,onlyEnglishCheck ,lengthCheck ,uppercaseCheck ,numberCheck].forEach(para => {
        para.style.color = 'red';
    });

    [emailRules, emailCheck].forEach(para => {
        para.style.color = 'red';
    });
}

submit.addEventListener('click', postUserData);

fetch('https://hadi-noei-sign-up-form-default-rtdb.firebaseio.com/users.json')
    .then(res => {
        console.log(res);
        return res.json();
    })
    .then(usersData => {
        console.log(usersData);
    })
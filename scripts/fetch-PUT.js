const editContainer = $.querySelector('.editContainer');
const firstNmeEdit = $.querySelector('.firstNmeEdit');
const lastNmeEdit = $.querySelector('.lastNmeEdit');
const passwordEdit = $.querySelector('.passwordEdit');
const emailEdit = $.querySelector('.emailEdit');
const submitEdit = $.querySelector('.submitEdit');

function editBtn() {
    editContainer.style.display = 'flex';
}

function submitEditBtn(event) {
    event.preventDefault();
    console.log(event.target.parentElement.parentElement);

    const userId = event.target.dataset.id;
    
    

    let editedData = {
            id: userId,
            userFirstName: firstNmeEdit.value,
            userLastName: lastNmeEdit.value,

    }
    fetch(`https://hadi-noei-sign-up-form-default-rtdb.firebaseio.com/users/${userId}.json`, {
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
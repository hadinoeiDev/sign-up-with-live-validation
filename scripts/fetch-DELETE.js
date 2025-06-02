function deleteBtn(event) {

    // remove from dom

    let getParentElm = event.target.parentElement.parentElement;
    getParentElm.remove();

    // remove from fireBase

    const userId = event.target.dataset.id;

    fetch(`https://hadi-noei-sign-up-form-default-rtdb.firebaseio.com/users/${userId}.json`, {
        method: 'DELETE'
    })
        .then(res => {
            return res.json();    
        })
        .then(data => {
        })

    
}  

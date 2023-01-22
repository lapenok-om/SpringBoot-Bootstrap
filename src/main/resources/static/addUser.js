const nameNew = document.getElementById('firstNameNew');
const lastnameNew = document.getElementById('lastNameNew');
const ageNew = document.getElementById('ageNew');
const emailNew= document.getElementById('emailNew');
const passwordNew = document.getElementById('passwordNew');
const formAdd = document.getElementById('formAdd');

formAdd.onsubmit = async (e) => {
    e.preventDefault();

    let arrayAdd = [];
    let optionsAdd = document.querySelector('#rolesNew').options;
    for (let i = 0; i < optionsAdd.length; i++) {
        if (optionsAdd[i].selected) {
            arrayAdd.push(roleList[i])
        }
    }

    let response = await fetch('http://localhost:8080/api/user',{
        method: 'POST',
        body: JSON.stringify({
            firstname: nameNew.value,
            lastname: lastnameNew.value,
            age: ageNew.value,
            email: emailNew.value,
            password: passwordNew.value,
            roles: arrayAdd
        }),
        headers: {
            'Content-type': 'application/json'
        }}).catch(err => console.log(err));

    if(response.ok) {
        showUsers();
    }
    formAdd.reset();
    document.getElementById('nav-home-tab').click();
};

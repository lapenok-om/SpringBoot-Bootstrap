let roleList = [
    {id: 1, name: "ROLE_USER"},
    {id: 2, name: "ROLE_ADMIN"}
]

const idUser = document.getElementById('idEdit');
const nameUser = document.getElementById('firstNameEdit');
const lastnameUser = document.getElementById('lastNameEdit');
const ageUser = document.getElementById('ageEdit');
const emailUser= document.getElementById('emailEdit');
const passwordUser = document.getElementById('passwordEdit');

function edit(id) {
    fetch(`http://localhost:8080/api/user/${id}`).then(res => res.json())
        .then(user => {
            idUser.value = `${user.id}`;
            nameUser.value = `${user.firstname}`;
            lastnameUser.value = `${user.lastname}`;
            ageUser.value = `${user.age}`;
            emailUser.value = `${user.email}`;
            passwordUser.value = `${user.password}`;
        }).catch(err => console.log(err))
}


const formEdit = document.getElementById('formEdit');

formEdit.onsubmit = async (e) => {
    e.preventDefault();

    let array = [];
    let options = document.querySelector('#rolesEdit').options;
    console.log('11111');
    for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
            array.push(roleList[i])

        }
    }


    let response = await fetch('http://localhost:8080/api/user',{
        method: 'PUT',
        body: JSON.stringify({
            id: idUser.value,
            firstname: nameUser.value,
            lastname: lastnameUser.value,
            age: ageUser.value,
            email: emailUser.value,
            password: passwordUser.value,
            roles: array
        }),
        headers: {
            'Content-type': 'application/json'
        }}).catch(err => console.log(err));

    if(response.ok) {
        showUsers();
    }

    const modal = document.getElementById('EditModal');
    const modalInstance = bootstrap.Modal.getInstance(modal);
    modalInstance.hide();
};

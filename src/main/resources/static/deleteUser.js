const idUserDel = document.getElementById('id');
const nameUserDel = document.getElementById('firstName');
const lastnameUserDel = document.getElementById('lastName');
const ageUserDel = document.getElementById('age');
const emailUserDel= document.getElementById('email');


function deleteUser(id) {
    fetch(`http://localhost:8080/api/user/${id}`).then(res => res.json())
        .then(user => {
            idUserDel.value = `${user.id}`;
            nameUserDel.value = `${user.firstname}`;
            lastnameUserDel.value = `${user.lastname}`;
            ageUserDel.value = `${user.age}`;
            emailUserDel.value = `${user.email}`;
        }).catch(err => console.log(err))
}

const formDelete = document.getElementById('formDelete');

formDelete.onsubmit = async (e) => {
    e.preventDefault();

    let response = await fetch(`http://localhost:8080/api/user/${idUserDel.value}`,{
        method: 'DELETE'}).catch(err => console.log(err));

    if(response.ok) {
        showUsers();
    }

    const modal = document.getElementById('DeleteModal');
    const modalInstance = bootstrap.Modal.getInstance(modal);
    modalInstance.hide();
};
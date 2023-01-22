function showUsers() {

    const infoUsers = document.getElementById("allUsers");
    let temp1 = "";
    fetch("http://localhost:8080/api/users").then(res => res.json())
        .then(users => {
            users.map(user => {
                let roles = [];
                for (let role of user.roles) {
                    roles.push(" " + role.name.replace("ROLE_", ""));
                }
                temp1 += `<tr>
        <td>${user.id}</td>
        <td>${user.firstname}</td>
        <td>${user.lastname}</td>
        <td>${user.age}</td>
        <td>${user.email}</td>
        <td>${roles}</td>
        <td><button class="btn btn-info text-light" data-bs-toggle="modal" data-bs-target="#EditModal" onclick="edit(${user.id})" >Edit</button></td>
        <td><button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#DeleteModal" onclick="deleteUser(${user.id})">Delete</button></td>
        </tr>`;
            })
            infoUsers.innerHTML = temp1;
        }).catch(err => console.log(err));
}

showUsers();






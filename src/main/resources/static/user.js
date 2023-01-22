function aboutMe() {

    let temp = " ";
    const info = document.getElementById("userInfo");

    fetch("http://localhost:8080/api/user").then(res => res.json())
        .then((user) => {
            let roles = [];
            for (let role of user.roles) {
                roles.push(" " + role.name.replace("ROLE_", ""));
            }
            temp += `<tr>
        <td>${user.id}</td>
        <td>${user.firstname}</td>
        <td>${user.lastname}</td>
        <td>${user.age}</td>
        <td>${user.email}</td>
        <td>${roles}</td>
        </tr>`;

            info.innerHTML = temp;
        }).catch(err => console.log(err));
}

aboutMe();
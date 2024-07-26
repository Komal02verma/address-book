document.addEventListener("DOMContentLoaded", function () {
  let form = document.getElementById("form");
  let nameF = document.getElementById("firstName");
  let nameL = document.getElementById("lastName");
  let contact = document.getElementById("contact");
  let emailId = document.getElementById("emailId");
  let user = document.getElementById("userInfo");
  let data = JSON.parse(localStorage.getItem("data")) || [];

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
  });

  function formValidation() {
    if (nameF.value === "" || nameL.value === "" || contact.value === "" || emailId.value === "") {
      console.log("failure");
    } else {
      console.log("success");
      acceptData();
    }
  }

  function acceptData() {
    data.push({
      nameF: nameF.value,
      nameL: nameL.value,
      contact: contact.value,
      emailId: emailId.value,
    });

    localStorage.setItem("data", JSON.stringify(data));
    createUsers();
    resetForm();
  }

  function createUsers() {
    user.innerHTML = "";
    data.forEach((x, y) => {
      user.innerHTML += `
        <tr>
          <td>${y + 1}</td>
          <td>${x.nameF}</td>
          <td>${x.nameL}</td>
          <td>${x.contact}</td>
          <td>${x.emailId}</td>
          <td>
            <button class="btn btn-md text-success fw-2" onclick="editUser(${y})"><i class="bi bi-pencil-square"></i></button>
            <button class="btn btn-md text-danger fw-2" onclick="deleteUser(${y})"><i class="bi bi-trash3-fill"></i></button>
          </td>
        </tr>
      `;
    });
  }

  function resetForm() {
    nameF.value = "";
    nameL.value = "";
    contact.value = "";
    emailId.value = "";
  }

  window.editUser = function (index) {
    let selectedUser = data[index];
    nameF.value = selectedUser.nameF;
    nameL.value = selectedUser.nameL;
    contact.value = selectedUser.contact;
    emailId.value = selectedUser.emailId;

    deleteUser(index);
  };

  window.deleteUser = function (index) {
    data.splice(index, 1);
    localStorage.setItem("data", JSON.stringify(data));
    createUsers();
  };

  // Initial render
  createUsers();
});

document.getElementById("myInput").addEventListener("input", function() {
  let input = document.getElementById("myInput");
  let filter = input.value.toUpperCase();
  let tbody = document.getElementById("userInfo");
  let tr = tbody.getElementsByTagName("tr");

  for (let i = 0; i < tr.length; i++) {
    let tds = tr[i].getElementsByTagName("td");
    let rowText = "";
    for (let j = 0; j < tds.length; j++) {
      rowText += tds[j].textContent || tds[j].innerText;
    }
    if (rowText.toUpperCase().indexOf(filter) > -1) {
      tr[i].style.display = "";
    } else {
      tr[i].style.display = "none";
    }
  }
});
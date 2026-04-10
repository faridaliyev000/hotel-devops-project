const nameContact = document.getElementById("nameContact")
const emailContact = document.getElementById("emailContact")
const Message = document.getElementById("message")
const TableBody = document.getElementById("tableBody")

// Buttons
const sendBtnForm = document.getElementById("sendBtn")
const clearAll = document.getElementById("clearAll")
const sortByNameSelect = document.getElementById("sort-by-name")
const searchInp = document.getElementById("searchInp")


// events
nameContact.addEventListener('keyup', () => {
    checkValidation(nameContact.value, emailContact.value, Message.value)
})
emailContact.addEventListener('keyup', () => {
    checkValidation(nameContact.value, emailContact.value, Message.value)
})
Message.addEventListener('keyup', () => {
    checkValidation(nameContact.value, emailContact.value, Message.value)
})
searchInp.addEventListener("keyup", function () {
    search(this.value);
  });

sendBtnForm.addEventListener('click', (e) => {
    // console.log("test");
    e.preventDefault()
    addForm(nameContact.value, emailContact.value, Message.value)
})

clearAll.addEventListener('click', () => {
    clearAllfunction();
})
sortByNameSelect.addEventListener('change', function () {
    sortByDate(this.value);
})

// Created Class
class contactForms {
    isCompleted;
    static id = 1;
    constructor(name, email, message) {
        this.name = name;
        this.email = email;
        this.isCompleted = false;
        this.id = contactForms.id++
        this.message = message
    }
}

let formArry = [];

// Functions
function checkValidation(name, email, message) {
    if (name.trim().length === 0 || email.trim().length === 0 || message.trim().length === 0) {
        sendBtnForm.style.backgroundColor = "indianred";
        sendBtnForm.setAttribute("disabled", true);
        return false;
    } else {
        sendBtnForm.style.backgroundColor = "#00917c";
        sendBtnForm.removeAttribute("disabled");
        return true;
    }
}

function resetForm() {
    nameContact.value = "";
    emailContact.value = "";
    Message.value = "";
}

function clearAllfunction() {
    Swal.fire({
        title: "Are you sure to delete all?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
    }).then((result) => {
        if (result.isConfirmed) {
            formArry = [];
            renderForms(formArry);
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
            });
        }
    });
}
function deleteTodo(id) {
    const idx = formArry.findIndex((x) => x.id == id);
    formArry.splice(idx, 1);
    renderForms(formArry);
}
function markAsDone(id) {
    const found = formArry.find((x) => x.id == id);
    found.isCompleted = !found.isCompleted;
    console.log(found.isCompleted);
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Message succesful marks",
        showConfirmButton: false,
        timer: 1000,
    });
    renderForms(formArry);
}
function addForm(name, email, message) {
    if (checkValidation(name, email, message)) {
        const newItem = new contactForms(name, email, message)
        formArry.push(newItem)
        resetForm();
        renderForms(formArry);
        Swal.fire({
            position: "bottom-end",
            icon: "success",
            title: "Message Added Successfully",
            showConfirmButton: false,
            timer: 700,
        });
    } else {
        Swal.fire({
            position: "bottom-end",
            icon: "error",
            title: "Validation Failed",
            showConfirmButton: false,
            timer: 700,
        });
    }
}

function renderForms(arr) {
    TableBody.innerHTML = ''

    arr.forEach(formItem => {
        TableBody.innerHTML += `
        <tr>
                                <td style='background-color: ${formItem.isCompleted ? "red" : "white"}'>${formItem.name}</td>
                                <td style='background-color: ${formItem.isCompleted ? "red" : "white"}'>${formItem.email}</td>
                                <td style='background-color: ${formItem.isCompleted ? "red" : "white"}'>${formItem.message}</td>
                                <td style='background-color: ${formItem.isCompleted ? "red" : "white"}' class="buttons">
                                    <button class="delete-btn" data-id="${formItem.id}" class="btn  text-white">Del</button>
                                    <button class="mark-btn" data-id="${formItem.id}" class="btn  text-white">Mark</button>
                                </td>
                                </tr>
        `
    });
    const deleteBtns = document.querySelectorAll(".delete-btn");
    deleteBtns.forEach((deleteBtn) => {
        deleteBtn.addEventListener("click", function () {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            }).then((result) => {
                if (result.isConfirmed) {
                    const id = this.getAttribute("data-id");
                    deleteTodo(id);
                    //this.closest('li').remove();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success",
                    });
                }
            });
        });
    });
    const markBtns = document.querySelectorAll(".mark-btn");
    markBtns.forEach((markBtn) => {
        markBtn.addEventListener("click", function () {
            // console.log(markBtn);
            // console.log(this.getAttribute("data-id"));
            markAsDone(this.getAttribute("data-id"));
        });
    });
}
function search(value) {
    const searchedForms = formArry.filter((x) =>
      x.name.trim().toLowerCase().includes(value.trim().toLowerCase())
    );
    if (searchedForms.length == 0) {
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Not Find any Data",
            showConfirmButton: false,
            timer: 500,
        });
        renderForms(searchedForms);
    }
    else{
        renderForms(searchedForms);
    }
  }
function sortByDate(value) {
    if (value == "a-z") {
        let temp = [...formArry];
        temp = temp.sort((x, y) => x.name.localeCompare(y.name));
        renderForms(temp);
    } else if (value == "z-a") {
        let temp = [...formArry];
        temp = temp.sort((x, y) => y.name.localeCompare(x.name));
        renderForms(temp);
    }
}

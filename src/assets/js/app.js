const userList = document.getElementById('user_list');
const userItems = userList.querySelectorAll('.user_list--item');

function addUserItem(event) {
    event.preventDefault();
    let name = inputName.value.trim();
    let tel = inputTel.value;

    if (check && name !== '' && tel !== '') {
        userList.innerHTML += `<li class="user_list--item">
    <label class="title">${name}</label>
    <input class="textfield" type="text">
    <button class="edit">редактировать</button>
    <button class="delete">удалить</button>
</li>
<li class="user_list--item">
    <label class="title">${tel}</label>
    <input class="textfield" type="tel">
    <button class="edit">редактировать</button>
    <button class="delete">удалить</button>
</li>
<hr>`

        inputName.classList.remove('invalid');
        inputName.classList.remove('valid');
        inputTel.classList.remove('invalid');
        inputTel.classList.remove('valid');
        userForm.classList.remove('invalid');
        inputName.value = '';
        inputTel.value = '';
        const userItem = userList.querySelectorAll('.user_list--item');
        userItem.forEach(item => bindEvents(item));
    } else {
        userForm.classList.add('invalid');
        userForm.querySelector('.alarm').textContent = 'Пожалуйста, правильно заполните форму'
    }
}


const userForm = document.getElementById('user_form');

const inputName = userForm.querySelector('#input_name');
const inputTel = userForm.querySelector('#input_tel');
const btnAdd = userForm.querySelector('#btn_add');
const inpRule = userForm.querySelectorAll('input[data-rule]');


let check; // регулярное выражение

// проверка
for (let input of inpRule) {
    input.addEventListener('blur', function () {
        let rule = this.dataset.rule;
        let value = this.value;

        switch (rule) {
            case 'name':
                check = /\D/.test(value);
                break;
            case 'number':
                check = /^[\+|\-]?\d+$/.test(value);
                break;
        }

        this.classList.remove('invalid');
        this.classList.remove('valid');

        if (check) {
            this.classList.add('valid');
        } else {
            this.classList.add('invalid');
        }
    })
}

// функция удаляет предупреждения не валидного заполнения формы userForm
function notAlarm() {
    this.classList.remove('invalid');
    this.classList.remove('valid');
    userForm.classList.remove('invalid');
    userForm.querySelector('.alarm').textContent = '';
}

inpRule.forEach(e => e.onclick = notAlarm) // удаление предупреждений



//
function bindEvents(btnItem) {
    const editButton = btnItem.querySelector('.edit');
    const deleteButton = btnItem.querySelector('.delete');

    editButton.addEventListener('click', editUserItem);
    deleteButton.addEventListener('click', deleteUserItem);
}

function editUserItem() {
    const userItem = this.parentNode;
    const title = userItem.querySelector('.title');
    const editInput = userItem.querySelector('.textfield');
    const isEditing = userItem.classList.contains('editing');

    if (isEditing) {
        title.innerText = editInput.value;
        this.innerText = 'редактировать';
    } else {
        editInput.value = title.innerText;
        this.innerText = 'сохранить';
    }

    userItem.classList.toggle('editing');
}

function deleteUserItem() {
    const userItem = this.parentNode;
    userList.removeChild(userItem);
}


function main() {
    userItems.forEach(item => bindEvents(item));
    btnAdd.addEventListener('click', addUserItem);
}

main();
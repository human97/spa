const userList = document.getElementById('user_list');
const userItems = userList.querySelectorAll('.user_list--item');
const inpRule = document.querySelectorAll('input[data-rule]'); // получил все input data-rule
let check; // регулярное выражение

// проверка
function validation() {
    let rule = this.dataset.rule;
    let value = this.value;

    switch (rule) {
        case 'name':
            check = /\D/.test(value); // регулярка для имени
            break;
        case 'number':
            check = /^[\+|\-]?\d+$/.test(value); // регулфрка для номера
            break;
    }

    this.classList.remove('invalid');
    this.classList.remove('valid');

    if (check) {
        this.classList.add('valid');
    } else {
        this.classList.add('invalid');
    }
}


for (let input of inpRule) {
    input.addEventListener('blur', validation)
}


function addUserItem(event) {
    event.preventDefault();
    let name = inputName.value.trim();
    let tel = inputTel.value.trim();

    if (check && name !== '' && tel !== '') {
        userList.innerHTML += `<li class="user_list--item">
    <label class="title">${name}</label>
    <input class="textfield" type="text" data-rule='name' placeholder="пример: Иван">
    <button class="edit">редактировать</button>
    <button class="delete">удалить</button>
</li>
<li class="user_list--item">
    <label class="title">${tel}</label>
    <input class="textfield" type="tel" data-rule='number' placeholder="пример: +79991234567">
    <button class="edit">редактировать</button>
    <button class="delete">удалить</button>
</li>`

        // проверка
        const inpRule = document.querySelectorAll('input[data-rule]'); // получил все input data-rule

        for (let input of inpRule) {
            input.addEventListener('blur', validation)
        }

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
    let name = editInput.value.trim();



    if (isEditing) {
        if (check && name !== '') {
            title.innerText = editInput.value;
        }
        this.innerText = 'редактировать';
    } else {
        editInput.classList.remove('invalid');
        editInput.classList.remove('valid');
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
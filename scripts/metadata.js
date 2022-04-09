const teacher_list = fetch("./resource/2022/teacher-list.json")
    .then((res) => { return res.json(); });

function populateSelect() {
    var professorSelect = document.getElementById("professor");
    teacher_list
        .then((items) => {
            items.forEach(item => {
                var option = document.createElement("option");
                option.value = item['name'];
                option.innerHTML = item['name'];
                professorSelect.appendChild(option);
            });
        });
}

function refresh() {
    var spinner = document.querySelector('.loader');
    spinner.classList.add('spin');
}

populateSelect();
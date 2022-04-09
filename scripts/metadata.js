
const teacher_JSON = fetch("./resource/2022/teacher-list.json")
    .then((res) => { return res.json(); });

function populateSelect() {
    var professorSelect = document.getElementById("professor");
    teacher_JSON
        .then((items) => {
            items.forEach(item => {
                var option = document.createElement("option");
                option.value = item['name'];
                option.innerHTML = item['name'];
                professorSelect.appendChild(option);
            });
        });
}

populateSelect();

function refresh() {
    var spinner = document.querySelector('.loader');
    spinner.classList.add('spin');
}
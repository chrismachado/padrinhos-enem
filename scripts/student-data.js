const dataTable = document.getElementById("studentDataShowerBody");
const loadingDiv = document.getElementById("loading");
const studentSelect = document.getElementById("student");
const cursoSelect = document.getElementById("curso-select");
const linkToJson = 'https://opensheet.elk.sh/1cPNP7961gcQDJds6H6fpVKdC3qbc8sOieHB4akdiiXY/resposta';
let all_names = [];
let all_course_select = [];


async function populateStudentNames() {
    dataTable.innerHTML = '';
    document.getElementById('loader').style.display = 'block';
    refresh();
    const data = await fetch(linkToJson)
        .then((res) => { return res.json(); })
        .then((res) => { return populateLists(res); })
        .then(() => { return filterByCourse() })
        .then((res) => { return fillSelectWithNames(res) });
    const loader = await document.getElementById('loader');
    loader.style.display = "none";

}

function populateLists(info) {
    info.forEach(e => {
        all_names.push(e['Informe seu nome completo.']);
        all_course_select.push(e['Informe o seu curso.']);
    });
    return info;
}

function fillSelectWithNames(data) {
    studentSelect.innerHTML = '';
    var option = document.createElement("option");
    option.value = 'not-selected';
    option.innerHTML = "Selecione uma opção";
    studentSelect.appendChild(option);
    data.sort((a, b) => {
        return (a.toUpperCase() < b.toUpperCase() ? -1 : 1);
    });
    data.forEach(item => {
        var option = document.createElement("option");
        option.value = item;
        option.innerHTML = item.toUpperCase();
        studentSelect.appendChild(option);
    });
    return data;
}

function filterByCourse() {
    dataTable.innerHTML = '';

    let newData = [];
    const currentCourse = cursoSelect.value;
    for (let i = 0; i < all_course_select.length; i++) {
        if (currentCourse === all_course_select[i]) {
            if (!newData.includes(all_names[i])) {
                newData.push(all_names[i]);
            }
        }
    }
    return newData;
}

async function loadDataForFill() {
    dataTable.innerHTML = '';
    document.getElementById('loader').style.display = 'block';
    refresh();

    const data = await fetch(linkToJson)
        .then(res => { return res.json(); })
        .then(res => { return filterStudentSelection(res) });
    const loader = await document.getElementById('loader');
    loader.style.display = "none";

    fillTable(data);

}

function fillTable(data) {
    dataTable.innerHTML = '';
    keys = ["Carimbo de data/hora", "Informe sua matrícula de acesso ao Aluno Online.", "Primeira opção", "Segunda opção", "Terceira opção", "Quarta opção", "Quinta opção", "Sexta opção"];

    if (data.length === 0) {
        let newRow = dataTable.insertRow(), cellColspan = newRow.insertCell(0);
        cellColspan.id = "fullyColspan";
        document.getElementById("fullyColspan").colSpan = "8";
        cellColspan.innerText = "Nenhum resultado encontrado.";
        return
    }

    data.forEach((items) => {
        let newRow = dataTable.insertRow(), i = 0;
        for (key of keys) {
            newRow.insertCell(i).innerHTML = items[key].toUpperCase();
            i++;
        }
    });
}

function filterStudentSelection(data) {
    const currentSelectedName = studentSelect.value;
    const choices = []
    data.forEach(item => {
        if (currentSelectedName == item["Informe seu nome completo."]) {
            choices.push(item);
        }
    });
    return choices;
}

function refresh() {
    var spinner = document.querySelector('.loader');
    spinner.classList.add('spin');
}

function sortByKey(data, key) {
    return data.sort(function (a, b) {
        return ((a[key] < b[key]) ? 1 : ((a[key] > b[key]) ? -1 : 0));
    });
}

populateStudentNames();
cursoSelect.onchange = populateStudentNames;
studentSelect.onchange = loadDataForFill;

const dataTable = document.getElementById("dataShowerBody");
const loadingDiv = document.getElementById("loading");
const professorSelect = document.getElementById("professor");
const sortSelect = document.getElementById("sort-select");
const flexCheck = document.getElementById("flexCheck");
const countProfessor = document.getElementById("countProfessor");
const spanAccepted = '<span class="glyphicon glyphicon-ok text-success"></span>';
const spanDenied = '<span class="glyphicon glyphicon-minus"></span>';
const linkToJson = 'https://opensheet.elk.sh/1uhSniGStxjzYqFRI9InX0shdclQFX8oWMZZq2G90O1s/A1:Z14989';

async function loadData() {
    dataTable.innerHTML = '';
    let match = professorSelect.value
    document.getElementById('loader').style.display = 'block';
    refresh();
    const data = await fetch(linkToJson)
        .then((res) => {
            return res.json();
        }).catch((err) => {
            alert("Um erro inesperado ocorreu, tente novamente em alguns instantes.");
        });
    const loader = await document.getElementById('loader');
    loader.style.display = "none";

    let newData = filterSSData(match, data);
    newData = filterDataByOption(newData, sortSelect.value);
    fillTable(sortByKey(newData, sortSelect.value));
    statistics(newData);
}

function fillTable(data) {
    dataTable.innerHTML = '';

    if (data.length === 0) {
        let newRow = dataTable.insertRow(), cellColspan = newRow.insertCell(0);
        cellColspan.id = "fullyColspan";
        document.getElementById("fullyColspan").colSpan = "8";
        cellColspan.innerText = "Nenhum resultado encontrado.";
        return
    }

    data.forEach((items) => {
        let newRow = dataTable.insertRow(), i = 0;
        for (const [key, value] of Object.entries(items)) {
            newRow.insertCell(i).innerHTML = value.toUpperCase();
            i++;
        }
    });
}

function filterSSData(match, data) {
    let newData = [];

    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        let newItem = { nome: '', curso: '', primeira: spanDenied, segunda: spanDenied, terceira: spanDenied, quarta: spanDenied, quinta: spanDenied, sexta: spanDenied };

        newItem['nome'] = item["Informe seu nome completo."];
        newItem['curso'] = item["Informe o seu curso."];

        for (const [key, value] of Object.entries(item)) {
            if (value == match) {
                newItem[key.split(" ")[0].toLowerCase()] = spanAccepted;
                newData.push(newItem);
                break;
            }
        }
    }
    return newData;
}

function filterDataByOption(data, key) {
    let newData = []
    if (flexCheck.checked) {
        for (let i = 0; i < data.length; i++) {
            const item = data[i][key];
            if (item == spanAccepted) {
                newData.push(data[i]);
            }
        }
        return newData
    }
    return data;
}

function statistics(data) {
    if (data.length == 0) {
        document.getElementById("counter").hidden = true;
    } else {
        document.getElementById("counter").hidden = false;
    }
    countProfessor.innerText = data.length;
}

function selectDisable() {
    sortSelect.disabled = true;
    professorSelect.disabled = true;
}

function selectEnable() {
    sortSelect.disabled = false;
    professorSelect.disabled = false;
    professorSelect.focus();
}

function sortByKey(data, key) {
    return data.sort(function (a, b) {
        return ((a[key] < b[key]) ? 1 : ((a[key] > b[key]) ? -1 : 0));
    });
}

professorSelect.onchange = loadData;
sortSelect.onchange = loadData;
flexCheck.onchange = loadData;
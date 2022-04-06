const dataTable = document.getElementById("dataShowerBody");
const loadingDiv = document.getElementById("loading");
const professorSelect = document.getElementById("professor");
const sortSelect = document.getElementById("sort-select");
const flexCheck = document.getElementById("flexCheck");
const countProfessor = document.getElementById("countProfessor");
const spanAccepted = '<span class="glyphicon glyphicon-ok text-success"></span>';
const spanDenied = '<span class="glyphicon glyphicon-minus"></span>';
// const linkToCSV = 'resource/data.json';
const linkToJson = 'https://opensheet.elk.sh/1uhSniGStxjzYqFRI9InX0shdclQFX8oWMZZq2G90O1s/A1:Z14989';


async function loadData() {
    dataTable.innerHTML = '';
    let match = professorSelect.value
    document.getElementById('loader').style.display = 'block';
    refresh();
    const response = await fetch(linkToJson);
    const json = await response.json();
    const loader = await document.getElementById('loader');
    loader.style.display = "none";

    const data = json;
    // showData(data);
    
    let newData = filterSSData(match, data);
    newData = filterDataByOption(newData, sortSelect.value);
    fillTable(sortByKey(newData, sortSelect.value));
    statistics(newData);
}

function showData(data) {
    let finalStr = '';
    data.forEach(function (item) {
        finalStr += "Nome: " + item["Informe seu nome completo."] + "\n";
        finalStr += "Curso " + item["Informe o seu curso."] + "\n";
        finalStr += "Primeira opção " + item["Primeira opção"] + "\t";
        finalStr += "Segunda opção " + item["Segunda opção"] + "\t";
        finalStr += "Terceira opção " + item["Terceira opção"] + "\t";
        finalStr += "Quarta opção " + item["Quarta opção"] + "\t";
        finalStr += "Quinta opção " + item["Quinta opção"] + "\t";
        finalStr += "Sexta opção " + item["Sexta opção"] + "\t";
    });

    document.querySelector("#dataShow").innerText += finalStr;
    console.log(finalStr)
}

function fillTable(data) {
    if (data.length === 0) {
        let newRow = dataTable.insertRow();
        let cellColspan = newRow.insertCell(0);
        cellColspan.id = "fullyColspan";
        document.getElementById("fullyColspan").colSpan = "8";
        cellColspan.innerText = "Nenhum resultado encontrado.";
        return
    }

    data.forEach(function (item) {
        let newRow = dataTable.insertRow();

        let newName = newRow.insertCell(0);
        newName.innerHTML = item['nome'].toUpperCase();

        let newCurso = newRow.insertCell(1);
        newCurso.innerHTML = item['curso'].toUpperCase();

        let newOpc1 = newRow.insertCell(2);
        newOpc1.innerHTML = item['primeira'];
        let newOpc2 = newRow.insertCell(3);
        newOpc2.innerHTML = item['segunda'];
        let newOpc3 = newRow.insertCell(4);
        newOpc3.innerHTML = item['terceira'];
        let newOpc4 = newRow.insertCell(5);
        newOpc4.innerHTML = item['quarta'];
        let newOpc5 = newRow.insertCell(6);
        newOpc5.innerHTML = item['quinta'];
        let newOpc6 = newRow.insertCell(7);
        newOpc6.innerHTML = item['sexta'];
    });
}

function filterSSData(match, data) {
    let newData = [];
    let nomeController = '';
    let cursoController = '';

    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        let newItem = { nome: nomeController, curso: cursoController, primeira: spanDenied, segunda: spanDenied, terceira: spanDenied, quarta: spanDenied, quinta: spanDenied, sexta: spanDenied };

        newItem['nome'] = item["Informe seu nome completo."];
        newItem['curso'] = item["Informe o seu curso."];
        if (item["Primeira opção"] == match) {
            newItem['primeira'] = spanAccepted;
            newData.push(newItem);
        } else if (item["Segunda opção"] == match) {
            newItem['segunda'] = spanAccepted;
            newData.push(newItem);
        } else if (item["Terceira opção"] == match) {
            newItem['terceira'] = spanAccepted;
            newData.push(newItem);
        } else if (item["Quarta opção"] == match) {
            newItem['quarta'] = spanAccepted;
            newData.push(newItem);
        } else if (item["Quinta opção"] == match) {
            newItem['quinta'] = spanAccepted;
            newData.push(newItem);
        } else if (item["Sexta opção"] == match) {
            newItem['sexta'] = spanAccepted;
            newData.push(newItem);
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

function sortByKey(data, key) {
    return data.sort(function (a, b) {
        return ((a[key] < b[key]) ? 1 : ((a[key] > b[key]) ? -1 : 0));
    });
}

professorSelect.onchange = loadData;
sortSelect.onchange = loadData;
flexCheck.onchange = loadData;
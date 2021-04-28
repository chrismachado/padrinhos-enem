const dataTable = document.getElementById("dataShowerBody");
const loadingDiv = document.getElementById("loading");
const professorSelect = document.getElementById("professor");
const sortSelect = document.getElementById("sort-select");
const flexCheck = document.getElementById("flexCheck");
const countProfessor = document.getElementById("countProfessor");
const spanAccepted = '<span class="glyphicon glyphicon-ok text-success"></span>';
const spanDenied = '<span class="glyphicon glyphicon-minus"></span>';
const linkToCSV = 'https://spreadsheets.google.com/feeds/cells/1pAEt9qXRtF_sORbLP-0PJIphstuPf8yKMSXH-oIj2TQ/1/public/full?alt=json';


async function loadData() {
    dataTable.innerHTML = '';
    let match = professorSelect.value
    document.getElementById('loader').style.display = 'block';
    refresh();
    const response = await fetch(linkToCSV);
    const json = await response.json();
    const loader = await document.getElementById('loader');
    loader.style.display = "none";
    
    const data = json["feed"]["entry"];
    let newData = filterSSData(match, data);
    newData = filterDataByOption(newData, sortSelect.value);
    fillTable(sortByKey(newData, sortSelect.value));
    statistics(newData);
}

function showData(data) {
    let finalStr = '';
    data.forEach(function (item) {
        if (item["gs$cell"]["col"] == 3) {
            finalStr += "Nome: " + item["gs$cell"]["inputValue"] + "\n";
        } else if (item["gs$cell"]["col"] == 5) {
            finalStr += "Curso: " + item["gs$cell"]["inputValue"] + "\n";
        } else if (item["gs$cell"]["col"] == 7) {
            finalStr += "Primeira opcao: " + item["gs$cell"]["inputValue"] + "\t";
        } else if (item["gs$cell"]["col"] == 8) {
            finalStr += "Segunda opcao: " + item["gs$cell"]["inputValue"] + "\t";
        } else if (item["gs$cell"]["col"] == 9) {
            finalStr += "Terceira opcao: " + item["gs$cell"]["inputValue"] + "\t";
        } else if (item["gs$cell"]["col"] == 10) {
            finalStr += "Quarta opcao: " + item["gs$cell"]["inputValue"] + "\t";
        } else if (item["gs$cell"]["col"] == 11) {
            finalStr += "Quinta opcao: " + item["gs$cell"]["inputValue"] + "\t";
        } else if (item["gs$cell"]["col"] == 12) {
            finalStr += "Sexta opcao: " + item["gs$cell"]["inputValue"] + "\n";
        }
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

        if (item["gs$cell"]["col"] == 3) {
            nomeController = item["gs$cell"]["inputValue"];
        } else if (item["gs$cell"]["col"] == 5) {
            cursoController = item["gs$cell"]["inputValue"];
        } else if (item["gs$cell"]["col"] == 7 && item["gs$cell"]["inputValue"] == match) {
            newItem['primeira'] = spanAccepted;
            newData.push(newItem);
        } else if (item["gs$cell"]["col"] == 8 && item["gs$cell"]["inputValue"] == match) {
            newItem['segunda'] = spanAccepted;
            newData.push(newItem);
        } else if (item["gs$cell"]["col"] == 9 && item["gs$cell"]["inputValue"] == match) {
            newItem['terceira'] = spanAccepted;
            newData.push(newItem);
        } else if (item["gs$cell"]["col"] == 10 && item["gs$cell"]["inputValue"] == match) {
            newItem['quarta'] = spanAccepted;
            newData.push(newItem);
        } else if (item["gs$cell"]["col"] == 11 && item["gs$cell"]["inputValue"] == match) {
            newItem['quinta'] = spanAccepted;
            newData.push(newItem);
        } else if (item["gs$cell"]["col"] == 12 && item["gs$cell"]["inputValue"] == match) {
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



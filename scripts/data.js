const dataTable = document.getElementById("dataShowerBody");
const loadingDiv = document.getElementById("loading");
const professorSelect = document.getElementById("professor");
const spanAccepted = '<span class="glyphicon glyphicon-ok text-success"></span>';
const spanDenied = '<span class="glyphicon glyphicon-minus"></span>';
const linkToCSV = 'https://spreadsheets.google.com/feeds/cells/1_yJ8Ia37Nzq083txMBgm7-1wUzUdjW49_RTcVBa9O5I/1/public/full?alt=json';

async function loadData() {
    dataTable.innerHTML = '';
    let match = professorSelect.value
    const response = await fetch(linkToCSV);
    const json = await response.json();
    const data = json["feed"]["entry"];
    let newData = filterSSData(match, data);
    fillTable(newData);
    
}

function showData(data) {
    // console.log(data);

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
            // let strFormat = "" + item['nome'] + "\n"
            //     + item['curso'] + "\n"
            //     + "Primeira opção: " + item['primeira'] + "\n"
            //     + "Segunda opção: " + item['segunda'] + "\n"
            //     + "Terceira opção: " + item['terceira'] + "\n"
            //     + "Quarta opção: " + item['quarta'] + "\n"
            //     + "Quinta opção: " + item['quinta'] + "\n"
            //     + "Sexta opção: " + item['sexta'] + "\n";
            
            // console.log(item["gs$cell"]["col"])
    });
    document.querySelector("#dataShow").innerText += finalStr;
    console.log(finalStr)


}

function fillTable(data) {
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

function filterData(match, data) {
    let newData = [];
    data.forEach(function (item) {
        let newItem = { nome: item['Informe seu nome completo.'], curso: item['Informe o seu curso.'], primeira: spanDenied, segunda: spanDenied, terceira: spanDenied, quarta: spanDenied, quinta: spanDenied, sexta: spanDenied };
        if (item['Primeira opção'] == match) {
            newItem['primeira'] = spanAccepted;
            newData.push(newItem);
        } else if (item['Segunda opção'] == match) {
            newItem['segunda'] = spanAccepted;
            newData.push(newItem);
        } else if (item['Terceira opção'] == match) {
            newItem['terceira'] = spanAccepted;
            newData.push(newItem);
        } else if (item['Quarta opção'] == match) {
            newItem['quarta'] = spanAccepted;
            newData.push(newItem);
        } else if (item['Quinta opção'] == match) {
            newItem['quinta'] = spanAccepted;
            newData.push(newItem);
        } else if (item['Sexta opção'] == match) {
            newItem['sexta'] = spanAccepted;
            newData.push(newItem);
        }
    });
    return newData;

}

professorSelect.onchange = loadData;


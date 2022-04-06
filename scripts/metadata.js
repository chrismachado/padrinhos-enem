const professores = ["Anderson Ferreira",
    "Bruno Raniere",
    "Camila Martins",
    "Cícero Rêgo",
    "Cleilson Santos",
    "Christiano Machado",
    "Dalmo Maia",
    "Deysiane Mendes",
    "Diomaique Vieira",
    "Estefânia Teixeira",
    "Franci Lira",
    "Gabriel Xavier",
    "Gilana Ferreira",
    "Greycianne Félix",
    "Jackson Almeida",
    "Jean Nascimento",
    "Jedson Pereira",
    "Jéssica Oliveira",
    "Karol Lima",
    "Lilian Teixeira",
    "Luana Louredo",
    "Lucas Abreu",
    "Lucas Queiroz",
    "Luziana Amorim",
    "Manoel Gomes",
    "Manoel Oliveira",
    "Sheila Yamamoto",
    "Victor Barros",
    "Wesley Carlos",
    "Zenilda Moura",
];

function populateSelect() {
    var professorSelect = document.getElementById("professor");

    professores.forEach(function populate(item) {
        var option = document.createElement("option");
        option.value = item;
        option.innerHTML = item;
        professorSelect.appendChild(option);
    });
}

populateSelect();

function refresh() {
    var spinner = document.querySelector('.loader');
    spinner.classList.add('spin');
}
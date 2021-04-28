const professores = ["Adriano", "Anderson", "Bruno", "Camila", "Christiano", "Cícero", "Cleilson", "Dalmo", "Deyse", "Diomaique", "Edson", "Estefânia", "Franci", "Gilana", "Greyce", "Jackson", "Jean", "Jedson", "Jessica", "Joao Paulo", "Karoline", "Lilian", "Luana", "Lucas", "Lucas Queiroz", "Luziana", "Manoel  Oliveira", "Manoel Gomes", "Renata", "Sheila", "Victor", "Wesley", "Zenilda",];

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
const inputCep = document.forms["location"]["cep"];

const changeDisabled = isDisabled => {
    for (const key of document.forms["location"]) 
        if (key.name !== "cep") 
            document.forms["location"][key.name].disabled = isDisabled;
};

const resultHandler = (isCorrect, menssage = "") => {
    inputCep.classList.remove(isCorrect ? "erro" : "certo");
    inputCep.classList.add(isCorrect ? "certo" : "erro");
    document.getElementById("cepErro").innerHTML = menssage;
};

const insertValues = location => {
    for (const key of document.forms["location"]) 
        if (key.name !== "cep")
            document.forms["location"][key.name].value = location ? location[key.name] : ""; 
};

const requestCEP = async () => {
    insertValues(false);
    const cep = inputCep.value;
    if (cep.length === 8 && /^[0-9]+$/.test(cep)) {
        changeDisabled(true);
        const dados = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const location = await dados.json();
        if (location.erro) {
            resultHandler(false, "CEP não encontrado!");
        } else {
            insertValues(location);
            resultHandler(true);
        }
        changeDisabled(false);
    } else resultHandler(false, "CEP invalido");
};

inputCep.addEventListener("focusout", requestCEP);
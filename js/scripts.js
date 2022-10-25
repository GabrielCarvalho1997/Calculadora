const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons button");

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = ""
    }

    // Adiciona o digito na tela da calculadora
    addDigit(digit) {
        //Checar se a operação já tem um ponto e permite somente 1 ponto na operação
        if (digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }

        this.currentOperation = digit
        this.updateScreen()

    }

    // Processa todas as operação da calculadora
    processOperation(operation) {
        //Checar se o valor atual está vazio
        if(this.currentOperationText.innerText === "" && operation !== "C") {
            // Mudança de operação - permite mudar de operação ao longo das contas
            if(this.previousOperationText.innerText !== "") {
                this.changeOperation(operation);
            }
            return;
        }

        // Pega o valor atual e o valor anterior
        let operationValue;
        const previous = +this.previousOperationText.innerText.split(" ")[0]; //Irá pegar somente o número, sem levar em conta o operador
        const current = +this.currentOperationText.innerText;

        switch (operation) {
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break;

            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous);
                break;

            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous);
                break;

            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous);
                break;

            case "DEL":
                this.delOperator();
                break;

            case "CE":
                this.clearCurrentOperator();
                break;

            case "C":
                this.clearAllOperator();
                break;

            case "=":
                this.equalOperator();
                break;

            default:
                return;
        }

    }

    //Atualiza os valores na tela da calculadora
    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
    ) {

        if (operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation
        } else {
            //Checar se o valor é zero, se for, adicionar o valor atual
            if (previous === 0) {
                operationValue = current
            }

            //Adicionar o valor atual no valor anterior
            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
        }
    }

    //Muda o operador matemático
    changeOperation(operation) {

        const mathOperations = ["*", "/", "+", "-"]

        if(!mathOperations.includes(operation)) {
            return
        }

        // Remove o ultimo caractére que é o operador antigo e adiciona o novo operador 
        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    }

    //Deleta o ultimo digito
    delOperator() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }

    //Limpa a operação atual
    clearCurrentOperator() {
        this.currentOperationText.innerText = "";
    }

    //Limpar a operação atual e anterior
    clearAllOperator() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    //Funcionalidade do operador de igual =
    equalOperator() {

        const operation = previousOperationText.innerText.split(" ")[1]
        this.processOperation(operation)

        //joga o resultado da operação para a tela principal da calculadora
        this.currentOperationText.innerText = this.previousOperationText.innerText.split(" ")[0]
        this.previousOperationText.innerHTML = "";

    }

}

const calc = new Calculator(previousOperationText, currentOperationText);  //Istancia o objeto

buttons.forEach((btn) => { //Para cada botão vai ser realizado o comando seguinte ...
    btn.addEventListener("click", (e) => {

        const value = e.target.innerText; //Pega o valor do texto de cada botão

        if (+value >= 0 || value === ".") { //Separa os operadores dos números
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    });
});
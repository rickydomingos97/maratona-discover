const modalOverlay = document.querySelector(".modal-overlay");
const newTransactions = document.querySelector("#new-transaction");
const closeModal = document.querySelector("#cancel-modal")



// ABRIR O MODAL
//ADICIONAR A CLASS ACTIVE DO MODAL
newTransactions.addEventListener("click", function () {
    console.log("clicou");
    modalOverlay.classList.add("active")
    console.log("ativo");
});

//FECHAR MODAL
//REMOVER A CLASSE ACTIVE DO MODAL

closeModal.addEventListener("click", function () {
    console.log("clicou");
    modalOverlay.classList.remove("active")
    console.log("closed");
});

const transactions = [{
        id: 1,
        description: 'Luz',
        amount: -50000,
        date: '23/01/2021',
    },
    {
        id: 2,
        description: 'Criacao de Site',
        amount: 500000,
        date: '23/01/2021',
    },
    {
        id: 3,
        description: 'Internet',
        amount: -20000,
        date: '23/01/2021',
    },
    {
        id: 4,
        description: 'App',
        amount: 20000,
        date: '23/01/2021',
    }
]

const Transaction = {
    incomes() {
        // SOMAR AS ENTRADAS
    },
    expenses() {
        // somar as saidas
    },
    total() {
        // entradas - saidas
    }
}

// PARA INSERIR OS DADOS NO HTML //
const DOM = {
    // vai receber a transacao e onde ele vai colocar a transacao //
    // criar o tr 

    // aqui temos o conteudo do container no html //
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        console.log(transaction);
        const tr = document.createElement('tr');
        tr.innerHTML = DOM.innerHTMLTransaction(transaction);
        // pegamos o container e adicionamos na var DOM para inserir no tr como filho // 
        DOM.transactionsContainer.appendChild(tr)



    },
    // pega o transactions e oe eles no html //
    innerHTMLTransaction(transaction) {
    
    // o CSSclass vai verificar usando um ternario
    // e vai adicionar o item como entrada ou saida conforme a logica apresentada
        const CSSclass = transaction.amount > 0 ? "income" : " expense";

        const amout = Utils.formatCurrency(transaction.amount)

        const html = `
            <td class="description">${transaction.description}</td>
            <td class=${CSSclass}>${transaction.amount}</td>
                <td class="date">${transaction.date}</td>
            <td>
                <img src="assets/minus.svg" alt="deletar" id="btn-delete" class="botao-deletar">
            </td>
        `
        return html;
    }
}

//aqui vamos tratar da questao do dinheiro sobreo sinal de positivo ou negativo //
const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""
    }
}

/* o forEach vai passar por cada transaction e vai adicionar na
 DOM a transacao do momento */

transactions.forEach(function (transaction) {
    DOM.addTransaction(transaction)
})
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

// RESPONSAVEL PELO CALCULO MATEMATICO //
const Transaction = {
    incomes() {
        let income = 0
        // pegar todas as transacoes
        // para cada transacao
        transactions.forEach(transaction => {
            // se ela for maior que zero
            if( transaction.amount > 0) {
              // se for somar a uma variavel e retornar a variavel
              income += transaction.amount
              // income = income + transaction.amount //
            }
        })

        return income
    },
    expenses() {
        let expense = 0
        // pegar todas as transacoes
        // para cada transacao
        transactions.forEach(transaction => {
            // se ela for maior que zero
            if( transaction.amount < 0) {
              // se for somar a uma variavel e retornar a variavel
              expense += transaction.amount
              // income = income + transaction.amount //
            }
        })

        return expense
    },
    total() {
        // SOMAMOS POR QUE AS SAIDAS JA ESTAO NEGATIVAS COM O SINAL DE - //
        // 20 + (-10) = 10
        return Transaction.incomes() + Transaction.expenses()
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

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
        <td class="description">${transaction.description}</td>
        <td class=${CSSclass}>${amount}</td>
            <td class="date">${transaction.date}</td>
        <td>
            <img src="assets/minus.svg" alt="deletar" id="btn-delete" class="botao-deletar">
        </td>
    `
        return html;
    },
// RESPONSAVEL POR DEIXAR OS NUMEROS LINDOS NA TELA //
    updateBalance() {
        document
        .getElementById('incomeDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.incomes()) // insere os dados no html

        document
        .getElementById('expenseDisplay')
        .textContent = Utils.formatCurrency(Transaction.expenses()) // insere os dados no html

        document
        .getElementById('totalDisplay')
        .textContent = Utils.formatCurrency(Transaction.total()) // insere os dados no html
    }
}

//aqui vamos tratar da questao do dinheiro sobreo sinal de positivo ou negativo //
const Utils = {
    formatCurrency(value) {

        // INCLUE O SINAL DE - NOS NUMEROS DAS DESPESAS //
        const signal = Number(value) < 0 ? "-" : ""
        // PEGA OS NUMEROS COM - E TROCA O - POR NADA "" // 
        value = String(value).replace(/\D/g, "")
        // CONVERTE OS ULTIMOS ZEROS EM DECIMAIS ,00 //
        value = Number(value) / 100
        // SETA O VALOR DA MOEDA EM REAL BRASIL //
        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return signal + value


    }
}

/* o forEach vai passar por cada transaction e vai adicionar na
DOM a transacao do momento */
// ESSA LINHA PREENCHE OS DADOS DO SISTEMA NA DOM //
transactions.forEach(function (transaction) {
    DOM.addTransaction(transaction)
})
// chamamos o updateBalance aqui 
DOM.updateBalance()
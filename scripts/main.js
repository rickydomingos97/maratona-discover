const transactions = [{
        
        description: 'Luz',
        amount: -50000,
        date: '23/01/2021',
    },
    {
        
        description: 'Criacao de Site',
        amount: 500000,
        date: '23/01/2021',
    },
    {
        
        description: 'Internet',
        amount: -20000,
        date: '23/01/2021',
    },
    {
        
        description: 'App',
        amount: 20000,
        date: '23/01/2021',
    }
]

const Transaction = {
    all: transactions,
    add(transaction) {
        Transaction.all.push(transaction)
        console.log(Transaction.all);
        App.reload()
    },

    remove(index){
        Transaction.all.splice(index, 1)

        App.reload()
    },

    incomes() {
        let income = 0
        Transaction.all.forEach(transaction => {
            
            if (transaction.amount > 0) {
                
                income += transaction.amount
                
            }
        })

        return income
    },

    expenses() {
        let expense = 0
        Transaction.all.forEach(transaction => {
            if (transaction.amount < 0) {
                
                expense += transaction.amount
               
            }
        })

        return expense
    },

    total() {
        return Transaction.incomes() + Transaction.expenses()
    }
}

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        console.log(transaction);

        const tr = document.createElement('tr');
        tr.innerHTML = DOM.innerHTMLTransaction(transaction);
        // pegamos o container e adicionamos na var DOM para inserir no tr como filho // 
        DOM.transactionsContainer.appendChild(tr)



    },
   
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
    
    updateBalance() {
        document
            .getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.incomes())

        document
            .getElementById('expenseDisplay')
            .textContent = Utils.formatCurrency(Transaction.expenses())

        document
            .getElementById('totalDisplay')
            .textContent = Utils.formatCurrency(Transaction.total())
    },

    clearTransactions() {
        DOM.transactionsContainer.innerHTML = ""
    }
}

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

const App = {
    init() {
       
        Transaction.all.forEach((transaction) => {
            DOM.addTransaction(transaction)
        });
        
        DOM.updateBalance();

    },
    reload() {
        DOM.clearTransactions()
        App.init();
    }
}

App.init()

Transaction.remove(1)
const Modal = {
    open(){
        document.querySelector('.modal-overlay').classList.add('active')
    },

    close(){
        document.querySelector('.modal-overlay').classList.remove('active')
    }
}

const Storage = {
    get() {
        return JSON.parse(localStorage.getItem("dev.finances:transactions")) || []
    },

    set(transactions) {
        localStorage.setItem("dev.finances:transactions", JSON.stringify(transactions))
    }
}

// Esse transactions vai ser add no Transactions //
/* const transactions = [{
        
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
 */
const Transaction = {
    /* all: transactions, */
    all: Storage.get(),
    
    add(transaction) {
        Transaction.all.push(transaction)

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
        /* console.log(transaction); */

        const tr = document.createElement('tr');
        tr.innerHTML = DOM.innerHTMLTransaction(transaction, index);
        // pegamos o container e adicionamos na var DOM para inserir no tr como filho // 
        tr.dataset.index = index

        DOM.transactionsContainer.appendChild(tr)
    },
   
    innerHTMLTransaction(transaction, index) {

        // o CSSclass vai verificar usando um ternario
        // e vai adicionar o item como entrada ou saida conforme a logica apresentada
        const CSSclass = transaction.amount > 0 ? "income" : " expense";

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
        <td class="description">${transaction.description}</td>
        <td class=${CSSclass}>${amount}</td>
            <td class="date">${transaction.date}</td>
        <td>
            <img onclick="Transaction.remove(${index})" src="assets/minus.svg" alt="deletar" id="btn-delete" class="botao-deletar">
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
    formatAmount(value) {
        // OUTRA MANEIRA DE FAZER A FORMATACAO DA DATA // === EXPRESSAO REGULAR === //
        /* value = Number(value.replace(/\,\/g, "")) * 100  */

        value = Number(value) * 100
        console.log(value);

        return value
    },
    // formatando a data que veio original como 2021-01-16 para 16/01/2021 //
    formatDate(date) {
        const splittedDate = date.split("-")
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    },

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

// SUBMIT VEIO DO FORM NO HTML //
const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value,
        }
    },

/*     formatData() {
        console.log("Formatar os dados");
    }, */

    validateFields() {
        /*  const description = Form.getValues().description
            const amount = Form.getValues().amount
            const date = From.getValues().date
        */
        const { description, amount, date} = Form.getValues(); // Desestruturacao dos dados //

        if ( description.trim() === "" || amount.trim() === "" || date.trim() === "" ) {
            throw new Error(" Por favor preencha todos os campos")
        }
    },

    formatValues() {
        let { description, amount, date } = Form.getValues()

        amount = Utils.formatAmount(amount)

        date = Utils.formatDate(date)

        return {
            /* description: description, // QUANDO O NOME DA CHAVE EH O MESMO NOME DA VARIAVEL NAO PRECISAMOS DEFINIR POR DOIS PONTO, PODEMOS COLOCAR DIRETO SEM ATRIBUIR */
            // PODEMOS USAR UM SHORT HAND (ATALHO) O MESMO NOME DAS VARIAVEIS //
            description,
            amount,
            date
        }
    },

    clearFields() {
        Form.description.value = ""
        Form.amount.value = ""
        Form.date.value = ""
    },

/*     saveTransaction() {
        Transaction.add(transaction)
    }, */

    submit(event) {
        event.preventDefault()

        try {
            // verificar se todas as informacoes foram preenchidas
            Form.validateFields()
            // formatar os dados para salvar
            const transaction = Form.formatValues()
            // salvar
            /* Form.saveTransaction(transaction) */
            Transaction.add(transaction)
            // apagar os dados do formulario
            Form.clearFields()
            // fechar o modal
            Modal.close()
            // update the App
                /* App.reload() */
                // JA TEMOS UM APP RELOAD NO ADD TRANSACTIONS //
        } catch (error) {
            alert(error.message)
        }

    
    }
}



/* Storage.get() */

const App = {
    init() {
        // pode ser usado como atalho para a DOM transaction //
        // Transaction.all.forEach(DOM.addTransaction) //
       
        Transaction.all.forEach((transaction, index) => { // recebendo o index la do add.transaction da DOM //
            DOM.addTransaction(transaction, index)
        });
        
        DOM.updateBalance();

        Storage.set(Transaction.all)

    },
    reload() {
        DOM.clearTransactions()
        App.init();
    }
}

App.init()
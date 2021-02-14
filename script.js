const modalOverlay = document.querySelector(".modal-overlay");
const newTransactions = document.querySelector("#new-transaction");
const closeModal = document.querySelector("#cancel-modal")



// ABRIR O MODAL
//ADICIONAR A CLASS ACTIVE DO MODAL
newTransactions.addEventListener("click", function() {
    console.log("clicou");
    modalOverlay.classList.add("active")
    console.log("ativo");
});

//FECHAR MODAL
//REMOVER A CLASSE ACTIVE DO MODAL

closeModal.addEventListener("click", function() {
    console.log("clicou");
    modalOverlay.classList.remove("active")
    console.log("closed");
});
document.addEventListener("DOMContentLoaded", () => {

    const expenseForm = document.getElementById('expense-form')
    const expenseNameInput = document.getElementById('expense-name');
    const expenseAmountInput = document.getElementById('expense-amount');
    const expenseList = document.getElementById('expense-list');
    const totalAmountDisplay = document.getElementById('total-amount');

    let expenses = [] || JSON.parse(localStorage.getItem('expense'));
    let totalAmount = 0;

    renderExpenses();

    expenseForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const expenseName = expenseNameInput.value.trim();
        const expenseAmount = parseFloat(expenseAmountInput.value.trim());

        if (expenseName !== "" && !isNaN(expenseAmount) && expenseAmount > 0) {
            const newExpense = {
                id: Date.now(),
                name: expenseName,
                amount: expenseAmount
            };
            expenses.push(newExpense);
            saveExpense();
            renderExpenses();
            updateTotal();
            expenseNameInput.value = "";
            expenseAmountInput.value = "";
        }
    });


    function renderExpenses() {
        expenseList.innerHTML = "";
        expenses.forEach((expense) => {
            const li = document.createElement('li');
            li.innerHTML = `${expense.name} - $${expense.amount}
            <button data-id="${expense.id}">delete</button>
            `
            expenseList.appendChild(li);
        })
    }
    function saveExpense() {
        localStorage.setItem('expense', expenses);
    }
    function calculateTotal() {
        return expenses.reduce((acc, expense) => acc + expense.amount, 0);
    }
    function updateTotal() {
        totalAmount = calculateTotal();
        totalAmountDisplay.textContent = `${totalAmount}`;
    }

    expenseList.addEventListener("click", (event) => {
        if (event.target.tagName === "BUTTON") {
            const expenseId = parseInt(event.target.getAttribute("data-id"));
            expenses = expenses.filter((e) => e.id !== expenseId);
            saveExpense();
            renderExpenses();
            updateTotal();
        }
    });












})
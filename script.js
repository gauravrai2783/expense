document.addEventListener('DOMContentLoaded', loadExpenses);
document.getElementById('expense-form').addEventListener('submit', addExpense);

function loadExpenses() {
    let expenses = getExpenses();
    expenses.forEach(expense => addExpenseToTable(expense));
}

function getExpenses() {
    let expenses = localStorage.getItem('expenses');
    return expenses ? JSON.parse(expenses) : [];
}

function saveExpenses(expenses) {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function addExpense(event) {
    event.preventDefault();

    let name = document.getElementById('expense-name').value;
    let amount = document.getElementById('expense-amount').value;
    let category = document.getElementById('expense-category').value;

    if (name === '' || amount === '' || category === '') return;

    let expenses = getExpenses();
    let expense = { id: Date.now(), name, amount, category };
    expenses.push(expense);
    saveExpenses(expenses);

    addExpenseToTable(expense);

    document.getElementById('expense-form').reset();
}

function addExpenseToTable(expense) {
    let table = document.getElementById('expense-list');
    let row = table.insertRow();

    row.innerHTML = `
        <td>${expense.name}</td>
        <td>${expense.amount}</td>
        <td>${expense.category.charAt(0).toUpperCase() + expense.category.slice(1)}</td>
        <td>
            <button class="btn btn-sm btn-info" onclick="editExpense(${expense.id})">Edit</button>
            <button class="btn btn-sm btn-danger" onclick="deleteExpense(${expense.id})">Delete</button>
        </td>
    `;
    row.dataset.id = expense.id;
}

function editExpense(id) {
    let expenses = getExpenses();
    let expense = expenses.find(exp => exp.id === id);

    document.getElementById('expense-name').value = expense.name;
    document.getElementById('expense-amount').value = expense.amount;
    document.getElementById('expense-category').value = expense.category;

    deleteExpense(id);
}

function deleteExpense(id) {
    let expenses = getExpenses();
    expenses = expenses.filter(exp => exp.id !== id);
    saveExpenses(expenses);

    let row = document.querySelector(`[data-id='${id}']`);
    row.remove();
}

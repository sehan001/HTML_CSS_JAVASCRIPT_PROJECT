document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.getElementById("expense-form");
  const expenseNameInput = document.getElementById("expense-name");
  const expenseAmountInput = document.getElementById("expense-amount");
  const expenseList = document.getElementById("expense-list");
  const totalAmountDisplay = document.getElementById("total-amount");

  // Retrieve stored expenses from localStorage
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  // Render existing expenses from localStorage
  renderExpenses();

  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const expenseName = expenseNameInput.value.trim();
    const expenseAmount = parseFloat(expenseAmountInput.value);

    if (expenseName !== "" && !isNaN(expenseAmount) && expenseAmount > 0) {
      const newExpense = {
        id: Date.now(),
        name: expenseName,
        amount: expenseAmount,
      };

      expenses.push(newExpense);
      saveExpensesToLocalStorage();
      renderExpenses();
    }

    expenseNameInput.value = "";
    expenseAmountInput.value = "";
  });

  function renderExpenses() {
    expenseList.innerHTML = "";
    expenses.forEach((expense) => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${expense.name} - $${expense.amount.toFixed(2)}
        <button data-id="${expense.id}">Delete</button>
      `;
      expenseList.appendChild(li);
    });

    totalAmountDisplay.textContent = calculateTotalAmount().toFixed(2);

    // Attach delete event listener to buttons
    document.querySelectorAll("button[data-id]").forEach((button) => {
      button.addEventListener("click", (e) => {
        const expenseId = parseInt(e.target.dataset.id);
        expenses = expenses.filter((expense) => expense.id !== expenseId);
        saveExpensesToLocalStorage();
        renderExpenses();
      });
    });
  }

  function saveExpensesToLocalStorage() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  function calculateTotalAmount() {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }
});

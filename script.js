// app.js


// app.js
const balanceEl = document.getElementById('balance');
const incomeEl = document.getElementById('income');
const expenseEl = document.getElementById('expense');
const transactionsEl = document.getElementById('transactions');
const form = document.getElementById('transaction-form');
const descriptionEl = document.getElementById('description');
const amountEl = document.getElementById('amount');
const categoryEl = document.getElementById('category');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function init() {
  transactionsEl.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues();
}

function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? '-' : '+';
  const item = document.createElement('li');
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
  item.innerHTML = `
    ${transaction.description} <span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
  `;
  transactionsEl.appendChild(item);
}

function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense = (amounts
    .filter(item => item < 0)
    .reduce((acc, item) => (acc += item), 0) * -1)
    .toFixed(2);
    var rupeeSign = '\u20B9';
  
  balanceEl.innerText = `₹${total}`;
  incomeEl.innerText = `+${rupeeSign}${income}`;
  expenseEl.innerText = `-${rupeeSign}${expense}`;
}

function addTransaction(e) {
  e.preventDefault();

  if (descriptionEl.value.trim() === '' || amountEl.value.trim() === '') {
    alert('Please add a description and amount');
  } else {
    const transaction = {
      id: generateID(),
      description: descriptionEl.value,
      amount: +amountEl.value,
      category: categoryEl.value
    };

    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage(); // Update local storage
    descriptionEl.value = '';
    amountEl.value = '';
  }
}

function generateID() {
  return Math.floor(Math.random() * 100000000);
}

function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);
  init();
  updateLocalStorage(); // Update local storage
}

form.addEventListener('submit', addTransaction);

init();

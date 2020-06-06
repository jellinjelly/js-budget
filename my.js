let budgetInput = document.getElementById("budget-input");
let calcBtn = document.getElementById("budget-submit");
let budgetFeedback = document.querySelector(".budget-feedback");

let expenseForm = document.getElementById("expense-form");
let expenseInput = document.getElementById("expense-input");
let amountInput = document.getElementById("amount-input");
let expenseSubmitBtn = document.getElementById("expense-submit");
let expenseFeedback = document.querySelector(".expense-feedback");

let expenseList = document.querySelector(".expense-list");

let budgetAmount = document.getElementById("budget-amount");
let expenseAmount = document.getElementById("expense-amount");
let balanceAmount = document.getElementById("balance-amount");

calcBtn.addEventListener("click", e => {
  e.preventDefault();
  if (budgetInput.value.length <= 0) {
    budgetFeedback.style.display = "block";
    budgetFeedback.innerHTML = "Value cannot be empty or negative.";

    setTimeout(function () {
      budgetFeedback.style.display = "none";
    }, 2000);
  }

})

let expenseArray = [];
let addedExpense = 0;
let id = 0;

expenseSubmitBtn.addEventListener("click", e => {
  e.preventDefault();
  if (expenseInput.value.length <= 0 || amountInput.value.length <= 0) {
    expenseFeedback.style.display = "block";
    expenseFeedback.innerHTML = "Values cannot be empty or negative";

    setTimeout(function () {
      expenseFeedback.style.display = "none";
    }, 2000);
  } else {
    let newDiv = document.createElement("div");
    newDiv.classList.add("expense");
    newDiv.setAttribute("data-id", id);
    id++
    newDiv.innerHTML = `<div class="expense-item d-flex justify-content-between align-items-baseline"> <h6 class="expense-title mb-0 text-uppercase list-item">${expenseInput.value}</h6> <h5 class="expense-amount mb-0 list-item">${amountInput.value}</h5> <div class="expense-icons list-item"> <a href="#" class="edit-icon mx-2" data-id="${expense.id}"> <i class="fas fa-edit"></i> </a> <a href="#" class="delete-icon" data-id="${expense.id}"> <i class="fas fa-trash"></i> </a> </div></div>`;
    expenseList.appendChild(newDiv);

    // adds all the added expenses into total (into Balance Amount)
    expenseArray.push(amountInput.value);
    addedExpense = expenseArray.reduce((accumulator, currentValue) => {
      return Number(accumulator) + Number(currentValue);
    }, 0);
    expenseAmount.innerHTML = addedExpense;


    // Resets the values after item added to list
    expenseInput.value = "";
    amountInput.value = "";


    // edit and delete buttons for list
    let deleteBtns = document.querySelectorAll(".delete-icon");
    let editBtns = document.querySelectorAll(".edit-icon");

    deleteBtns.forEach(deleteBtn => {
      deleteBtn.addEventListener("click", e => {
        e.preventDefault();
        e.currentTarget.parentElement.parentElement.parentElement.remove();
        let thisItemsAmountValue = e.currentTarget.parentElement.previousElementSibling.innerHTML;

        expenseAmount.innerHTML = addedExpense - thisItemsAmountValue;


      })
    })

    editBtns.forEach(editBtn => {
      editBtn.addEventListener("click", e => {
        e.preventDefault();
        expenseInput.value = e.currentTarget.parentElement.previousElementSibling.previousElementSibling.innerHTML;

        amountInput.value = e.currentTarget.parentElement.previousElementSibling.innerHTML;

        e.currentTarget.parentElement.parentElement.parentElement.remove();

      })
    })



    // each time add expense button is clicked with value, input will be added into array right away
    // all inputed expense amount into an array, loop thru and add up all items inside array (maybe using reduced()?). Added up value will be shown as total expense amount 
    // the total expense amount will be the same as negative total balance of that same amount if no budget is submitted.
    // budge is red with negative and green when positive
    // once calculate button is clicked. it will subtract the expense amount from the budget amount returning balance amount.
    // edit and delete buttons will also subtract the expenses amount and adjust the balance
  }

})
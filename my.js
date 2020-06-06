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
let balance = document.getElementById("balance");

let budgetTotal = 0;
calcBtn.addEventListener("click", e => {
  e.preventDefault();
  if (budgetInput.value.length <= 0) {
    budgetFeedback.style.display = "block";
    budgetFeedback.innerHTML = "Value cannot be empty or negative.";

    setTimeout(function () {
      budgetFeedback.style.display = "none";
    }, 2000);
  }

  budgetTotal =+ parseInt(budgetInput.value);
  budgetAmount.innerHTML = budgetTotal;

  balanceAmount.innerHTML = calcBalance(budgetTotal, expenseTotal);
  colorChange(calcBalance(budgetTotal, expenseTotal));

  budgetInput.value = "";
})


let expenseArray = [];
let id = 0;
let expenseTotal = 0;

function colorChange(totalBalance){
  if(totalBalance < 0){
    balance.style.color = "red";
  }else if(totalBalance > 0){
    balance.style.color = "green";
  }else{
    balance.style.color = "black";
  }
}

function calcBalance(budgets, expenses){
  return budgets - expenses;
}

function calcExpense(arr){
  let t = 0;
  arr.forEach(item => {
    t += parseInt(item.amount)
  })
  return t;
}

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
    let expenseName = expenseInput.value;
    let expenseCost = parseInt(amountInput.value);
    newDiv.classList.add("expense");
    newDiv.setAttribute("data-id", id);
    
    let expenseItem = {
      name: expenseName,
      amount: expenseCost,
      id: id
    }

    expenseArray.push(expenseItem);
    id++;

    newDiv.innerHTML = `<div class="expense-item d-flex justify-content-between align-items-baseline"> <h6 class="expense-title mb-0 text-uppercase list-item">${expenseName}</h6> <h5 class="expense-amount mb-0 list-item">$${expenseCost}</h5> <div class="expense-icons list-item"> <a href="#" class="edit-icon mx-2" data-id="${expense.id}"> <i class="fas fa-edit"></i> </a> <a href="#" class="delete-icon" data-id="${expense.id}"> <i class="fas fa-trash"></i> </a> </div></div>`;
    expenseList.appendChild(newDiv);

    expenseTotal = calcExpense(expenseArray);

    expenseAmount.innerHTML = expenseTotal;

    balanceAmount.innerHTML = calcBalance(budgetTotal, expenseTotal);

    colorChange(calcBalance(budgetTotal, expenseTotal));

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
        let deletedItemId = e.currentTarget.parentElement.parentElement.parentElement.dataset.id;
        let temptExpenseArray = expenseArray.filter(item => {
          console.log(item.id, deletedItemId)
          return item.id !== parseInt(deletedItemId); 
        })
        expenseArray = temptExpenseArray;

        expenseTotal = calcExpense(temptExpenseArray);
        
        expenseAmount.innerHTML = expenseTotal;

        balanceAmount.innerHTML = calcBalance(budgetTotal, expenseTotal);

        colorChange(calcBalance(budgetTotal, expenseTotal));
      
      })
    })

    editBtns.forEach(editBtn => {
      editBtn.addEventListener("click", e => {
        e.preventDefault();
        expenseInput.value = e.currentTarget.parentElement.previousElementSibling.previousElementSibling.innerHTML;

        amountInput.value = e.currentTarget.parentElement.previousElementSibling.innerText.split("$")[1];
        e.currentTarget.parentElement.parentElement.parentElement.remove();

        let deletedItemId = e.currentTarget.parentElement.parentElement.parentElement.dataset.id;
        let temptExpenseArray = expenseArray.filter(item => {
          console.log(item.id, deletedItemId)
          return item.id !== parseInt(deletedItemId); 
        })
        expenseArray = temptExpenseArray;

        expenseTotal = calcExpense(temptExpenseArray);
        
        expenseAmount.innerHTML = expenseTotal;

        balanceAmount.innerHTML = calcBalance(budgetTotal, expenseTotal);

        colorChange(calcBalance(budgetTotal, expenseTotal));

      })
    })



    // each time add expense button is clicked with value, input will be added into array right away
    // all input expense amount into an array, loop thru and add up all items inside array (maybe using reduced()?). Added up value will be shown as total expense amount 
    // the total expense amount will be the same as negative total balance of that same amount if no budget is submitted.
    // budge is red with negative and green when positive
    // once calculate button is clicked. it will subtract the expense amount from the budget amount returning balance amount.
    // edit and delete buttons will also subtract the expenses amount and adjust the balance
  }

})
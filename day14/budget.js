let expenses = JSON.parse(localStorage.getItem('budget_data')) || []

let addTransaction = ()=>{
    let inp_ename = document.getElementById('ename')
    let inp_amt = document.getElementById('amt')

    
    //push this pair to expenses
    expenses.push({name:inp_ename.value, amount:Number(inp_amt.value)})
    console.log(expenses)

    //clear the input values
    inp_ename.value = ''
    inp_amt.value = ''

    //add to local storagee
    localStorage.setItem('budget_data',JSON.stringify(expenses))

    //show expenses
    renderDashboard(expenses)
}

let filterHighExpenses = ()=>{
    let heavy_spending = expenses.filter((val,ind)=>{
        return Number(val.amount) > 50
    })

    renderDashboard(heavy_spending)
}



function renderDashboard(dataArray){
    let total_expenses = dataArray.reduce((acc,val)=>{
        return acc + Number(val.amount)
    },0)

    // get addr of where to show this
    let expenses_display = document.getElementById('totalDisplay')
    expenses_display.innerHTML = `&#8377 ${total_expenses}`
    console.log(total_expenses)

    let expenses_details = document.getElementById('list-board')

    // erase old transacctions
    expenses_details.innerHTML = ''

    let details = dataArray.map((val, ind)=>{
        return `
        <div class='transaction'>
            <span class="t-name">Name : ${val.name}</span>
            <span class="t-amount">Amount : &#8377 ${val.amount}</span>
        </div>`
    }).join('')

    expenses_details.innerHTML = details
}

renderDashboard(expenses) // display data as soon as page reloaded
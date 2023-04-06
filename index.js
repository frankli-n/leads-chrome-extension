let myLeads = []
const inputEl = document.getElementById("input-el")
const saveBtn = document.getElementById("save-btn")
const tabBtn = document.getElementById("tab-btn")
const logBtn = document.getElementById("log-btn")
const ulEl = document.getElementById("ul-el")
const delBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

function render(x) {
    let listItems = ""
    for (let i = 0; i < x.length; i++) {
        if (Boolean(x[i])) {
            listItems += 
            `
            <li>${x[i]}</li>
            `
        }
    }
    ulEl.innerHTML = listItems
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})

saveBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})

delBtn.addEventListener("click", function() {
    console.log("delete clicked")
    localStorage.clear("myLeads")
    myLeads = []
    render(myLeads)
   
})
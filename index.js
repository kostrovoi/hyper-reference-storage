let myLeads = [];
const inputEl = document.getElementById('input-el');
const inputBtn = document.getElementById('input-btn');
const ulEl = document.getElementById('ul-el');
const deleteBtn = document.getElementById('delete-btn');
const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'));
const tabBtn = document.getElementById('tab-btn');

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

function render(whateverLeads) {
  let listItems = '';
  for (let i = 0; i < whateverLeads.length; i++) {
    listItems += `
        <li>
        <a target='_blank' href='${whateverLeads[i]}'>
        ${whateverLeads[i]}
        </a>
        </li>
        `;
  }
  ulEl.innerHTML = listItems;
}

inputBtn.addEventListener('click', function () {
  myLeads.unshift(inputEl.value);
  inputEl.value = '';
  localStorage.setItem('myLeads', JSON.stringify(myLeads));
  render(myLeads);
});

tabBtn.addEventListener('click', function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log(tabs);
    // since only one tab should be active and in the current window at once
    // the return variable should only have one entry
    // let activeTab = tabs[0]
    // or do whatever you need
    // let activeTabId = activeTab.id
    myLeads.unshift(tabs[0].url);
    localStorage.setItem('myLeads', JSON.stringify(myLeads));
    render(myLeads);
  });
});

deleteBtn.addEventListener('dblclick', function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

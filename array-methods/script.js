const main = document.getElementById('main');
const addUser = document.getElementById('add-user');
const double = document.getElementById('double');
const showMillionaires = document.getElementById('show-millionaires');
const sort = document.getElementById('sort');
const calculateWealth = document.getElementById('calculate-wealth');

// initial state
let wealthyPeople = [];

// create a random user
const getRandomUser = async () => {
  const res = await fetch('https://randomuser.me/api/');
  const data = await res.json();
  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };
  addToUsers(newUser);
}

// add user to the state
const addToUsers = (obj) => {
  wealthyPeople.push(obj);
  updateDOM();
}

// update the DOM
const updateDOM = (providedData = wealthyPeople) => {
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
    main.appendChild(element);
  });
}

// format number to money
const formatMoney = number => {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// double the wealth
const doubleMoney = () => {
  wealthyPeople = wealthyPeople.map(item => {
    return { ...item, money: item.money * 2 }
  });
  updateDOM();
}

// sort wealthy people
const sortByRichest = () => {
  wealthyPeople.sort((a, b) => b.money - a.money);
  updateDOM();
}

// show wealthy people
const showWealthyPeople = () => {
  wealthyPeople = wealthyPeople.filter(item => item.money >= 1000000);
  updateDOM();
}

// create sum of every wealth
const addMoney = () => {
  const sum = wealthyPeople.reduce((acc, item) => (
    acc += item.money
  ), 0);
  const totalWealth = document.createElement('div');
  totalWealth.innerHTML = `<h3>Total wealth: ${formatMoney(sum)}</h3>`;
  main.append(totalWealth);
}

// event listeners
addUser.addEventListener('click', getRandomUser);
double.addEventListener('click', doubleMoney);
sort.addEventListener('click', sortByRichest);
showMillionaires.addEventListener('click', showWealthyPeople);
calculateWealth.addEventListener('click', addMoney);

// create initial wealthy people
getRandomUser();
getRandomUser();
getRandomUser();
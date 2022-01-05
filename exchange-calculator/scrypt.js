const currency_one = document.getElementById('currency-one');
const amount_one = document.getElementById('amount-one');
const currency_two = document.getElementById('currency-two');
const amount_two = document.getElementById('amount-two');
const rate = document.getElementById('rate');
const swap = document.getElementById('swap');

const calculate = () => {
  const curr_one = currency_one.value;
  const curr_two = currency_two.value;
  const APIKEY = 'd2b0c8012b597b0564c68104';
  fetch(`https://v6.exchangerate-api.com/v6/${APIKEY}/latest/${curr_one}`)
    .then(res => res.json())
    .then(data => {
      const currency_rate = data.conversion_rates[curr_two];
      rate.innerHTML = `1 ${curr_one} = ${currency_rate} ${curr_two}`;
      amount_two.value = (amount_one.value * currency_rate).toFixed(2);
    })
}

const doSwap = () => {
  const temp = currency_one.value;
  currency_one.value = currency_two.value;
  currency_two.value = temp;
  calculate();
}

// event listeners
currency_one.addEventListener('change', calculate);
amount_one.addEventListener('input', calculate);
currency_two.addEventListener('change', calculate);
amount_two.addEventListener('input', calculate);
swap.addEventListener('click', doSwap);


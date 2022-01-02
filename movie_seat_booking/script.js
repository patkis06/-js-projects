const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

// value of the movie select
let ticketPrice = +movieSelect.value;

// event listeners
movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;
  const selectedMovieIndex = e.target.selectedIndex;

  localStorage.setItem('selectedMovieIndex', selectedMovieIndex);
  localStorage.setItem('selectedMoviePrice', ticketPrice);

  updateCount();
});

container.addEventListener('click', e => {
  const element = e.target;
  const classList = element.classList;
  if (classList.contains('seat') && !classList.contains('occupied')) {
    classList.toggle('selected');
    updateCount();
  }
});

// initialization
const init = () => {
  // get selected seats from localstorage
  let selectedSeats = localStorage.getItem('selectedSeats');
  if (selectedSeats) {
    selectedSeats = JSON.parse(selectedSeats);
  }
  // populate the UI from localstorage
  if (selectedSeats != null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }
  // get selected movie from localstorage
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  const selectedMoviePrice = localStorage.getItem('selectedMoviePrice');
  // populate the UI from localstorage
  if (selectedMovieIndex) {
    movieSelect.selectedIndex = selectedMovieIndex;
    ticketPrice = selectedMoviePrice;
  }
  // update the count and price text
  updateCount();
}


// update the count and price text
const updateCount = () => {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  // get the index of the selected seats
  const seatIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
  // store selected seats in localstorage
  localStorage.setItem('selectedSeats', JSON.stringify(seatIndex));
  // update texts
  const countSelectedSeats = selectedSeats.length;
  count.innerHTML = countSelectedSeats;
  total.innerHTML = countSelectedSeats * ticketPrice;
}

init();
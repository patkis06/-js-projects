const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;

const updateCount = () => {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const seatIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
  localStorage.setItem('selectedSeats', JSON.stringify(seatIndex));

  const countSelectedSeats = selectedSeats.length;
  count.innerHTML = countSelectedSeats;
  total.innerHTML = countSelectedSeats * ticketPrice;
}

const init = () => {
  let selectedSeats = localStorage.getItem('selectedSeats');
  if (selectedSeats) {
    selectedSeats = JSON.parse(selectedSeats);
  }
  if (selectedSeats != null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  const selectedMoviePrice = localStorage.getItem('selectedMoviePrice');
  if (selectedMovieIndex) {
    movieSelect.selectedIndex = selectedMovieIndex;
    ticketPrice = selectedMoviePrice;
  }
  updateCount();
}

init();

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
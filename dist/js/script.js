var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var container = document.querySelector('.container');
var seats = document.querySelectorAll('.row .seat:not(.occupied)');
var count = document.getElementById('count');
var total = document.getElementById('total');
var movieSelected = document.getElementById('movie');
var clearBtn = document.querySelector('.btn-clear');
var ticketPrice = parseInt(movieSelected.value);
populateUI();
// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}
// Update total and count
function updateSelectedCount() {
    var selectedSeats = document.querySelectorAll('.row .seat.selected');
    var selectedSeatsCount = selectedSeats.length;
    var seatsIndex = __spreadArrays(selectedSeats).map(function (seat) {
        return __spreadArrays(seats).indexOf(seat);
    });
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}
/*----- GET from localstorage -----*/
function populateUI() {
    var selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    var selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    // Update selected Seats
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach(function (seat, index) {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }
    // Update Selected Movie
    if (selectedMovieIndex !== null) {
        movieSelected.selectedIndex = selectedMovieIndex;
    }
}
/*----- Event Listeners -----*/
// Movie select event
movieSelected.addEventListener('change', function (e) {
    ticketPrice = parseInt(e.target.value);
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});
// Seat click event 
container.addEventListener('click', function (e) {
    if (e.target.classList.contains('seat') &&
        !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});
// Reset selection
clearBtn.addEventListener('click', function (e) {
    localStorage.clear();
    movieSelected.selectedIndex = 0;
    total.innerText = 0;
    count.innerText = 0;
    seats.forEach(function (seat) {
        if (seat.classList.contains("selected")) {
            seat.classList.remove('selected');
        }
    });
});
// Update for any values brought in by localstorage
updateSelectedCount();

const container: any = document.querySelector('.container');
const seats: any = document.querySelectorAll('.row .seat:not(.occupied)');
const count: any = document.getElementById('count');
const total: any = document.getElementById('total');
const movieSelected: any = document.getElementById('movie');
const clearBtn: any = document.querySelector('.btn-clear');

let ticketPrice: number = parseInt(movieSelected.value);

populateUI();

// Save selected movie index and price
function setMovieData(movieIndex: string, moviePrice: string): void {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}


// Update total and count
function updateSelectedCount(): void {
    const selectedSeats: any = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount: number = selectedSeats.length;

    const seatsIndex = [...selectedSeats].map((seat: any) => {
        return [...seats].indexOf(seat); 
    })    

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

/*----- GET from localstorage -----*/
function populateUI(): void {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    // Update selected Seats
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat: any, index: number): void => {
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
movieSelected.addEventListener('change', (e: any) => {
    ticketPrice = parseInt(e.target.value);
    
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
})

// Seat click event 
container.addEventListener('click', (e: any) => {
    if (
        e.target.classList.contains('seat') &&
        !e.target.classList.contains('occupied')
    ) {
        e.target.classList.toggle('selected');

        updateSelectedCount();
    }
});

// Reset selection
clearBtn.addEventListener('click', (e: any) => {
    localStorage.clear();

    movieSelected.selectedIndex = 0;
    total.innerText = 0;
    count.innerText = 0;

    seats.forEach((seat: any) => {
        if (seat.classList.contains("selected")) {
            seat.classList.remove('selected');
        }
    })
})

// Update for any values brought in by localstorage
updateSelectedCount();
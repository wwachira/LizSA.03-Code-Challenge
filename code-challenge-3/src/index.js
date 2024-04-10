//formated document for my visibility
console.log('working');
document.addEventListener('DOMContentLoaded', function () {  //eventing listening whole body


    //geting DOM ELements (structure and content of my web page .innerHtml)
    const filmList = document.querySelector('#films');
    const filmInfo = document.querySelector('#showing');
    const buyTicketButton = document.querySelector('#buy-ticket');

    //from my localhost db 
    fetch(`http://localhost:3000/films/1`) //get request from my local db 
        .then((response) => response.json())
        .then((film) => {

            //from my localhost db id:2
            fetch(`http://localhost:3000/films/2`) //get request from my local db 
                .then((response) => response.json())
                .then((film) => {
                


                    //i want to display the film details using query selector from my local db http://localhost:3000/films to my webpage
                    filmInfo.querySelector('#title').textContent = film.title;
                    filmInfo.querySelector('#runtime').textContent = film.runtime;
                    filmInfo.querySelector('#showtime').textContent = film.showtime;
                    filmInfo.querySelector('#film-info').textContent = film.description;
                    filmInfo.querySelector('#poster').src = film.poster;


                    //there has to be a number available for my tickets which is set on on my local db
                    const availableTickets = film.capacity - film.tickets_sold;
                    //display number of available tickets
                    filmInfo.querySelector('#ticket-num').textContent = availableTickets;

                    //my Selection statements if... else for checking the tickets (should do checks)
                    if (availableTickets === 0) {
                        buyTicketButton.disabled = true;
                        buyTicketButton.textContent = 'Sold Out';
                    } else {
                        buyTicketButton.disabled = false;
                        buyTicketButton.textContent = 'Buy Ticket';
                    }
                    //displaying my films to my webpage from my local db =>fetch the original live server link from my terminal
                    fetch(`http://localhost:3000/films`)
                        .then((response) => response.json())
                        .then((films) => {

                            const placeholder = document.querySelector('#films .film.item');
                            placeholder.remove();

                            //i want to display a new list  => creating and append, removed <li>above //sadly its still there :(, let me see..
                            films.forEach((film) => {
                                const li = document.createElement('li');
                                li.classList.add('film', 'item');
                                li.textContent = film.title;
                                filmList.appendChild(li);
                            });
                        });


                    //enacting my click event 
                    buyTicketButton.addEventListener('click', () => {
                        //fetching 1st film details from localhost db
                        fetch(`http://localhost:3000/films`)
                            .then((response) => response.json())
                            .then((film) => {

                                function clickButton(buyTicketButton) {
                                if (film.capacity - film.tickets_sold === 0) {
                                    buyTicketButton.disabled = true;
                                    buyTicketButton.textContent = 'Sold Out';
                                } else { //a PATCH request to update my ticket once sold, so my set available tickets keep udating
                                    fetch(`http://localhost:3000/films`, {
                                        method: 'PATCH',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({
                                            tickets_sold: film.tickets_sold + 1,
                                        }),
                                    })
                                        .then((response) => response.json())
                                        .then((updatedFilm) => {

                                            filmInfo.querySelector('#ticket-num').textContent = updatedFilm.capacity - updatedFilm.tickets_sold;

                                            //always checking to see if there are any tickets left
                                            if (updatedFilm.capacity - updatedFilm.tickets_sold === 0) {
                                                // Disable the buy ticket button and update the text
                                                buyTicketButton.disabled = true;
                                                buyTicketButton.textContent = 'Sold Out';
                                            }
                                        
                                        });
                                }
                      }  });
                    });


                });

        });
    });
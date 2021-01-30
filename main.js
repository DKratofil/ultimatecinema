const cijena = document.querySelector(".cijena");
// odabir stolica ukupno
let stolicaUkupno = document.querySelector(".stolicaUkupno");
//odabir brojeva mjesta
let mjestaA = document.querySelector(".mjestaA");
// odabir buttona
const potvrdi = document.querySelector(".btnPotvrdi");
// odabir film selectora
let film = document.getElementById("film");
// odabir sjedala
const sjedala = document.querySelectorAll(".sjedalo:not(.zauzeto)");

// globalne varijable
let removeSeat = false;
let seatRow = 0;
let seatNumber = 0;

// odaberi rows number i postavi vrijednosti za redove u htmlu
let rowNumb = document.querySelectorAll(".rowNumb");
rowNumb.forEach(element => {
    element.innerHTML = `${element.id}. red`;
});

//******************* update values funkcija */
const updateValues = (seatNumber, seatRow, removeSeat) => {
    // odaberi sjedala sa vrijednosti odabrano
    let seatSelected = document.querySelectorAll(".row .sjedalo.odabrano");
    // odaberi vrijeme za prikaz i oboji ga na klik
    const prikaz = document.querySelector('.prikaz');
    const vrijeme = document.querySelectorAll('.vrijeme');

    prikaz.addEventListener('click', e => {

        vrijeme.forEach(vrijeme => {

            if (vrijeme.getAttribute('id') === e.target.getAttribute('id'))
                vrijeme.classList.add('active');
            else
                vrijeme.classList.remove('active');
        });
    });


    // napravi array za lokalno spremanje podataka o zauzetim sjedalima
    let localStorageSeats = [...seatSelected].map(seat => {
        return [...sjedala].indexOf(seat);
    });
    // spremi odabrana sjedala u lokalnu memoriju browsera
    localStorage.setItem("stolica", JSON.stringify(localStorageSeats));

    // popuni podrucje sa informacija o mjestu
    if (seatNumber && seatRow !== undefined) {
        if (!removeSeat) {
            mjestaA.innerHTML += ` ${seatNumber}/${seatRow} -`;
            // spremi vrijednosti u lokalnu memoriju browsera
            localStorage.setItem("S&&F", mjestaA.innerHTML);
        } else {
            mjestaA.innerHTML = mjestaA.innerHTML.replace(
                ` ${seatNumber}/${seatRow} -`,
                ""
            );
            // spremi vrijednosti u lokalnu memoriju browsera
            localStorage.setItem("S&&F", mjestaA.innerHTML);
        }
    }
    // postavljanje cijene karte
    let ticket = film.value;
    // postavljanje broja ukupno stolica
    stolicaUkupno.innerHTML = seatSelected.length;
    // mnozenje cijene i broja stolica
    cijena.innerHTML = seatSelected.length * ticket;
};

//************ učitavanje podataka iz lokalne memorije browsera*/
let sjedalaNotSelected = document.querySelectorAll(".sjedalo:not(.odabrano)");
const loadData = () => {
    // ucitavanje podataka iz lokalne memorije
    let stolica = JSON.parse(localStorage.getItem("stolica"));
    let zauzeto = JSON.parse(localStorage.getItem("zauzeto"));

    // postavljanje odabira stolica
    if (stolica !== null && stolica.length > 0) {
        sjedala.forEach((stolica, index) => {
            if (stolica.indexOf(index) > -1) {
                stolica.classList.add("odabrano");
            }
        });
    }
    // postavljanje stolica zauzetima
    if (zauzeto !== null && zauzeto.length > 0) {
        sjedaloNotSelected.forEach((stolica, index) => {
            if (zauzeto.indexOf(index) > -1) {
                stolica.classList.add("zauzeto");
            }
        });
    }
};

//*************** odabir stolica uz dodavanje add event listenera */
const sjedalaReload = document.querySelectorAll(".sjedalo:not(.zauzeto");
sjedalaReload.forEach(element => {
    // postavi broj na stolicu
    element.innerHTML = element.id;
    // dodaj event listener za klik na stolicu
    element.addEventListener("click", () => {
        seatRow = element.parentElement.id;
        seatNumber = element.id;
        // rukovanje bojama
        if (element.classList.value == "sjedalo") {
            element.classList.add("odabrano");
            // postavi vrijednosti remove seat u false
            removeSeat = false;
            // napravi update
            updateValues(seatNumber, seatRow, removeSeat);
        } else {
            element.classList.remove("odabrano");
            // postavi remove varijable u true
            removeSeat = true;
            // napravi update
            updateValues(seatNumber, seatRow, removeSeat);
        }
    });
});

//kalendar

const date_picker_element = document.querySelector('.date-picker');
const selected_date_element = document.querySelector('.date-picker .selected-date');
const dates_element = document.querySelector('.date-picker .dates');
const mth_element = document.querySelector('.date-picker .dates .month .mth');
const next_mth_element = document.querySelector('.date-picker .dates .month .next-mth');
const prev_mth_element = document.querySelector('.date-picker .dates .month .prev-mth');
const days_element = document.querySelector('.date-picker .dates .days');

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;

mth_element.textContent = months[month] + ' ' + year;

selected_date_element.textContent = formatDate(date);
selected_date_element.dataset.value = selectedDate;

populateDates();

// event listeneri
date_picker_element.addEventListener('click', toggleDatePicker);
next_mth_element.addEventListener('click', goToNextMonth);
prev_mth_element.addEventListener('click', goToPrevMonth);

// funkcije
function toggleDatePicker(e) {
    if (!checkEventPathForClass(e.path, 'dates')) {
        dates_element.classList.toggle('active');
    }
}

function goToNextMonth(e) {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    mth_element.textContent = months[month] + ' ' + year;
    populateDates();
}

function goToPrevMonth(e) {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    mth_element.textContent = months[month] + ' ' + year;
    populateDates();
}

function populateDates(e) {
    days_element.innerHTML = '';
    let amount_days = 31;

    if (month == 1) {
        amount_days = 28;
    }

    for (let i = 0; i < amount_days; i++) {
        const day_element = document.createElement('div');
        day_element.classList.add('day');
        day_element.textContent = i + 1;

        if (selectedDay == (i + 1) && selectedYear == year && selectedMonth == month) {
            day_element.classList.add('selected');
        }

        day_element.addEventListener('click', function() {
            selectedDate = new Date(year + '-' + (month + 1) + '-' + (i + 1));
            selectedDay = (i + 1);
            selectedMonth = month;
            selectedYear = year;

            selected_date_element.textContent = formatDate(selectedDate);
            selected_date_element.dataset.value = selectedDate;

            populateDates();
        });

        days_element.appendChild(day_element);
    }
}

// dodatne funkcije
function checkEventPathForClass(path, selector) {
    for (let i = 0; i < path.length; i++) {
        if (path[i].classList && path[i].classList.contains(selector)) {
            return true;
        }
    }

    return false;
}

function formatDate(d) {
    let day = d.getDate();
    if (day < 10) {
        day = '0' + day;
    }

    let month = d.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }

    let year = d.getFullYear();

    return day + ' / ' + month + ' / ' + year;
}


//*****************button potvrdi event listener */
potvrdi.addEventListener("click", () => {
    let sjedalo = document.querySelectorAll(".sjedalo.odabrano");
    sjedalo.forEach(element => {
        element.classList.remove("odabrano");
        element.classList.add("zauzeto");
        // Clear all fields
        element.innerHTML = "";
        stolicaUkupno.innerHTML = "";
        cijena.innerHTML = "";
        mjestaA.innerHTML = "";
        // Clear localStorage
        localStorage.clear();
        // Save inside local Storage
        let seatBusySelec = document.querySelectorAll(".row .sjedalo.zauzeto");

        const localStorageSeatsOccupied = [...seatBusySelec].map(seat => {
            return [...sjedalaNotSelected].indexOf(seat);
        });

        // Save
        localStorage.setItem("zauzeto", JSON.stringify(localStorageSeatsOccupied));
    });
});
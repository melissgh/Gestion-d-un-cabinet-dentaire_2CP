

$("#ajouter_fiche").submit(function (event) {
    alert("Les donnees sont inseres avec succes");
})

$("#modifier_fiche").submit(function (event) {
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function (n, i) {
        data[n['name']] = n['value']
    })


    var request = {
        "url": `http://localhost:3000/api/fiches_medicales/${data.id}`,
        "method": "PUT",
        "data": data
    }

    $.ajax(request).done(function (response) {
        alert("les donnees sont modifies avec succees!");
    })

})


// Récupérer l'élément de l'icône de recherche
const iconRecherche = document.querySelector('.fa-magnifying-glass');
// Récupérer l'élément du formulaire de reccherche
const formRecherche = document.querySelector('#rechercher_fiche');
// Attacher un gestionnaire d'événement de clic à l'icône de recherche
iconRecherche.addEventListener('click', (event) => {
    event.preventDefault();
    // Soumettre le formulaire de recherche
    formRecherche.submit();
});


if (window.location.pathname == "/index-fiche") {
    $ondelete = $("table tbody td a.delete");
    $ondelete.click(function () {
        var id = $(this).attr("data-id")

        var request = {
            "url": `http://localhost:3000/api/fiches_medicales/${id}`,
            "method": "DELETE"
        }
        if (confirm("Voulez vous vraiment supprimer cette fiche ?")) {
            $.ajax(request).done(function (response) {
                alert("les donnees sont supprimes avec succes");
                location.reload();
            })
        }

    })
}

if (window.location.pathname == "/rechercher-fiche") {
    $ondelete = $("table tbody td a.delete");
    $ondelete.click(function () {
        var id = $(this).attr("data-id")

        var request = {
            "url": `http://localhost:3000/api/fiches_medicales/${id}`,
            "method": "DELETE"
        }
        if (confirm("Voulez vous vraiment supprimer cette fiche ?")) {
            $.ajax(request).done(function (response) {
                alert("les donnees sont supprimes avec succes");
                location.reload();
            })
        }

    })
}


const calendar = document.querySelector(".calendar"),
    date = document.querySelector(".date"),
    daysContainer = document.querySelector(".days"),
    prev = document.querySelector(".prev"),
    next = document.querySelector(".next"),
    todayBtn = document.querySelector(".today-btn"),
    gotoBtn = document.querySelector(".goto-btn"),
    dateInput = document.querySelector(".date-input"),
    eventDay = document.querySelector(".event-day"),
    eventDate = document.querySelector(".event-date"),
    eventsContainer = document.querySelector(".events"),
    addEventBtn = document.querySelector(".add-event"),
    addEventWrapper = document.querySelector(".add-event-wrapper "),
    addEventCloseBtn = document.querySelector(".close "),
    addEventTitle = document.querySelector(".event-name "),
    addEventTitle2 = document.querySelector(".event-prename "),
    addEventTitle3 = document.querySelector(".event-cons "),
    addEventTo = document.querySelector(".event-time-to "),
    addEventSubmit = document.querySelector(".add-event-btn ");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre"
];

// const eventsArr = [
//   {
//     day: 13,
//     month: 11,
//     year: 2022,
//     events: [
//       {
//         title: "Event 1 lorem ipsun dolar sit genfa tersd dsad ",
//         time: "10:00 AM",
//       },
//       {
//         title: "Event 2",
//         time: "11:00 AM",
//       },
//     ],
//   },
// ];

const eventsArr = [];
getEvents();
console.log(eventsArr);

//function to add days in days with class day and prev-date next-date on previous month and next month days and active on today
function initCalendar() {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;

    date.innerHTML = months[month] + " " + year;

    let days = "";

    for (let x = day; x > 0; x--) {
        days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
    }

    for (let i = 1; i <= lastDate; i++) {
        //check if event is present on that day
        let event = false;
        eventsArr.forEach((eventObj) => {
            if (
                eventObj.day === i &&
                eventObj.month === month + 1 &&
                eventObj.year === year
            ) {
                event = true;
            }
        });
        if (
            i === new Date().getDate() &&
            year === new Date().getFullYear() &&
            month === new Date().getMonth()
        ) {
            activeDay = i;
            getActiveDay(i);
            updateEvents(i);
            if (event) {
                days += `<div class="day today active event">${i}</div>`;
            } else {
                days += `<div class="day today active">${i}</div>`;
            }
        } else {
            if (event) {
                days += `<div class="day event">${i}</div>`;
            } else {
                days += `<div class="day ">${i}</div>`;
            }
        }
    }

    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="day next-date">${j}</div>`;
    }
    daysContainer.innerHTML = days;
    addListner();
}

//function to add month and year on prev and next button
function prevMonth() {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    initCalendar();
}

function nextMonth() {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    initCalendar();
}

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

initCalendar();

//function to add active on day
function addListner() {
    const days = document.querySelectorAll(".day");
    days.forEach((day) => {
        day.addEventListener("click", (e) => {
            getActiveDay(e.target.innerHTML);
            updateEvents(Number(e.target.innerHTML));
            activeDay = Number(e.target.innerHTML);
            //remove active
            days.forEach((day) => {
                day.classList.remove("active");
            });
            //if clicked prev-date or next-date switch to that month
            if (e.target.classList.contains("prev-date")) {
                prevMonth();
                //add active to clicked day afte month is change
                setTimeout(() => {
                    //add active where no prev-date or next-date
                    const days = document.querySelectorAll(".day");
                    days.forEach((day) => {
                        if (
                            !day.classList.contains("prev-date") &&
                            day.innerHTML === e.target.innerHTML
                        ) {
                            day.classList.add("active");
                        }
                    });
                }, 100);
            } else if (e.target.classList.contains("next-date")) {
                nextMonth();
                //add active to clicked day afte month is changed
                setTimeout(() => {
                    const days = document.querySelectorAll(".day");
                    days.forEach((day) => {
                        if (
                            !day.classList.contains("next-date") &&
                            day.innerHTML === e.target.innerHTML
                        ) {
                            day.classList.add("active");
                        }
                    });
                }, 100);
            } else {
                e.target.classList.add("active");
            }
        });
    });
}

todayBtn.addEventListener("click", () => {
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar();
});

dateInput.addEventListener("input", (e) => {
    dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
    if (dateInput.value.length === 2) {
        dateInput.value += "/";
    }
    if (dateInput.value.length > 7) {
        dateInput.value = dateInput.value.slice(0, 7);
    }
    if (e.inputType === "deleteContentBackward") {
        if (dateInput.value.length === 3) {
            dateInput.value = dateInput.value.slice(0, 2);
        }
    }
});

gotoBtn.addEventListener("click", gotoDate);

function gotoDate() {
    console.log("here");
    const dateArr = dateInput.value.split("/");
    if (dateArr.length === 2) {
        if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
            month = dateArr[0] - 1;
            year = dateArr[1];
            initCalendar();
            return;
        }
    }
    alert("Invalid Date");
}

//function get active day day name and date and update eventday eventdate
function getActiveDay(date) {
    const day = new Date(year, month, date);

    const dayName = day.toString().split(" ")[0];
    eventDay.innerHTML = dayName;
    eventDate.innerHTML = date + " " + months[month] + " " + year;
}

//function update events when a day is active
function updateEvents(date) {
    let events = "";
    eventsArr.forEach((event) => {
        if (
            date === event.day &&
            month + 1 === event.month &&
            year === event.year
        ) {
            event.events.forEach((event) => {
                events += `<div class="event">
          <div class="title">
            <i class="fas fa-circle"></i>
            <h3 class="event-title">${event.title}</h3>
          </div>
          <div class="event-time">
            <span class="event-time">${event.time}</span>
          </div>
      </div>`;
            });
        }
    });
    if (events === "") {
        events = `<div class="no-event">
          <h3>Aucun Rendez-vous</h3>
      </div>`;
    }
    eventsContainer.innerHTML = events;
    saveEvents();
}

//function to add event
addEventBtn.addEventListener("click", () => {
    addEventWrapper.classList.toggle("active");
});

addEventCloseBtn.addEventListener("click", () => {
    addEventWrapper.classList.remove("active");
});

document.addEventListener("click", (e) => {
    if (e.target !== addEventBtn && !addEventWrapper.contains(e.target)) {
        addEventWrapper.classList.remove("active");
    }
});

//allow 50 chars in eventtitle
addEventTitle.addEventListener("input", (e) => {
    addEventTitle.value = addEventTitle.value.slice(0, 60);
});
addEventTitle2.addEventListener("input", (e) => {
    addEventTitle2.value = addEventTitle2.value.slice(0, 60);
});

addEventTitle3.addEventListener("input", (e) => {
    addEventTitle3.value = addEventTitle3.value.slice(0, 60);
});



addEventTo.addEventListener("input", (e) => {
    addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
    if (addEventTo.value.length === 2) {
        addEventTo.value += ":";
    }
    if (addEventTo.value.length > 5) {
        addEventTo.value = addEventTo.value.slice(0, 5);
    }
});

//function to add event to eventsArr
addEventSubmit.addEventListener("click", () => {
    const eventTitle = addEventTitle.value;
    const eventTitle2 = addEventTitle2.value;
    const eventTitle3 = addEventTitle3.value;
    const eventTimeTo = addEventTo.value;
    if (eventTitle === "" || eventTitle2 === "" || eventTitle3 === "" || eventTimeTo === "") {
        alert("veuillez remplir toutes les cases s-il vous plaît");
        return;
    }

    //check correct time format 24 hour
    const timeToArr = eventTimeTo.split(":");
    if (

        timeToArr.length !== 2 ||

        timeToArr[0] > 17 ||
        timeToArr[1] > 59 ||
        timeToArr[0] < 8
    ) {
        alert("Format invalide , les rendez-vous commencent de 8h à 17h");
        return;
    }


    const timeTo = convertTime(eventTimeTo);

    //check if event is already added
    let eventExist = false;
    eventsArr.forEach((event) => {
        if (
            event.day === activeDay &&
            event.month === month + 1 &&
            event.year === year
        ) {
            event.events.forEach((event) => {
                if (event.title === eventTitle + " " + eventTitle2) {
                    eventExist = true;
                }
            });
        }
    });
    if (eventExist) {

        return alert("Ce rende-vous existe déja");
    }
    const newEvent = {
        title: eventTitle + " " + eventTitle2,
        time: "motif de consultation:" + eventTitle3 + " " + timeTo,
    };
    console.log(newEvent);
    console.log(activeDay);
    let eventAdded = false;
    if (eventsArr.length > 0) {
        eventsArr.forEach((item) => {
            if (
                item.day === activeDay &&
                item.month === month + 1 &&
                item.year === year
            ) {
                item.events.push(newEvent);
                eventAdded = true;
            }
        });
    }

    if (!eventAdded) {
        eventsArr.push({
            day: activeDay,
            month: month + 1,
            year: year,
            events: [newEvent],
        });
    }

    console.log(eventsArr);
    addEventWrapper.classList.remove("active");
    addEventTitle.value = "";
    addEventTitle2.value = "";
    addEventTo.value = "";
    updateEvents(activeDay);
    //select active day and add event class if not added
    const activeDayEl = document.querySelector(".day.active");
    if (!activeDayEl.classList.contains("event")) {
        activeDayEl.classList.add("event");
    }
});

//function to delete event when clicked on event
eventsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("event")) {
        if (confirm("êtes-vous sûr pour supprimer ce rendez-vous ?")) {
            const eventTitle = e.target.children[0].children[1].innerHTML;
            eventsArr.forEach((event) => {
                if (
                    event.day === activeDay &&
                    event.month === month + 1 &&
                    event.year === year
                ) {
                    event.events.forEach((item, index) => {
                        if (item.title === eventTitle) {
                            event.events.splice(index, 1);
                        }
                    });
                    //if no events left in a day then remove that day from eventsArr
                    if (event.events.length === 0) {
                        eventsArr.splice(eventsArr.indexOf(event), 1);
                        //remove event class from day
                        const activeDayEl = document.querySelector(".day.active");
                        if (activeDayEl.classList.contains("event")) {
                            activeDayEl.classList.remove("event");
                        }
                    }
                }
            });
            updateEvents(activeDay);
        }
    }
});

//function to save events in local storage
function saveEvents() {
    localStorage.setItem("events", JSON.stringify(eventsArr));
}

//function to get events from local storage
function getEvents() {
    //check if events are already saved in local storage then return event else nothing
    if (localStorage.getItem("events") === null) {
        return;
    }
    eventsArr.push(...JSON.parse(localStorage.getItem("events")));
}

function convertTime(time) {
    //convert time to 24 hour format
    let timeArr = time.split(":");
    let timeHour = timeArr[0];
    let timeMin = timeArr[1];
    let timeFormat = timeHour >= 12 ? "PM" : "AM";
    timeHour = timeHour % 12 || 12;
    time = timeHour + ":" + timeMin + " " + timeFormat;
    return time;
}

/*

const form=document.querySelector('#modifier_fiche');
form.addEventListener('submit',(event)=>{
  event.preventDefault();
  const nom=form.querySelector("#nom");
  const prenom=form.querySelector("#prenom");
  const email=form.querySelector("#mail");
  const date=form.querySelector("#date_naissance");
  const lieu=form.querySelector("#lieu_naissance");
  const sexe=form.querySelector("#sexe");
  const tel=form.querySelector("#telephone");
  const profession=form.querySelector("#profession");
  var erreur=false;
  if (nom.value==="" || prenom.value==="" || email.value==="" || date.value==="" || lieu.value==="" || sexe.value==="" || tel.value===""  || profession.value==""||nom.value.length<2 || nom.value.length>20||prenom.value.length<2 || prenom.value.length>20
  || telephone.value.length!=10||date.value.length!=10){
    erreur=true;
  if(nom.value==="" || prenom.value==="" || email.value==="" || date.value==="" || lieu.value==="" || sexe.value==="" || tel.value===""  || profession.value==""  ){
      alert("veuillez remplir tous les champs");
     
  }
  
  if(nom.value.length<2 || nom.value.length>20 ){
      alert("le nom doit avoir oumoin 2 caractères et en plus 20 caractères");
     
  }
  if(prenom.value.length<2 || prenom.value.length>20 ){
      alert("le prénom doit avoir oumoin 2 caractères et en plus 20 caractères");
    
  }
  if(telephone.value.length!=10 ){
    alert(" le numéro n'est pas valide le numéro de téléphoner doit commencer par 0 et avoir 10 chiffres   ");
    
}
if (date.value.length!=10){
  alert("date invalide");}
   }
if(erreur){
  alert("bravo cous avez réussi");}
else {alert("izan");}

});*/


function validerFormulaire() {
    // Récupération des valeurs des champs
    let nom = document.getElementById("nom").value.trim();
    let prenom = document.getElementById("prenom").value.trim();
    let email = document.getElementById("email").value.trim();
    let telephone = document.getElementById("telephone").value.trim();
    let date_naissance = document.getElementById("date_naissance").value.trim();

    // Vérification des champs obligatoires
    if (nom === "" || prenom === "" || email === "" || telephone === "" || date_naissance === "") {
        alert("Veuillez remplir tous les champs obligatoires.");
        return false;
    }

    // Vérification de la longueur du nom et du prénom
    if (nom.length < 2 || nom.length > 20 || prenom.length < 2 || prenom.length > 20) {
        alert("Le nom et le prénom doivent avoir une taille entre 2 et 20 caractères.");
        return false;
    }

    // Vérification du format de l'email
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Veuillez saisir une adresse email valide.");
        return false;
    }

    // Vérification du format du numéro de téléphone
    let telephoneRegex = /^(05|06|07)\d{8}$/;
    if (!telephoneRegex.test(telephone)) {
        alert("Le numéro de téléphone doit avoir exactement 10 chiffres et commencer par 05, 06 ou 07.");
        return false;
    }

    // Vérification du format de la date de naissance
    let dateRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    if (!dateRegex.test(date_naissance)) {
        alert("Veuillez saisir une date de naissance au format jj/mm/aaaa.");
        return false;
    }

    // Si tous les champs sont valides, afficher un message de félicitation
    alert("La Fiche patient est bien ajoutée !");
    return true;
}

function toggleDropdown() {
    var x = document.getElementById('rdv2');
    if (x.style.display === "none") {
        x.style.display = "block";
    }
    else {
        x.style.display = "none";

    }
}
// valider le formulairede changement de mot de passe pour l'assistante 
function validateFormulaire() {
    var ancienPsw = document.getElementById("ancienpsw").value;
    var nouveauPsw = document.getElementById("nouveaupsw").value;
    var confNouveauPsw = document.getElementById("confnouveaupsw").value;
    if (nouveauPsw === "" || confNouveauPsw === "" || ancienPsw === "") {
        alert("veuillez remplir tout les champs ");
        return false;
    }
    if (nouveauPsw !== confNouveauPsw) {
        alert("Les nouveaux mots de passe ne correspondent pas.");
        return false;
    }

    if (ancienPsw === nouveauPsw) {
        alert("Le nouveau mot de passe doit être différent de l'ancien.");
        return false;
    }

    alert("Le mot de passe a été changé avec succès !");
    return true;
}





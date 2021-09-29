
/*
    Fetch Requests
*/

async function fetchUserData(url) {
    const userDataResponse = await fetch(url);
    const data = await userDataResponse.json();
    return data;
}


fetchUserData('https://randomuser.me/api/?results=12')
     .then(data => generateUserProfile(data.results))
     .then( () => {
         const userCards = document.querySelectorAll('.card');

         userCards.forEach(card => {
             card.addEventListener('click', () => {
                 generateUserModal();
            });
        });
     })


/*
   Generate User Profile Gallery
*/

function generateUserProfile (data) {
    
    for(let i = 0; i < data.length; i++) {
            const image = data[i].picture.medium;
            const firstName = data[i].name.first;
            const lastName = data[i].name.last;
            const email = data[i].email;
            const city = data[i].location.city;
            const state = data[i].location.state;

            const  html = `
                <div class="card">
                    <div class="card-img-container">
                        <img class="card-img" src=${image} alt="profile picture">
                    </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${firstName} ${lastName}</h3>
                        <p class="card-text">${email}</p>
                        <p class="card-text cap">${city}, ${state}</p>
                    </div>
                </div>
            `
            const galleryDisplay = document.getElementById('gallery');
            galleryDisplay.insertAdjacentHTML('beforeend', html);
        }
}

/*
    Generate User Modal
*/

function generateUserModal () {
    const bodyElement = document.querySelector('body');
    const modalDiv = document.createElement('div');
    bodyElement.appendChild(modalDiv);
    const modalHTML = `
        <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
                    <h3 id="name" class="modal-name cap">name</h3>
                    <p class="modal-text">email</p>
                    <p class="modal-text cap">city</p>
            <hr>
                    <p class="modal-text">(555) 555-5555</p>
                    <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
                    <p class="modal-text">Birthday: 10/21/2015</p>
            </div>
        </div>
    `
    modalDiv.insertAdjacentHTML('beforeend', modalHTML);
    modalDiv.style.display = 'block';
}

/*
    Event Handlers
*/


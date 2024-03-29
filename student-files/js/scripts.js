
/* 
    Generating employee directory gallery & employee modal
*/ 

generateUserProfiles('https://randomuser.me/api/?results=12&nat=us')
    .then(data => {  

        //event listener for newly created user profiles
        const userProfiles = document.querySelectorAll('.card');
        for(let i = 0; i < userProfiles.length; i++) {
            userProfiles[i].addEventListener('click', (e) => {
                const userEventIndex = [i];
                generateUserModal(data, userEventIndex);
            });
        }
    });

/*
    Helper Functions
*/

    /**
        *   [Fetch function that converts call requests to json]
 	    *
 	    * @param {string} url - [url of the API you wish to fetch]
        * @return {[promise]} [fetched API formatted in json]
    **/

async function fetchUserData(url) {
    const userDataResponse = await fetch(url);
    const data = await userDataResponse.json();
    return data;
}

   /**
        *   [Generates employee directory gallery]
 	    *
 	    * @param {[string]} url - [url of the API you wish to fetch]
        * @return {[object]} [object with data parsed to show results of fetch]
    **/
    
async function generateUserProfiles (url) {
    const userInfo = await fetchUserData(url);
    const data = userInfo.results;
    
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
    return data
}

    /**
        *   [Generates user modal]
 	    *
 	    * @param {[object]} data - [object with employees' results listed]
        * @param {[object]} userEventIndex - [object with selected employee's index]
    **/

function generateUserModal (data, userEventIndex) {
    const userData = data[userEventIndex];

    const firstName = userData.name.first;
    const lastName = userData.name.last;
    const image = userData.picture.large;
    const email = userData.email;
    const city = userData.location.city;
    const cellNumber = userData.cell;
    const streetNumber = userData.location.street.number;
    const streetName = userData.location.street.name;
    const state = userData.location.state;
    const postCode = userData.location.postcode; 
    const birthday = userData.dob.date;

    // Formatting birthday variable 
    const properBirthday = birthdayFormatConverter(birthday);

    // Formatting cell number
    const properCellNumber = convertPhoneNumber(cellNumber);


    const bodyElement = document.querySelector('body');
    const modalDiv = document.createElement('div');
    bodyElement.appendChild(modalDiv);
    const modalHTML = `
        <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                <img class="modal-img" src="${image}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${firstName} ${lastName}</h3>
                    <p class="modal-text">${email}</p>
                    <p class="modal-text cap">${city}</p>
            <hr>
                    <p class="modal-text">${properCellNumber}</p>
                    <p class="modal-text">${streetNumber} ${streetName}, ${city}, ${state} ${postCode}</p>
                    <p class="modal-text">Birthday: ${properBirthday}</p>
            </div>
        </div>
    `
    modalDiv.insertAdjacentHTML('beforeend', modalHTML);
    modalDiv.style.display = 'block';

    const closeModalButton = document.getElementById('modal-close-btn');
    closeModalButton.addEventListener('click', closeModal);
}

   /**
        *   [Converts phone number to proper format]
 	    *
 	    * @param {[string]} userPhoneNumber - [phone number that needs to be converted]
        * @returns {[string]} [returns phone number in proper formatting]
    **/

function convertPhoneNumber(userPhoneNumber) {
        const onlyNumericString = userPhoneNumber.replace(/[^0-9]/g, "");

        const areaCode = onlyNumericString.slice(0, 3);
        const cellPart1 = onlyNumericString.slice(3, 6);
        const cellPart2 = onlyNumericString.slice(6, 10);
        const properCellNumber = `(${areaCode}) ${cellPart1}-${cellPart2}`;

        return properCellNumber;
}

   /**
        *   [Converts birth date to proper format]
 	    *
 	    * @param {[string]} userBirthday - [birth date that needs to be converted]
        * @returns {[string]} [returns birth date in proper formatting]
    **/

function birthdayFormatConverter (userBirthday) {
    const birthDate = userBirthday.substring(0, 10);
    const acceptableDateFormat = /^\d{2}\/\d{2}\/\d{4}$/;
    const status = acceptableDateFormat.test(birthDate);
   
    if(!status) {
        const convertedDate = new Date(birthDate).toLocaleDateString(
            "en-US", { month: "2-digit", day: "2-digit", year: "numeric"})
        return convertedDate
    } else {
        return birthDate
    }
}

    /**
        *   [Closes Modal]
    **/

function closeModal () {
    const div = document.querySelector('.modal-container');
    div.remove();
}
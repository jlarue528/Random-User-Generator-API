
/* 
    Generating user profiles & User Modal
*/ 

generateUserProfiles('https://randomuser.me/api/?results=12&nat=us')
    .then(data => {  

        //event listeners for newly created user profiles

        const userNames = document.querySelectorAll('#name');
        for(let i = 0; i < userNames.length; i++) {
            userNames[i].addEventListener('click', (e) => {
                const userEventIndex = [i];
                generateUserModal(data, userEventIndex);
            });
        }

        const userImages = document.querySelectorAll('.card-img');
        for(let i = 0; i < userImages.length; i++) {
            userImages[i].addEventListener('click', (e) => {
                const userEventIndex = [i];
                generateUserModal(data, userEventIndex);
            });
        }
    });


/*
    Helper Functions
*/


    /*
        Fetch Request Function
    */

async function fetchUserData(url) {
    const userDataResponse = await fetch(url);
    const data = await userDataResponse.json();
    return data;
}


    /*
        Generate User Profile Gallery
    */

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

    /*
        Generate User Modal
    */

async function generateUserModal (data, userEventIndex) {
    const userData = data[userEventIndex];

    const firstName = userData.name.first;
    const lastName = userData.name.last;
    const image = userData.picture.thumbnail;
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
    closeModalButton.onclick = () => modalDiv.style.display = 'none';
}

    /*
        convert phone number function
    */

function convertPhoneNumber(userPhoneNumber) {
        const onlyNumericString = userPhoneNumber.replace(/[^0-9]/g, "");

        const areaCode = onlyNumericString.slice(0, 3);
        const cellPart1 = onlyNumericString.slice(3, 6);
        const cellPart2 = onlyNumericString.slice(6, 10);
        const properCellNumber = `(${areaCode}) ${cellPart1}-${cellPart2}`;

        return properCellNumber;
}

    /*
        convert birthday date function
    */

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
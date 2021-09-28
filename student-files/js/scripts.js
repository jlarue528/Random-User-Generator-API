
/*
    Fetch Requests
*/

async function fetchUserData(url) {
    const userDataResponse = await fetch(url);
    const data = await userDataResponse.json();
    return data;
}

fetchUserData('https://randomuser.me/api/?results=12')
    .then(data => generateUserProfile(data))

/*
   Generate User Profile Gallery
*/

function generateUserProfile (data) {
        const results = data.results;
    
        for(let i = 0; i < results.length; i++) {
            const image = JSON.stringify(data.results[i].picture.medium);
            const firstName = data.results[i].name.first;
            const lastName = data.results[i].name.last;
            const email = data.results[i].email;
            const city = data.results[i].location.city;
            const state = data.results[i].location.state;

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



/*
    Fetch Requests
*/

async function fetchUserData(url) {
    const userDataResponse = await fetch(url);
    const data = await userDataResponse.json();
    return data;
}

    fetchUserData('https://randomuser.me/api/?results=12')
        .then(data => generateUserProfile(data));

/*
   Generate User Profile Gallery
*/

const galleryDisplay = document.getElementById('gallery');
function generateUserProfile (data) {
        const image = JSON.stringify(data.results[0].picture.medium);
        const firstName = JSON.stringify(data.results[0].name.first);
        const lastName = JSON.stringify(data.results[0].name.last);
        const email = JSON.stringify(data.results[0].email);
        const city = JSON.stringify(data.results[0].location.city);
        const state = JSON.stringify(data.results[0].location.state);
        
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
    console.log(html);
    galleryDisplay.insertAdjacentHTML('beforeend', html);
}


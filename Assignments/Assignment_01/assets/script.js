//defining the variables

//buttons
const rememberButton = document.getElementById('add-btn');
const listButton = document.getElementById('list-view-btn');
const cardButton = document.getElementById('card-view-btn');

//elements from inputs
const songInput=document.getElementById('song-name');
const artistInput=document.getElementById('artist-name');
const linkInput=document.getElementById('link');
//const coverInput=document.getElementById('album-cover');
const colorPicker=document.getElementById('border-color');

//the list element
const songList=document.getElementById('song-list-container');

//Functions

//Switching between Card view and List view
listButton.addEventListener('click', ()=>{
    console.log('List button pressed!');

    songList.classList.remove('card-view');
    songList.classList.add('list-view');
})

cardButton.addEventListener('click', ()=>{
    console.log('Card button pressed!');

    songList.classList.remove('list-view');
    songList.classList.add('card-view');
})

const ERASE = document.getElementById('erase');

    ERASE.addEventListener("click",() =>{
        songList.innerHTML = "";
    })

//Adding content

rememberButton.addEventListener('click',()=>{
    console.log('Remember button pressed!');

    const newSong = document.createElement('li');
    newSong.style.margin = "20px 0"; 
    newSong.classList.add('song-list-item');

    const card = document.createElement('div');
    card.classList.add('songname-artist-card');

    const songTitle = document.createElement('h2');
    songTitle.classList.add('song-name');
    songTitle.textContent = songInput.value ;

    const artistName = document.createElement('h3');
    artistName.classList.add('artist-name');
    artistName.textContent = artistInput.value ;

    const songLink = document.createElement('a');
    songLink.classList.add('link');
    songLink.href = linkInput.value;
    songLink.target = '_blank';

    // const colorBox = document.createElement('div');
    // colorBox.style.height = '5px';
    // colorBox.style.width = '100%';
    // colorBox.style.backgroundColor = colorPicker.value;

    card.style.border = `3px solid ${colorPicker.value}`;

    card.appendChild(songTitle);
    card.appendChild(artistName);

    songLink.appendChild(card);

    newSong.appendChild(songLink);

    songList.appendChild(newSong);

    songInput.value = ''; 
    artistInput.value = '';
    linkInput.value = '';

    });














    // const song = songInput.value;
    // const artist = artistInput.value;
    // const color = colorPicker.value;

    // const newSong = document.createElement('li');




    // newSong.classList.add('added-song-list-item');




    
    
    // songList.appendChild(newSong);

//})

    




















// let CARD = document.createElement("li");

    // let LINK = document.createElement("a");
    // let divCONTAINER = document.createElement("div");
    // let COVER = document.createElement("img");
    // let songName = document.createElement("h2");
    // let artistName = document.createElement("h3");

    // CARD.append(LINK);

    





   // parentElement.append(document.createElement('div'), 'Hello', document.createElement('span'));




    //const inputValue = songInput.value;

    /////////////
    // const name = songInput.value.trim();
    // const artist = artistInput.value.trim();
    // const link = linkInput.value.trim();
    // const image = coverInput.files?.[0];
    // const color = colorPicker.value;

/////////////////
    // const imageUrl = image ? URL.createObjectURL(image) : '';
    // const imageHtml = imageUrl ? `<img src="${imageUrl}" alt="${name} Cover" class="cover-image">` : '';
    
    
    // const listElement = document.createElement('li');
    // listElement.classList.add('added-song-list-item');

    // const anchorElement = document.createElement('a');
    // anchorElement.href = link || "#" ;
    // anchorElement.target = "_blank";

    // const cardDiv = document.createElement('div');
    // cardDiv.classList.add('songname-artist-card');

    // cardDiv.innerHTML = `
    //     ${imageHtml}
    //     <h2 class="song-name">${name}</h2>
    //     <h3 class="artist-name">${artist}</h3>
    //     <button class="remove-btn">X</button> 
    // `;

    // listElement.style.borderColor = color;
    // listElement.style.borderStyle = "solid";
    // listElement.style.borderWidth = '5px';

    // anchorElement.appendChild(cardDiv);
    // listElement.appendChild(anchorElement);

    // songList.appendChild(listElement);

    // songInput.value = '';
    // artistInput.value = '';
    // linkInput.value = '';
    // coverInput.value = ''; 
    // });

////////////////

    //const listElement = document.createElement('li');
    


// ERASE.addEventListener('click', ()=>{
//     console.log("Erase all pressed!");
//     songList.innerHTML = "";
// });


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
    //newSong.style.margin = "20px 0"; 
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

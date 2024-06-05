const highscoree = document.getElementById('highscoree');
const currentscoree = localStorage.getItem('currentscoree');
highscoree.innerText = currentscoree;
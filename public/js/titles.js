//slice titles that are too large to fit on one row
var gameTitles = document.querySelectorAll('.game-title');
for (let i = 0; i < gameTitles.length; i++) {
  let idealTitle = gameTitles[i].textContent.slice(0, 32) + '...';
  if (gameTitles[i].textContent.length > 35) {
    gameTitles[i].textContent = idealTitle;
  }
}

//this is to toggle between dark and light mode
function toggleMode() {
  const toggleBall = document.querySelector('.toggle-ball');
  const items = document.querySelectorAll(
    '.night-mode, .toggle-ball, .toggle,.game,.featured-container,.intro,.main-container,.container,.dropdown-name,.dropdown-content,.selection,.filter_btn,.labels,.game-title'
  );

  toggleBall.addEventListener('click', () => {
    items.forEach((item) => {
      item.classList.toggle('active');
    });

    document.body.classList.toggle('dark'); //toggle the HTML body the class 'dark'

    if (document.body.classList.contains('dark')) {
      //when the body has the class 'dark' currently
      localStorage.setItem('darkMode', 'enabled'); //store this data if dark mode is on
    } else {
      localStorage.setItem('darkMode', 'disabled'); //store this data if dark mode is off
    }
  });

  if (localStorage.getItem('darkMode') == 'enabled') {
    document.body.classList.toggle('dark');
    items.forEach((item) => {
      item.classList.toggle('active');
    });
  }
}

toggleMode();

//profile feature not ready yet.
document.querySelector('.profile-text-container').addEventListener('click', () => {
  alert('Sorry, Work in progress. Profiles Not Available Yet');
});

document.querySelector('.profile-picture').addEventListener('click', () => {
  alert('Sorry, Work in progress. Profiles Not Available Yet');
});

document.querySelector('.profile-picture').addEventListener('click', () => {
  alert('Sorry, Work in progress. Profiles Not Available Yet');
});
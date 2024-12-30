// scripts.js
const navj=document.querySelector('.navigation');
console.log(navj);
function openPopup(popupId) {
  document.getElementById(popupId).style.display = "block";
  navj.classList.add('hide');
}

function closePopup(popupId) {
  document.getElementById(popupId).style.display = "none";
  navj.classList.remove('hide');
}

// Close the popup if the user clicks outside of it
window.onclick = function (event) {
  var popups = document.getElementsByClassName("popup");

  for (var i = 0; i < popups.length; i++) {
    if (event.target == popups[i]) {
      popups[i].style.display = "none";
    }
  }
};

// Mobile menu
var menuToggle = document.getElementById('menu-toggle');
if (menuToggle) {
  menuToggle.addEventListener('click', function (e) {
    document.body.classList.toggle('menu--opened');
    e.preventDefault();
  }, false);

  document.body.classList.remove('menu--opened');

  window.addEventListener('resize', function () {
    if (menuToggle.offsetParent === null) {
      document.body.classList.remove('menu--opened');
    }
  }, true);
}

window.onload = function() {
// Header background image
console.log("fooo");
var header = document.querySelector('#masthead');
if (header) {
  headerBg = document.querySelector('#header-bg');
  if (headerBg) {
    imagesLoaded(headerBg, { background: true }, function () {
      header.classList.add('bg--loaded');
    });
  } else {
    header.classList.add('bg--loaded');
  }
}
}

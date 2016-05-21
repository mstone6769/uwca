function toggleParentClass(elem, className) {
  elem.parentNode.classList.toggle(className);
}

function addParentClass(elem, className) {
      elem.parentNode.classList.add(className);
}

function removeParentClass(elem, className) {
      elem.parentNode.classList.remove(className);
}

function toggleMenu() {
  var elem = document.getElementById('main-nav');
  elem.classList.toggle('menu-on');
}
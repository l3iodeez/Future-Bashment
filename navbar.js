(function (root) {
var BensNavBar = root.BensNavBar = {};
BensNavBar.touch = false;

BensNavBar.addClass = function (element, newClass) {
  console.log('added ' + newClass + ' to ' + element.id);
  classList = element.className.split(' ');
  for (var i = 0; i < classList.length; i++) {
    if (classList[i] === newClass) {
      return classList.join(' ');
    }
  }

  element.className = classList + ' ' + newClass;
};

BensNavBar.removeClass = function (element, removalClass) {
  console.log('removed ' + removalClass + ' from ' + element.id);
  var classList = element.className.split(' ');
  for (var i = 0; i < classList.length; i++) {
    if (classList[i] === removalClass) {
      classList.splice(i, 1);
    }
  }

  element.className = classList.join(' ');
};

BensNavBar.hoverOn = function (element) {
  if (element !== BensNavBar.currentHoverElement) {
    if (typeof BensNavBar.currentHoverElement !== 'undefined') {
      BensNavBar.removeClass(BensNavBar.currentHoverElement, 'hoveron');
    }

    if (typeof element !== 'undefined' &&
        ['fb-link', 'link2', 'link3', 'link4', 'link5'].includes(element.id)) {
      BensNavBar.addClass(element, 'hoveron');
      BensNavBar.currentHoverElement = element;
    } else {
      BensNavBar.currentHoverElement = undefined;
    }
  }
};

BensNavBar.handleTouchStart = function (evt) {
  evt.stopPropagation();
  evt.preventDefault();
  BensNavBar.touch = true;
  var menuButton = document.getElementById('menubutton');
  var hoverElement = document.elementFromPoint(evt.touches[0].clientX, evt.touches[0].clientY);
  if (['menubutton', 'menuimage'].includes(hoverElement.className)) {
    BensNavBar.addClass(menuButton, 'touch');
    BensNavBar.addClass(document.getElementById('drophover'), 'show');
  }
};

BensNavBar.handleTouchMove = function handleTouchMove(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  var hoverElement = document.elementFromPoint(evt.touches[0].clientX, evt.touches[0].clientY);
  BensNavBar.hoverOn(hoverElement);
};

BensNavBar.handleTouchEnd = function (evt) {
      BensNavBar.touch = false;
      BensNavBar.removeClass(document.getElementById('menubutton'), 'touch');
      if (typeof BensNavBar.currentHoverElement !== 'undefined') {
        BensNavBar.removeClass(BensNavBar.currentHoverElement, 'touch');
        window.open(BensNavBar.currentHoverElement.href, '_blank');
      }

      BensNavBar.removeClass(document.getElementById('drophover'), 'show');
    };

BensNavBar.handleClick = function functionName(element) {
  window.open(element.href);
};

document.addEventListener('touchstart', BensNavBar.handleTouchStart, false);
document.addEventListener('touchmove', BensNavBar.handleTouchMove, false);
document.addEventListener('touchend', BensNavBar.handleTouchEnd, false);
document.addEventListener('click', function (evt) {
  if (BensNavBar.touch) {
    evt.stopPropagation();
    evt.preventDefault();
  }
}, false);

}(this));

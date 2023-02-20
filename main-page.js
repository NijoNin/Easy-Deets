'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function MainPage() {
  var _React$useState = React.useState(""),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      url = _React$useState2[0],
      setUrl = _React$useState2[1];

  var _React$useState3 = React.useState(),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      size = _React$useState4[0],
      setSize = _React$useState4[1];

  var _React$useState5 = React.useState(false),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      showForm = _React$useState6[0],
      setShowForm = _React$useState6[1];

  var _React$useState7 = React.useState(),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      appColor = _React$useState8[0],
      setAppColor = _React$useState8[1];

  var _React$useState9 = React.useState(0),
      _React$useState10 = _slicedToArray(_React$useState9, 2),
      clickCount = _React$useState10[0],
      setClickCount = _React$useState10[1];

  //let clickCount = 0;
  // Set a variable to track the timeout ID for the click timer


  var clickTimeout = void 0;

  React.useEffect(function () {
    var updateSize = function updateSize() {
      var sw = window.innerWidth;
      var sh = window.innerHeight;

      var windowDif = sw < sh ? sw : sh;
      setSize(windowDif);
    };
    window.addEventListener('resize', updateSize);
    updateSize();
    return function () {
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  React.useEffect(function () {
    setAppColor(localStorage.getItem('color'));
    var storedUrl = localStorage.getItem('result');
    if (storedUrl) {
      setUrl(storedUrl);
      setShowForm(false);
    } else {
      setShowForm(true);
    }
  }, []);

  React.useEffect(function () {
    if (!url) {
      document.getElementById("canvas").width = 0;
      document.getElementById("canvas").height = 0;
    }
  }, [url]);

  var handleSubmit = function handleSubmit(e) {

    e.preventDefault();
    setUrl(e.target.value);
    localStorage.setItem('result', e.target.value);
  };

  // Define a function to handle the click event
  var handleDoubleClick = function handleDoubleClick(e) {
    setClickCount(function (prevCount) {
      return prevCount + 1;
    });

    if (clickCount === 0) {
      // single-click
      setTimeout(function () {
        setClickCount(0);
        console.log('Single click');
      }, 300);
    } else if (clickCount === 1) {
      // double-click
      clearTimeout(clickTimeout);
      setClickCount(0);
      setShowForm(function (prevShowForm) {
        return !prevShowForm;
      });
    }
    // adjust this value as needed
  };

  var handleKeyDown = function handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  var handleColorSave = function handleColorSave(e) {
    setAppColor(e);
    localStorage.setItem('color', e);
  };

  var handleHomeButton = function handleHomeButton() {
    window.location.reload();
  };

  return (
    //onDoubleClick={handleDoubleClick}
    React.createElement(
      'div',
      { id: 'appPage', onClick: handleDoubleClick },
      React.createElement('canvas', { id: 'canvas' }),
      React.createElement(
        'div',
        { id: 'menuOverlay', className: showForm ? "show" : "" },
        React.createElement('img', { id: 'logoImage', src: '/images/Easy-Deets-icon-white.png', alt: 'home', onClick: handleHomeButton }),
        React.createElement(
          'div',
          { id: 'color-picker-palette' },
          React.createElement('button', { id: 'colorButton', style: { backgroundColor: 'pink' }, onClick: function onClick(e) {
              return handleColorSave('255, 192, 203');
            } }),
          React.createElement('button', { id: 'colorButton', style: { backgroundColor: '#ffbc57' }, onClick: function onClick(e) {
              return handleColorSave('255, 188, 87');
            } }),
          React.createElement('button', { id: 'colorButton', style: { backgroundColor: '#d6ff66' }, onClick: function onClick(e) {
              return handleColorSave('214, 255, 102');
            } }),
          React.createElement('button', { id: 'colorButton', style: { backgroundColor: 'lightblue' }, onClick: function onClick(e) {
              return handleColorSave('173, 216, 230');
            } }),
          React.createElement('button', { id: 'colorButton', style: { backgroundColor: '#a08fff' }, onClick: function onClick(e) {
              return handleColorSave('160, 143, 255');
            } })
        ),
        React.createElement('input', { id: 'inputLink', type: 'text', placeholder: 'Write URL here...', value: url, onChange: handleSubmit, onKeyDown: handleKeyDown })
      ),
      changeColor(appColor),
      url && QRCode.toDataURL(document.getElementById('canvas'), url, { width: size, color: { dark: '#FFFFFFFF', light: '#0000000' } }, function (error) {
        if (error) console.error(error);
        console.log('success!');
      })
    )
  );
}

function changeColor(newColor) {
  document.documentElement.style.setProperty('--main-color', newColor);
}

var rootNode = document.getElementById('main-page-root');
var root = ReactDOM.createRoot(rootNode);
root.render(React.createElement(MainPage));
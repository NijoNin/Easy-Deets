'use strict';

function MainPage() {
  const [url, setUrl] = React.useState("");
  const [size, setSize] = React.useState();
  const [showForm, setShowForm] = React.useState(false);
  const [appColor, setAppColor] = React.useState();
  const [clickCount, setClickCount] = React.useState(0);

  //let clickCount = 0;
  // Set a variable to track the timeout ID for the click timer
  let clickTimeout;

  React.useEffect(() => {
    const updateSize = () => {
      var sw = window.innerWidth;
      var sh = window.innerHeight;

      var windowDif = sw < sh ? sw : sh;
      setSize(windowDif);
    };
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  React.useEffect(() => {
    setAppColor(localStorage.getItem('color'));
    const storedUrl = localStorage.getItem('result');
    if (storedUrl) {
      setUrl(storedUrl);
      setShowForm(false);
    } else {
      setShowForm(true);
    }
  }, []);

  React.useEffect(() => {
    if (!url) {
      document.getElementById("canvas").width = 0;
      document.getElementById("canvas").height = 0;
    }
  }, [url]);

  const handleSubmit = (e) => {

    e.preventDefault();
    setUrl(e.target.value);
    localStorage.setItem('result', e.target.value);
  }

  // Define a function to handle the click event
  const handleDoubleClick = (e) => {
    setClickCount(prevCount => prevCount + 1);
    
      if (clickCount === 0) {
        // single-click
        setTimeout(() => {
          setClickCount(0);
          console.log('Single click');
        }, 300);
      } else if (clickCount === 1) {
        // double-click
        clearTimeout(clickTimeout);
        setClickCount(0);
        setShowForm(prevShowForm => !prevShowForm);
      }
     // adjust this value as needed
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const handleColorSave = (e) => {
    setAppColor(e);
    localStorage.setItem('color', e);
  };

  const handleHomeButton = () => {
    window.location.reload();
  };

  

  return (
    //onDoubleClick={handleDoubleClick}
    <div id='appPage' onClick={handleDoubleClick} >
      <canvas id='canvas' />
      <div id='menuOverlay' className={showForm ? "show" : ""}>
        <img id='logoImage' src="/images/Easy-Deets-icon-white.png" alt="home" onClick={handleHomeButton}></img>
        <div id="color-picker-palette">
          <button id='colorButton' style={{ backgroundColor: 'pink' }} onClick={e => handleColorSave('255, 192, 203')} />
          <button id='colorButton' style={{ backgroundColor: '#ffbc57' }} onClick={e => handleColorSave('255, 188, 87')} />
          <button id='colorButton' style={{ backgroundColor: '#d6ff66' }} onClick={e => handleColorSave('214, 255, 102')} />
          <button id='colorButton' style={{ backgroundColor: 'lightblue' }} onClick={e => handleColorSave('173, 216, 230')} />
          <button id='colorButton' style={{ backgroundColor: '#a08fff' }} onClick={e => handleColorSave('160, 143, 255')} />
        </div>
        <input id='inputLink' type="text" placeholder="Write URL here..." value={url} onChange={handleSubmit} onKeyDown={handleKeyDown} />
      </div>
      {changeColor(appColor)}
      {url && QRCode.toDataURL(document.getElementById('canvas'), url, { width: size, color: { dark: '#FFFFFFFF', light: '#0000000' } }, function(error) {
        if (error) console.error(error)
        console.log('success!');
      })}
    </div>
  );
}

function changeColor(newColor) {
  document.documentElement.style.setProperty('--main-color', newColor);
}



const rootNode = document.getElementById('main-page-root');
const root = ReactDOM.createRoot(rootNode);
root.render(React.createElement(MainPage));
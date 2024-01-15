  // Declaring variables for time elapsing screen.
  const timeElapseLm = document.querySelector ('.js-watch');

  // On click + KB Shortcut for Start/Pause button.
  const toggleButtonLm = document.querySelector ('.js-toggle-watch');
    toggleButtonLm.addEventListener('click', () => {
      toggleOrPause();
    } );
    document.body.addEventListener('keydown', (event) => {
      event.key === 's' && toggleOrPause();
    } );

  // On click + KB Shortcut for Reset button.
  const resetButtonLm = document.querySelector ('.js-reset-watch');
    resetButtonLm.addEventListener('click', () => {
      resetTime();
    } );

    document.body.addEventListener('keydown', (event) => {
      event.key === 'r' && resetTime();
    } );

  // Saving a time and units as objects. Render time on the webpage as soon as it loads. 
 let time = JSON.parse( localStorage.getItem('time') ) || {
    hours: 0,
    mins: 0,
    seconds: 0,
    centiseconds: 0
  };

  renderTime();

  // Save global interval ID for async operations. 
  let intervalID;

  // renderTime displays time ticking up in the HTML. updateTime is a callback for unit conversion. 
  function updateTime() {
    if (time.centiseconds > 99) {
      time.seconds++;
      time.centiseconds = 0;
    };
  
    if (time.seconds > 59) {
      time.mins++;
      time.seconds = 0;
    };
  
    if (time.mins > 59) {
      time.hours++;
      time.mins = 0;
    };
  };

  function renderTime() {
    updateTime();
    timeElapseLm.innerHTML = 
      `${time.hours < 10 ? '0' :''}${time.hours} : ${time.mins < 10? '0' :''}${time.mins} : ${time.seconds < 10? '0' :''}${time.seconds}.${time.centiseconds < 10? '0' :''}${time.centiseconds}`
  };

  // toggleOrPause flips between toggle or pause time depending on if an intervalID is running. Toggle also changes appearances through CSS class. 
  const toggleOrPause = () => (!intervalID)?
  toggleTime()
  :pauseTime();

  // toggleTime updates centiseconds every 10ms, constantly renders the time, and save new time to storage. Upon clicked, also transforms to Pause button. 
  function toggleTime() {
    intervalID = setInterval(() => { 
      time.centiseconds ++;
      saveToStorage();
      renderTime();
      console.log(time);
      },
    10);

    toggleButtonLm.innerHTML = 'Pause';
    toggleButtonLm.classList.add('pause-watch');
  };

  function pauseTime() {
    clearInterval(intervalID);
      intervalID = null;

    toggleButtonLm.innerHTML = 'Resume';
    toggleButtonLm.classList.remove('pause-watch');
  };
  
  // Reset time pauses time and resets the time to 0. 
  function resetTime() {
    clearInterval(intervalID);
      intervalID = null; 
    clearStorage();
      time.hours = 0;
      time.mins = 0;
      time.seconds = 0;
      time.centiseconds = 0;
    saveToStorage();
    renderTime();
    toggleButtonLm.innerHTML = 'Start';
    toggleButtonLm.classList.remove('pause-watch');
  };

  //localStorage related functions:
  function saveToStorage() {
    localStorage.setItem('time', JSON.stringify(time) );
  };

  function clearStorage() {
    localStorage.removeItem('time');
  };



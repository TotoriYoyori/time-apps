// >>>>>>>>>> DECLARING VARIABLES AND INTERACTIONS <<<<<<<<<<<<<<

  // Declaring variables for time elapsing screen.
  const timeElapseLm = document.querySelector ('.js-watch');

  // Adding interactions to Start/Pause button. 
  const toggleButtonLm = document.querySelector ('.js-toggle-watch');
    toggleButtonLm.addEventListener('click', () => {
      toggleOrPause();
    } );
    document.body.addEventListener('keydown', (event) => {
      event.key === 's' && toggleOrPause();
    } );

  // Adding interactions to Reset button.
  const resetButtonLm = document.querySelector ('.js-reset-watch');
    resetButtonLm.addEventListener('click', () => {
      resetTime();
    } );

    document.body.addEventListener('keydown', (event) => {
      event.key === 'r' && resetTime();
    } );

  // Declaring variables for time elapse information screen:
 let time = JSON.parse( localStorage.getItem('time') ) || {
    hours: 0,
    mins: 0,
    seconds: 0,
    centiseconds: 0
  };

  let intervalID;

  renderTime();
// >>>>>>>>>> FUNCTIONS <<<<<<<<<<<<<<

  // toggleOrPause flips between toggle or pause time depending on if intervalID is running. Toggle also changes appearances through CSS class. 
  const toggleOrPause = () => (!intervalID)?
    toggleTime()
    :pauseTime();

  // renderTime displays the watch ticking up in the HTML. 
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

  function saveToStorage() {
    localStorage.setItem('time', JSON.stringify(time) );
  };

  function clearStorage() {
    localStorage.removeItem('time');
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
  };


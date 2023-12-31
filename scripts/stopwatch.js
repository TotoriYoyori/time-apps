// >>>>>>>>>> DECLARING VARIABLES AND INTERACTIONS <<<<<<<<<<<<<<

  // Declaring variables for time elapsing screen.
  const timeElapseLm = document.querySelector ('.js-watch');

  // Adding interactions to Start/Pause button. 
  const toggleButtonLm = document.querySelector ('.js-toggle-watch');
    toggleButtonLm.addEventListener('click', () => {
      checkMode();
    } );
    document.body.addEventListener('keydown', (event) => {
      event.key === 's' && checkMode();
    } );

  // Adding interactions to Reset button.
  const resetButtonLm = document.querySelector ('.js-reset-watch');
    resetButtonLm.addEventListener('click', () => {
      resetTime();
    } );

    document.body.addEventListener('keydown', (event) => {
      event.key === 'r' && toggleTime();
    } );

  // Declaring variables for time elapse information screen:
  const time = {
    hours: 0,
    mins: 0,
    seconds: 0,
    centiseconds: 0
  };
  let {hours, mins, seconds, centiseconds} = time;

  let intervalID;

// >>>>>>>>>> FUNCTIONS <<<<<<<<<<<<<<

  // checkMode flips between toggle or pause time depending on if intervalID is running. Toggle also changes appearances through CSS class. 
  const checkMode = () => (!intervalID)?
    toggleTime()
    :pauseTime();

  // renderTime displays the watch ticking up in the HTML. 
  function renderTime() {
    if (centiseconds > 99) {
      seconds ++;
      centiseconds = 0;
    
      if (seconds > 59) {
        mins ++;
        seconds = 0;
      
        if (mins > 59) {
          hours ++;
          mins = 0;
        };
      };
    };
    
    timeElapseLm.innerHTML = 
      `${hours < 10 ? '0' :''}${hours} : ${mins < 10? '0' :''}${mins} : ${seconds < 10? '0' :''}${seconds}.${centiseconds < 10? '0' :''}${centiseconds}`
  };

  function toggleTime() {
    intervalID = setInterval(() => { 
      centiseconds ++;
      renderTime();
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
    mins = 0;
    seconds = 0;
    renderTime();

    toggleButtonLm.innerHTML = 'Start';
  };


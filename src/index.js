/**
 * Main object
 * @param {array} audioList 
 * @param {bool} devMode 
 */
const sfx = (audioList, devMode) => {

	/**
	 * Defaults
	 */
	let audio = [];
	let audioOn = true;
	
	/**
	 * Pre-load list of audio files
	 * @param {array} audioList
	 */
	const load = (audioList) => {
		let audioName;
		if (audioList && audioList.length > 0) {
			try {
				for (let i = 0; i < audioList.length; i++) {
					audioName = audioList[i].replace(/^.*[\\\/]/, ''); // remove path
          audioName = audioName.slice(0, -4); // remove extension
          let data = new Audio(audioList[i]) // with path and extension
          data.onerror = () => {
            throw new Error('File not found: ' + audioList[i]);
          };
					audio.push({
						name: audioName, // file name only, without extension
						data: data
          });
					devMode ? console.log('Audio loaded: ' + audioName) : null;
				};
				devMode ? console.log('All audio loaded, total items: ' + audio.length) : null;
			} catch(error) {
				throw new Error('Pre-loading! ' + error);
			};
		} else {
			throw new Error('Parameter not found!');
		};
	}

	/**
	 * Play audio by name
	 * @param {string/object} settings 
	 */
	const play = (settings) => {
    if (settings) {
      if (audioOn === true) {
        if (typeof settings === 'string') {
          settings = {
						name: settings,
						volume: 1
          }
				}
				if (typeof settings === 'object' && Object.keys(settings).length > 0) {
					for (let i = 0; i < audio.length; i++) {
						if (audio[i].name === settings.name) {
							if (settings.loop) { // loop playing
								try {
									audio[i].data.addEventListener('ended', () => {
										stop(settings.name);
										play({
											name: settings.name,
											loop: false, // got eventlistener, so it will always play if ended !
											volume: settings.volume || 1
										});
									});
									audio[i].data.volume = settings.volume || 1;
									audio[i].data.play();
                  devMode ? console.log('Playing audio: ' + settings.name) : null;
                  return 2;
								} catch (error) {
									throw new Error('Loop playing audio! ' + error);
								};
							} else { // normal playing
								try {
									audio[i].data.volume = settings.volume || 1;
									audio[i].data.pause();
									audio[i].data.currentTime = 0;
									setTimeout(() => { // prevent pause-play collision
										audio[i].data.play();
                    devMode ? console.log('Playing audio: ' + settings.name) : null;
                  }, 1);
                  return 1;
								} catch (error) {
									throw new Error('Normal playing audio! ' + error);
								};
							};
							return;
						};
					};
					throw new Error('Audio not found! ' + settings.name);
				} else {
					throw new Error('Bad parameters!');
				};
      } else {
        devMode ? console.log('Audio disabled, not playing! ' + settings.name) : null;
      };
    } else {
			throw new Error('Parameters not found!');
    };
	}

	/**
	 * Stop audio by name
	 * @param {string/array} audioNames 
	 */
	const stop = (audioNames) => {
		if (audioOn === true) {
			if (audioNames) {
				if (audioNames.length > 0) {
					try {
						if (typeof audioNames === 'string') {
							audioNames = [ audioNames ]
						}
						for (let i = 0; i < audioNames.length; i++) {
							for (let j = 0; j < audio.length; j++) {
								if (audio[j].name === audioNames[i] && !audio[j].data.paused) {
									audio[j].data.pause();
									audio[j].data.currentTime = 0;
									devMode ? console.log('Audio stopped: ' + audioNames[i]) : null;
									return 1;
								} else if (audio[j].name === audioNames[i] && audio[j].data.paused) {
									return 1;
								};
							};
						};
					} catch(error) {
						throw new Error('Stopping audio! ' + error);
					};
					throw new Error('Audio not found! ' + audioNames);
				} else {
					throw new Error('Bad parameter!');
				}
			} else {
        stopAll();
        return 2;
			};
		};
	}

	/**
	 * Stop all audio
	 */
	const stopAll = () => {
		if (audioOn === true) {
			try {
				for (let i = 0; i < audio.length; i++) {
					if (!audio[i].data.paused) {
						audio[i].data.pause();
						audio[i].data.currentTime = 0;
					};
				};
				devMode ?	console.log('All audio stopped.') : null;
			} catch(error) {
				throw new Error('Stopping all audio! ' + error);
			};
		};
	}

	/**
	 * Switch on audio
	 */
	const on = () => {
		audioOn = true;
    devMode ? console.log('Audio enabled.') : null;
    return 1;
	}

	/**
	 * Switch off audio
	 */
	const off = () => {
		try {
			stopAll();
			audioOn = false;
			devMode ? console.log('Audio disabled.') : null;
      return 1;
		} catch(error) {
			throw new Error('Switching off! ' + error);
		};
	}
	
	/**
	 * Pre-load audio
	 */
	load(audioList);

	/**
	 * Public methods
	 */
	return {
		on,
		off,
		play,
		stop
	}
}

export default sfx;
# simple-sfx

Lightweight audio library to play sound effects.

## Installation

	npm install simple-sfx

## Usage

    import simpleSFX from 'simple-sfx';

#### Load

    const sfx = new simpleSFX([
        'static/start.ogg',
        'static/click.mp3'
    ]);

#### Play

Quick

    sfx.play('start');

With parameters

    sfx.play({
        name: 'start',
        volume: 0.8,
        loop: false
    })

#### Stop

Single

    sfx.stop('start');

Multiple

    sfx.stop([
        'start',
        'click'
    ]);

All

    sfx.stop();

#### Disable

    sfx.off();

#### Enable

    sfx.on();

## Examples

Included working examples for React and Vue.

Start with running these in the root folder `./`

    npm install
	npm run build

#### React

Navigate to the `./examples/react` folder

	npm install
    npm start

Module imported in: `./examples/react/src/App.js`

#### Vue

Navigate to the `./examples/vue` folder

	npm install
    npm run dev

Module imported in `./examples/vue/src/App.vue`

## Tests

	npm run test
    
## License

<b>The MIT License (MIT)</b><br/>
Copyright © 2019 Tamas Szoke

https://opensource.org/licenses/MIT
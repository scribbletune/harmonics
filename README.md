# Harmonics

Harmonics is a small node module that contains utility functions for working with musical scales and chords. The library exposes lists of available scales and chords along with helpers to retrieve notes, parse inline chord notation and compute scale intervals. The scale and chord data is generated using [tonal](https://github.com/tonaljs/tonal) and additional sources such as the [Melakarta ragas](https://en.wikipedia.org/wiki/Melakarta).

## Project Structure

```
harmonics/
├── src/                # Library source files
│   ├── index.js        # Exports library functions
│   ├── scalesAndChords.js  # Core logic for chords & scales
│   └── scalesAndChords.test.js  # Jest tests
├── gen/                # Generated data and generator script
│   ├── chordMaps.json
│   ├── scaleMaps.json
│   ├── melakarta.json
│   ├── svara.json
│   └── index.js        # Script to generate JSON maps
├── package.json        # NPM configuration
├── babel.config.js
├── webpack.config.js
└── README.md
```

## Install

```bash
npm install harmonics
```

## Interface

Use `harmonics` in your project

```javascript
const harmonics = require('harmonics');
```

Get an `array` of all the scales available in harmonics (includes the one's from Tonal and the [Melakarta ragas](https://en.wikipedia.org/wiki/Melakarta)).

```javascript
harmonics.scales(); // ['ionian', 'dorian', 'lydian', '...', 'Kanakangi', 'Ratnangi', '...']
```

Get the notes of a scale as an `array`

```javascript
harmonics.scale('C4 major'); // ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4']
```

Scales available from Tonal are lower cased while ragas have their first letter capitalized.

```javascript
harmonics.scale('C4 Kanakangi'); // ['C4', 'Db4', 'D4', 'F4', 'G4', 'Ab4', 'A4']
```

Get an `array` of all the available chords (with numeric chords such as `4`, `5`, `7` etc exposed as `4th`, `5th`, `7th`)

```javascript
harmonics.chords(); // ['M', 'm', 'maj7', '4th']
```

Get the notes of a chord as an `array` (defaults to the 4th octave)

```javascript
harmonics.chord('C4 M'); // ['C4', 'E4', 'G4']
```

Get the notes of a chord as an `array` for a specific octave

```javascript
harmonics.chord('C5 M'); // ['C5', 'E5', 'G5']
```

Get the notes of an "inline" chord such as CM or Cmaj7 or Dbsus4_6 (here 6 is the octave). This is used in Scribbletune where you can define a bunch of notes and use chords in between, e.g 'C4 E4 Csus2 G4' (here Csus2 is "inlined" with C4, E4 and G4)

```javascript
harmonics.inlineChord('CM'); // ['C4', 'E4', 'G4']
harmonics.inlineChord('CM_5'); // ['C5', 'E5', 'G5']
```

Get the indices of a scale/raga or bitmap

```javascript
harmonics.getIndicesFromScale('phrygian'); // [0, 1,  3,  5, 7, 8, 10, 12]
harmonics.getIndicesFromScale('110010110011'); // [0, 1,  3,  5, 7, 8, 10, 12]
```

## Development

Install dependencies and run tests:

```bash
npm install
npm test
```

Build the browser bundle:

```bash
npm run build
```

For continuous browser builds during development:

```bash
npm run watch:browser
```

Run the tests in watch mode:

```bash
npm run test:watch
```

To regenerate the scale and chord data run:

```bash
node gen/index.js
```

## Further Learning

- Explore the JSON maps under `gen/` to understand how scales and chords are represented.
- Look at `src/scalesAndChords.js` for the core logic behind the exported functions.
- Modify `gen/index.js` if you wish to add or update scale and chord definitions.

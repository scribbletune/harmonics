# Harmonics

Tools and utilities for a generic representation of scales, chords, progressions etc. for use in music software, music related web & mobile apps, [scribbletune](https://scribbletune.com), [VCV Rack](https://vcvrack.com/) plugins and [Max for Live](https://www.ableton.com/en/live/max-for-live/) devices. Uses [tonal](https://github.com/tonaljs/tonal) for western classical and custom generators for other forms of music.

## Install

```bash
npm install harmonics
```

## Interface

Use `harmonics` in your project

```javascript
const harmonics = require('harmonics');
```

Get an `array` of commonly used scales exported from Tonal

```javascript
harmonics.scales(); // ['ionian', 'dorian', 'lydian', '...']
```

Get the notes of a scale as an `array`

```javascript
harmonics.scale('C4 major'); // ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4']
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

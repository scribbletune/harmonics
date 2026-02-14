import { describe, it, expect } from 'vitest';
import { scales, chords, scale, chord, inlineChord, getIndicesFromScale } from '../src/index';

describe('scales', () => {
  it('returns a list of available scales', () => {
    const s = scales();
    expect(Array.isArray(s)).toBe(true);
    expect(s.length).toBeGreaterThan(100);
    expect(s).toContain('major');
    expect(s).toContain('minor');
    expect(s).toContain('phrygian');
    expect(s).toContain('Kanakangi');
  });

  it('returns the notes of C4 major', () => {
    expect(scale('C4 major')).toStrictEqual([
      'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4',
    ]);
  });

  it('returns the notes of C4 minor', () => {
    expect(scale('C4 minor')).toStrictEqual([
      'C4', 'D4', 'Eb4', 'F4', 'G4', 'Ab4', 'Bb4',
    ]);
  });

  it('returns the notes of C4 lydian', () => {
    expect(scale('C4 lydian')).toStrictEqual([
      'C4', 'D4', 'E4', 'Gb4', 'G4', 'A4', 'B4',
    ]);
  });

  it('returns the notes of C5 minor', () => {
    expect(scale('C5 minor')).toStrictEqual([
      'C5', 'D5', 'Eb5', 'F5', 'G5', 'Ab5', 'Bb5',
    ]);
  });

  it('returns the notes of C5 phrygian dominant', () => {
    expect(scale('C5 phrygian dominant')).toStrictEqual([
      'C5', 'Db5', 'E5', 'F5', 'G5', 'Ab5', 'Bb5',
    ]);
  });

  it('returns the notes of C5 phrygian', () => {
    expect(scale('C5 phrygian')).toStrictEqual([
      'C5', 'Db5', 'Eb5', 'F5', 'G5', 'Ab5', 'Bb5',
    ]);
  });
});

describe('scales with non-C root notes', () => {
  it('returns the notes of D4 major', () => {
    expect(scale('D4 major')).toStrictEqual([
      'D4', 'E4', 'Gb4', 'G4', 'A4', 'B4', 'Db5',
    ]);
  });

  it('returns the notes of A4 minor', () => {
    expect(scale('A4 minor')).toStrictEqual([
      'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5',
    ]);
  });

  it('returns the notes of Db4 major', () => {
    expect(scale('Db4 major')).toStrictEqual([
      'Db4', 'Eb4', 'F4', 'Gb4', 'Ab4', 'Bb4', 'C5',
    ]);
  });
});

describe('default octave', () => {
  it('defaults to octave 4 when no octave is specified for scale', () => {
    expect(scale('C major')).toStrictEqual([
      'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4',
    ]);
  });

  it('defaults to octave 4 when no octave is specified for chord', () => {
    expect(chord('C M')).toStrictEqual(['C4', 'E4', 'G4']);
  });
});

describe('sharps and flats', () => {
  it('accepts sharps', () => {
    expect(scale('C#4 major')).toStrictEqual([
      'Db4', 'Eb4', 'F4', 'Gb4', 'Ab4', 'Bb4', 'C5',
    ]);
    expect(chord('C#4 M')).toStrictEqual(['Db4', 'F4', 'Ab4']);
  });

  it('handles flats such as Cb correctly', () => {
    expect(scale('Cb4 major')).toStrictEqual([
      'B4', 'Db5', 'Eb5', 'E5', 'Gb5', 'Ab5', 'Bb5',
    ]);
  });

  it('accepts lowercase note name', () => {
    expect(scale('c5 phrygian')).toStrictEqual([
      'C5', 'Db5', 'Eb5', 'F5', 'G5', 'Ab5', 'Bb5',
    ]);
    expect(chord('c5 maj7')).toStrictEqual(['C5', 'E5', 'G5', 'B5']);
  });
});

describe('chords', () => {
  it('returns a list of available chords', () => {
    const c = chords();
    expect(Array.isArray(c)).toBe(true);
    expect(c.length).toBeGreaterThan(50);
    expect(c).toContain('M');
    expect(c).toContain('m');
    expect(c).toContain('maj7');
  });

  it('returns the notes of a chord', () => {
    expect(chord('C4 M')).toStrictEqual(['C4', 'E4', 'G4']);
    expect(chord('C5 M')).toStrictEqual(['C5', 'E5', 'G5']);
    expect(chord('C5 maj7')).toStrictEqual(['C5', 'E5', 'G5', 'B5']);
    expect(chord('Db6 M')).toStrictEqual(['Db6', 'F6', 'Ab6']);
    expect(chord('Ab m')).toStrictEqual(['Ab4', 'B4', 'Eb5']);
  });

  it('returns the notes of a chord with inline notation', () => {
    expect(chord('C#M')).toStrictEqual(['Db4', 'F4', 'Ab4']);
  });
});

describe('melakarta ragas', () => {
  it('returns the notes of C4 Kanakangi', () => {
    expect(scale('C4 Kanakangi')).toStrictEqual([
      'C4', 'Db4', 'D4', 'F4', 'G4', 'Ab4', 'A4',
    ]);
  });

  it('returns the notes of C4 Mechakalyani', () => {
    expect(scale('C4 Mechakalyani')).toStrictEqual([
      'C4', 'D4', 'E4', 'Gb4', 'G4', 'A4', 'B4',
    ]);
  });
});

describe('inlineChord', () => {
  it('returns the notes for an inline chord', () => {
    expect(inlineChord('CM')).toStrictEqual(['C4', 'E4', 'G4']);
    expect(inlineChord('CM_5')).toStrictEqual(['C5', 'E5', 'G5']);
    expect(inlineChord('Cmaj7_5')).toStrictEqual(['C5', 'E5', 'G5', 'B5']);
  });

  it('returns the notes for an inline chord with flat', () => {
    expect(inlineChord('DbM')).toStrictEqual(['Db4', 'F4', 'Ab4']);
  });

  it('returns the notes for an inline chord with sharp and octave', () => {
    expect(inlineChord('C#m_5')).toStrictEqual(['Db5', 'E5', 'Ab5']);
  });
});

describe('edge cases', () => {
  it('trims trailing spaces in scale and chord input', () => {
    expect(scale('C4 major ')).toStrictEqual([
      'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4',
    ]);
    expect(chord('C5 maj7 ')).toStrictEqual(['C5', 'E5', 'G5', 'B5']);
  });

  it('throws an error for an invalid scale', () => {
    expect(() => scale('C4 bogus')).toThrow();
  });

  it('throws an error for an invalid chord', () => {
    expect(() => chord('H# M')).toThrow();
  });
});

describe('getIndicesFromScale', () => {
  it('returns indices by scale name', () => {
    expect(getIndicesFromScale('phrygian')).toStrictEqual([0, 1, 3, 5, 7, 8, 10, 12]);
  });

  it('returns indices by bitmap', () => {
    expect(getIndicesFromScale('110101011010')).toStrictEqual([0, 1, 3, 5, 7, 8, 10, 12]);
  });
});

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  notes = [ 'C', 'C#', 'D', 'D#', 'E', 'E#', 'F', 'G', 'G#', 'A', 'A#', 'B' ];
  strings = [ 'E 3', 'A 3', 'D 4', 'G 4', 'B 4', 'E 5' ];
  fretMarks = new Set([ 3, 5, 7, 9, 12, 15, 17 ]);
  frets = Array.from(new Array(20), (x, i) => ({ num: i + 1, mark: this.fretMarks.has(i + 1) }));
  staffLines = [ 'C 6', 'B 5', 'A 5', 'G 5', 'F 5', 'E 5', 'D 5', 'C 5', 'B 4', 'A 4', 'G 4', 'F 4', 'E 4', 'D 4', 'C 4', 'B 3', 'A 3', 'G 3', 'F 3', 'E 3' ];

  staffHighlights = Array.from(this.staffLines, (x, i) => false);
  fretStringHighlights = Array.from(this.frets, (x, i) => Array.from(this.strings, (y, j) => false));
  staffNote = null;
  fretStringNote = null;
  
  getNoteForFretString(fretIndex, stringIndex) {
    const startNote = this.strings[stringIndex].substring(0, this.strings[stringIndex].length - 2);
    const startNoteRank = parseInt(this.strings[stringIndex].substring(this.strings[stringIndex].length - 2), 10);
    
    const startNoteIndex = this.notes.indexOf(startNote);
    
    const destNoteIndex = (startNoteIndex + fretIndex + 1) % this.notes.length;
    const destNoteRank = startNoteRank + Math.floor((startNoteIndex + fretIndex + 1) / this.notes.length);
    
    return this.notes[destNoteIndex] + ' ' + destNoteRank;
  }
  onMouseOverStaff(index) {
    this.fretStringNote = null;
    this.staffNote = this.staffLines[index];
    
  }

  onMouseOverString(fretIndex, stringIndex) {
    this.staffNote = null;
    this.fretStringNote = this.getNoteForFretString(fretIndex, stringIndex);
  }

  fretDistance(fretIndex) {
    if (fretIndex === 0) {
      return 100;
    } else {
      const prevFretDistance = this.fretDistance(fretIndex - 1);
      return (100 - prevFretDistance / 17.817) + prevFretDistance;
    }
  }

  fretHeight(fretIndex) {
    if (fretIndex > 0) {
      return this.fretDistance(fretIndex) - this.fretDistance(fretIndex - 1);
    } else {
      return this.fretDistance(fretIndex);
    }
  }

  isLedgerLong(index) {
    return index % 2 == 0 && index >= this.staffLines.indexOf('F 5') && index < this.staffLines.indexOf('E 4');
  }

  isLedgerShort(index) {
    return index % 2 == 0 && !this.isLedgerLong(index);
  }


}

import React from "react";
import styled from 'styled-components';

const SequencerTrack = ({track, row, noteClick, numBeats}) => {
  return (
    <SequencerTrack.Container>
      <SequencerTrack.Title>Test</SequencerTrack.Title>
      <SequencerTrack.NoteArea numCols={numBeats}>
        {track.map((isSelected, idx) => (
          <SequencerTrack.Note
            onClick={noteClick}
            isSelected={isSelected}
            data-col={idx}
            data-row={row}
            key={idx}
          />
        ))}
      </SequencerTrack.NoteArea>
    </SequencerTrack.Container>
  );
};

SequencerTrack.Container = styled.div`
  display: flex;
  align-items: center;
`;

SequencerTrack.Title = styled.div`
  padding: 1rem;
`;

SequencerTrack.NoteArea = styled.div`
  display: grid;
  grid-template-columns: repeat(${p => p.numCols}, 4rem);
  grid-gap: 1rem;
  padding: 0.5rem;
`;

SequencerTrack.Note = styled.button`
  background: ${p => p.isSelected ? 'white' : 'transparent'};
  border: 2px dashed white;
  border-radius: 50%;
  height: 4rem;
`;

export default SequencerTrack;
import React from "react";
import styled from 'styled-components';
import Remove from '../assets/remove.svg';

const SequencerTrack = ({track, row, noteClick, numBeats, currentCol, canDelete, onDeleteTrack}) => {
  const onDelete = () => onDeleteTrack(row);

  return (
    <SequencerTrack.Container>
      <SequencerTrack.MetaActions>
        <SequencerTrack.Title>{`Track ${row}`}</SequencerTrack.Title>
        {canDelete && <SequencerTrack.Delete onClick={onDelete}><Remove /></SequencerTrack.Delete>}
      </SequencerTrack.MetaActions>
      <SequencerTrack.NoteArea numCols={numBeats}>
        {track.map((isSelected, idx) => (
          <SequencerTrack.Note
            onClick={noteClick}
            isSelected={isSelected}
            isCurrentCol={idx === currentCol}
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

SequencerTrack.MetaActions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 8rem;
`;

SequencerTrack.Title = styled.div`
  padding: 0.5rem;
`;

SequencerTrack.Delete = styled.button`
  background: transparent;
  border: none;
  border-radius: 50%;
  
  svg {
    fill: white;
    transition: transform 0.1s ease;
  }

  &:hover {
    svg {
      transform: scale(1.1);
    }
  }
`;

SequencerTrack.NoteArea = styled.div`
  display: grid;
  grid-template-columns: repeat(${p => p.numCols}, 4rem);
  grid-gap: 1rem;
  padding: 0.5rem;
`;

SequencerTrack.Note = styled.button`
  background: ${p => p.isSelected ? 'white' : 'transparent'};
  border: 2px dashed ${p => p.isSelected ? 'blue' : 'white'};
  border-radius: 50%;
  height: 4rem;
  transition: box-shadow 0.3s ease;

  ${p => p.isCurrentCol && `
    transform: scale(1.1);
    box-shadow: 3px 3px 3px blue;
  `}
`;

export default SequencerTrack;
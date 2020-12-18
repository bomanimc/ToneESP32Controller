import React from "react";
import styled from 'styled-components';
import Remove from '../assets/remove.svg';

const SequencerTrack = ({track, row, noteClick, numBeats, currentCol, canDelete, onDeleteTrack}) => {
  const onDelete = () => onDeleteTrack(row);

  return (
    <SequencerTrack.Container>
      <SequencerTrack.MetaActions>
        <SequencerTrack.Title 
          type="text" 
          autocomplete="off" 
          placeholder={`Track ${row}`}
          defaultValue={`Track ${row}`}
        />
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
  max-width: 8rem;
  overflow: hidden;
`;

SequencerTrack.Title = styled.input`
  color: white;
  background: transparent;
  outline: none;
  padding: 0.5rem;
  font-size: 1rem;
  text-align: center;
  border: none;
  box-sizing: border-box;
  width: 100%;
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
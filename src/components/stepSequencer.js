import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components';
import { Transport, Time, Players, Sequence } from "tone";
import cloneDeep from 'lodash/cloneDeep';

const StepSequencer = () => {
  const numBeats = 8;
  const loop = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [beatState, setBeatState] = useState(Array(numBeats).fill(false));
  
  const keys = new Players({
      urls: {
        A1: "A1.mp3",
        A2: "A2.mp3",
      }, 
      baseUrl: "https://tonejs.github.io/audio/casio/",
      fadeOut: "64n",
      onload: () => {
        setIsLoaded(true);
      }
    },
  ).toDestination();

  useEffect(() => {
    if (loop.current) {
      loop.current.dispose();
    }

    loop.current = new Sequence((time, col) => {
      if (beatState[col]) {
        console.log(col, time);
        keys.player('A1').start(Time(), 0, "16t", 0);
      }
    }, [...new Array(numBeats)].map((_, i) => i), '8n').start(0);
  }, [beatState]);

  const handePlay = () => {
    Transport.start();
  }

  const handleStop = () => {
    Transport.stop();
  }

  const handleNoteClick = (e) => {
    const noteState = e.target.checked;
    const {col} = e.target.dataset;
    const newBeatState = cloneDeep(beatState);
    newBeatState[col] = noteState;
    setBeatState(newBeatState)
  }

  return (
    <div>
      <button disabled={!isLoaded} onClick={handePlay}>Play</button>
      <button disabled={!isLoaded} onClick={handleStop}>Stop</button>
      <StepSequencer.BeatGrid>
        {
          beatState.map((isChecked, idx) => (
            <input 
              type="checkbox" 
              onChange={handleNoteClick} 
              value={isChecked} 
              data-col={idx} 
              key={idx} 
            />
          ))
        }
      </StepSequencer.BeatGrid>
    </div>
  );
}

StepSequencer.BeatGrid = styled.div`
  display: flex;
  margin: 2rem;
`;

export default StepSequencer;
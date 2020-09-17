import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components';
import { Transport, Time, Players, Sequence } from "tone";
import cloneDeep from 'lodash/cloneDeep';
import SequencerTrack from './sequencerTrack';

const StepSequencer = () => {
  const numBeats = 8;
  const loop = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [beatState, setBeatState] = useState([Array(numBeats).fill(false)]);

  const soundFiles = {
    A1: "A1.mp3",
    A2: "A2.mp3",
  };
  
  const keys = new Players({
      urls: soundFiles, 
      baseUrl: "https://tonejs.github.io/audio/casio/",
      fadeOut: "64n",
      onload: () => {
        setIsLoaded(true);
      }
    },
  ).toDestination();

  useEffect(() => {
    console.log(beatState);
    if (loop.current) {
      loop.current.dispose();
    }

    const soundFileKeys = Object.keys(soundFiles);

    loop.current = new Sequence((time, col) => {
      beatState.map((track, row) => {
        if (track[col]) {
          console.log(`Col: ${col}; Row: ${row}; Time: ${time}`);
          keys.player(soundFileKeys[row % soundFileKeys.length]).start(Time(), 0, "16t", 0);
        }
      });
    }, [...new Array(numBeats)].map((_, i) => i), '8n').start(0);
  }, [keys, beatState]);

  const play = () => {
    Transport.start();
  }

  const stop = () => {
    Transport.stop();
  }

  const noteClick = (e) => {
    const {col, row} = e.target.dataset;
    const noteState = beatState[row][col];
    const newBeatState = cloneDeep(beatState);
    newBeatState[row][col] = !noteState;
    setBeatState(newBeatState)
  }

  const addTrack = () => {
    const newBeatState = cloneDeep(beatState);
    setBeatState([...newBeatState, Array(numBeats).fill(false)])
  }

  return (
    <div>
      <button disabled={!isLoaded} onClick={play}>Play</button>
      <button disabled={!isLoaded} onClick={stop}>Stop</button>
      <button disabled={!isLoaded} onClick={addTrack}>Add Track</button>
      <StepSequencer.BeatGrid>
        {
          beatState.map((track, trackIdx) => (
            <SequencerTrack key={trackIdx} track={track} row={trackIdx} noteClick={noteClick} numBeats={numBeats} />
          ))
        }
      </StepSequencer.BeatGrid>
    </div>
  );
}

StepSequencer.BeatGrid = styled.div`
  margin: 2rem;
  border: 2px solid white;
  border-radius: 0.5rem;
  display: inline-block;
`;

export default StepSequencer;
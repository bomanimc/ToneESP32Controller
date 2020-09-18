import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components';
import { Transport, Time, Players, Sequence } from "tone";
import cloneDeep from 'lodash/cloneDeep';
import SequencerTrack from './sequencerTrack';
import Play from '../assets/play.svg';
import Stop from '../assets/stop.svg';

const StepSequencer = () => {
  const numBeats = 8;
  const soundFiles = [
    "A1.mp3",
    "A2.mp3",
  ];

  const loop = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [beatState, setBeatState] = useState([Array(numBeats).fill(false)]);
  const [playerFiles, setPlayerFiles] = useState([soundFiles[0]]);
  
  const keys = new Players({
      urls: Object.assign({}, playerFiles), 
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

    loop.current = new Sequence((time, col) => {
      beatState.map((track, row) => {
        if (track[col]) {
          console.log(`Col: ${col}; Row: ${row}; Time: ${time}`);
          keys.player(row).start(Time(), 0, "16t", 0);
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
    const newPlayerFiles = cloneDeep(playerFiles);
    setBeatState([...newBeatState, Array(numBeats).fill(false)])
    setPlayerFiles([...newPlayerFiles, soundFiles[Math.floor(Math.random() * soundFiles.length)]]);
  }

  return (
    <div>
      <StepSequencer.ButtonControls>
        <StepSequencer.Play disabled={!isLoaded} onClick={play}>
          <StepSequencer.PlayIcon />
        </StepSequencer.Play>
        <StepSequencer.Stop disabled={!isLoaded} onClick={stop}>
          <StepSequencer.StopIcon />
        </StepSequencer.Stop>
        <button disabled={!isLoaded} onClick={addTrack}>Add Track</button>
      </StepSequencer.ButtonControls>
      <div>
        <StepSequencer.BeatGrid>
          {
            beatState.map((track, trackIdx) => (
              <SequencerTrack key={trackIdx} track={track} row={trackIdx} noteClick={noteClick} numBeats={numBeats} />
            ))
          }
        </StepSequencer.BeatGrid>
      </div>
    </div>
  );
}

StepSequencer.BeatGrid = styled.div`
  margin: 0.5rem 0;
  border: 2px solid white;
  border-radius: 0.5rem;
  display: inline-block;
`;

StepSequencer.ButtonControls = styled.div`
  display: flex;
  button {
    margin-right: 0.5rem;
  }
`;

StepSequencer.Play = styled.button`
  background: transparent;
  border: 2px solid white;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;
  width: 5rem;
  padding-left: 1.3125rem;
`;

StepSequencer.PlayIcon = styled(Play)`
  transform: rotate(90deg);
  fill: white;
  height: 50%;
`;

StepSequencer.Stop = styled.button`
  background: transparent;
  border: 2px solid white;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;
  width: 5rem;
`;

StepSequencer.StopIcon = styled(Stop)`
  transform: rotate(90deg);
  fill: white;
  height: 50%;
`;

export default StepSequencer;
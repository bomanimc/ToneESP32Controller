import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components';
import { Transport, Time, Players, Sequence } from "tone";
import cloneDeep from 'lodash/cloneDeep';
import SequencerTrack from './sequencerTrack';
import PlayPauseButton from "./PlayPause";
import IPAddress from "./ipAddress";

const BASE_IP_ADDRESS = 'http://192.168.1.184';

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
  const [currentCol, setCurrentCol] = useState(0);
  
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
    if (loop.current) {
      loop.current.dispose();
    }

    loop.current = new Sequence((time, col) => {
      sendColumnData(col);
      setCurrentCol(col);
      beatState.map((track, row) => {
        if (track[col]) {
          keys.player(row).start(Time(), 0, "16t", 0);
        }
      });
    }, [...new Array(numBeats)].map((_, i) => i), '8n').start(0);
  }, [keys, beatState]);

  const extractColumn = (arr, column) => arr.map(x => x[column]);

  const sendColumnData = (col) => {
    const binaryColumnData = extractColumn(beatState, col).map(noteState => noteState ? '1' : '0').join('');
    console.log('Data Acc', binaryColumnData);
    fetch(`${BASE_IP_ADDRESS}/${binaryColumnData}`).catch((error) => console.log(error));
  }

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
        <PlayPauseButton disabled={!isLoaded} play={play} stop={stop} />
        <IPAddress/>
      </StepSequencer.ButtonControls>
      <div>
        <StepSequencer.BeatGrid>
          <StepSequencer.ColumnIndices numCols={numBeats}>
            {Array(numBeats).fill(false).map((_, idx) => <StepSequencer.ColumnIndex>{idx}</StepSequencer.ColumnIndex>)}
          </StepSequencer.ColumnIndices>
          {
            beatState.map((track, trackIdx) => (
              <SequencerTrack key={trackIdx} track={track} row={trackIdx} noteClick={noteClick} numBeats={numBeats} currentCol={currentCol} />
            ))
          }
        </StepSequencer.BeatGrid>
        <StepSequencer.AddTrack disabled={!isLoaded} onClick={addTrack}>
          Add a new track!
        </StepSequencer.AddTrack>
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

StepSequencer.ColumnIndices = styled.div`
  display: grid;
  grid-template-columns: repeat(${p => p.numCols}, 4rem);
  grid-gap: 1rem;
  padding: 0.25rem 0.5rem;
  border-bottom: 2px solid white;
`;

StepSequencer.ColumnIndex = styled.span`
  text-align: center;
`;

StepSequencer.ButtonControls = styled.div`
  display: flex;
  button {
    margin-right: 0.5rem;
  }
`;

StepSequencer.AddTrack = styled.button`
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid white;
  border-radius: 0.5rem;
  width: 100%;
  color: white;
  height: 2rem;
`;

export default StepSequencer;
import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from 'styled-components';
import { Transport, Players, Sequence } from "tone";
import cloneDeep from 'lodash/cloneDeep';
import SequencerTrack from './sequencerTrack';
import PlayPauseButton from "./PlayPause";
import IPAddress, {DEFAULT_IP_ADDRESS} from "./ipAddress";
import BPM, {DEFAULT_BPM} from "./bpm";

const StepSequencer = () => {
  const numBeats = 8;
  const soundFiles = [
    "B1.mp3",
    "C2.mp3",
    "E2.mp3",
    "G2.mp3",
  ];

  const loop = useRef(null);
  const keys = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [beatState, setBeatState] = useState([Array(numBeats).fill(false)]);
  const [playerFiles, setPlayerFiles] = useState([soundFiles[0]]);
  const [currentCol, setCurrentCol] = useState(0);
  const [ipAddress, setIPAddress] = useState(DEFAULT_IP_ADDRESS);
  const [bpm, setBPM] = useState(DEFAULT_BPM);
  
  const extractColumn = (arr, column) => arr.map(x => x[column]);

  const sendColumnData = useCallback((col) => {
    const binaryColumnData = extractColumn(beatState, col).map(noteState => noteState ? '1' : '0').join('');
    
    fetch(`http://${ipAddress}/${binaryColumnData}`, {
      mode: 'no-cors',
    }).catch((error) => console.log(error));
  }, [ipAddress, beatState]);

  const play = () => {
    Transport.start();
  };

  const stop = () => {
    Transport.stop();
  };

  const noteClick = (e) => {
    const {col, row} = e.target.dataset;
    const noteState = beatState[row][col];
    const newBeatState = cloneDeep(beatState);
    newBeatState[row][col] = !noteState;
    setBeatState(newBeatState)
  };

  const addTrack = () => {
    const newBeatState = cloneDeep(beatState);
    const newPlayerFiles = cloneDeep(playerFiles);
    setBeatState([...newBeatState, Array(numBeats).fill(false)]);
    setPlayerFiles([...newPlayerFiles, soundFiles[(playerFiles.length + 1) % soundFiles.length]]);
  };

  const deleteTrack = (trackIdx) => {
    const newBeatState = cloneDeep(beatState);
    const newPlayerFiles = cloneDeep(playerFiles);
    newBeatState.splice(trackIdx, 1);
    newPlayerFiles.splice(trackIdx, 1);
    setBeatState(newBeatState);
    setPlayerFiles(newPlayerFiles);
  };

  const onChangeIPAddress = (e) => {
    setIPAddress(e.target.value);
  };

  const onChangeBPM = (e) => {
    setBPM(e.target.value);
  };

  useEffect(() => {
    if (loop.current) {
      loop.current.dispose();
    }

    loop.current = new Sequence((time, col) => {
      sendColumnData(col);
      setCurrentCol(col);
      beatState.map((track, row) => {
        if (track[col]) {
          try {

            keys.current.player(row).start(time, 0, "8n");
          } catch (err) {
            console.log(err);
          }
        }
        return null;
      });
    }, [...new Array(numBeats)].map((_, i) => i), '8n').start(0);
  }, [keys, beatState, sendColumnData]);

  useEffect(() => {
    Transport.bpm.value = bpm;
  }, [bpm]);

  useEffect(() => {
    if (keys.current) {
      keys.current.dispose();
    }

    keys.current = new Players({
        urls: Object.assign({}, playerFiles), 
        baseUrl: "https://tonejs.github.io/audio/casio/",
        fadeOut: "64n",
        onload: () => {
          setIsLoaded(true);
        }
      },
    ).toDestination();
  }, [playerFiles]);

  return (
    <div>
      <StepSequencer.ButtonControls>
        <PlayPauseButton disabled={!isLoaded} play={play} stop={stop} />
        <BPM onChangeBPM={onChangeBPM} />
        <IPAddress onChangeAddress={onChangeIPAddress} />
      </StepSequencer.ButtonControls>
      <div>
        <StepSequencer.BeatGrid>
          <StepSequencer.ColumnIndices numCols={numBeats}>
            {Array(numBeats).fill(false).map((_, idx) => <StepSequencer.ColumnIndex>{idx}</StepSequencer.ColumnIndex>)}
          </StepSequencer.ColumnIndices>
          {
            beatState.map((track, trackIdx) => (
              <SequencerTrack
                key={trackIdx}
                track={track}
                row={trackIdx}
                noteClick={noteClick}
                numBeats={numBeats}
                currentCol={currentCol}
                onDeleteTrack={deleteTrack}
              />
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
  justify-content: end;
`;

StepSequencer.ColumnIndex = styled.span`
  text-align: center;
`;

StepSequencer.ButtonControls = styled.div`
  display: flex;
  button, input {
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
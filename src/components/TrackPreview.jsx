import React, { useCallback, useContext } from 'react';

import {
  AppContext, getPlaying, getCurrentTrack, openPlayer,
  pauseTrack, playTrack
} from '../State';

import { img } from '../util';

import { IonButton, IonIcon, IonGrid, IonRow, IonCol, IonThumbnail } from '@ionic/react';
import { play, pause } from 'ionicons/icons';
import './TrackPreview.css';

const TrackProgress = ({ playing, track }) => {
  const progress = playing.progress;
  const left = track.time - progress;
  const percent = (progress / track.time) * 100;

  return (
  <div className="track-preview-progress">
    <div className="track-preview-progress-track">
      <div className="track-preview-progress-current" style={{ width: `${percent}%` }}></div>
    </div>
  </div>
  );
}

const TrackPreview = ({ tabBarTop }) => {
  const { state, dispatch } = useContext(AppContext);

  const playing = getPlaying(state);
  
  if (!playing) return null;

  const track = getCurrentTrack(state);

  const doPlayToggle = useCallback((e) => {
    // Stop the toggle from opening the modal
    e.stopPropagation();

    if (playing.paused) {
      dispatch(playTrack());
    } else {
      dispatch(pauseTrack());
    }
  })

  return (
    <div
      style={{ top: `${tabBarTop}px` }}
      className="track-preview"
      onClick={() => dispatch(openPlayer())}>
      
      <TrackProgress playing={playing} track={track} />

      <div className="track-preview-wrapper">
        <div className="track-thumbnail">
          <IonThumbnail>
            <img src={img(track.img)} className="track-art" />
          </IonThumbnail>
        </div>


        <div className="track-info">
          <span className="track-name">{track.title}</span>
          &middot;
          <span className="track-artist">{track.artist}</span>
        </div>

        <div className="track-controls">
          {playing.paused ? (
            <IonIcon icon={play} onClick={doPlayToggle} />
          ) : (
            <IonIcon icon={pause} onClick={doPlayToggle} />
          )}
        </div>
      </div>
    </div>
  )
};

export default TrackPreview;
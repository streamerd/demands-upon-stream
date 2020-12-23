import React, { useState, useCallback, useContext } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  IonButton,
  IonThumbnail,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react';

import { AppContext, getHotTracks, getNewTracks, playTrack } from '../State';

import { img } from '../util';

import './Home.css';

const Home = () => {
  const { state, dispatch } = useContext(AppContext);

  const hotTracks = getHotTracks(state);
  const newTracks = getNewTracks(state);

  const doPlay = useCallback(track => {
    dispatch(playTrack(track));
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Music</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonListHeader>
            <IonLabel>Hot Tracks</IonLabel>
          </IonListHeader>
          {hotTracks.map(track => (
            <IonItem key={track.title} onClick={() => doPlay(track)} button>
              <IonThumbnail slot="start">
                <img src={img(track.img)}/>
              </IonThumbnail>
              <IonLabel>
                <h2>{track.title}</h2>
                <p>{track.artist}</p>
              </IonLabel>
            </IonItem>
          ))}

        </IonList>

        <IonList>
          <IonListHeader>
            <ion-label>New Music</ion-label>
          </IonListHeader>
          <IonGrid>
            <IonRow>
              {newTracks.map(track => (
                <IonCol
                  size={6}
                  className="new-track"
                  key={track.title}
                  onClick={() => doPlay(track)}>
                  <img src={img(track.img)} />
                  <IonItem lines="none">
                    <IonLabel>
                      <h3>{track.title}</h3>
                      <p>{track.artist}</p>
                    </IonLabel>
                  </IonItem>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;

import React, { useCallback, useContext, useRef, useState } from 'react';
import {
  IonContent, IonHeader, IonItem, IonLabel, IonList,
  IonLoading, IonPage, IonSearchbar, IonThumbnail, IonTitle, IonToolbar,
  useIonViewDidEnter
} from '@ionic/react';

import { AppContext, playTrack } from '../State';

import { search } from '../search';

import { img } from '../util';

const Search = () => {
  const { state, dispatch } = useContext(AppContext);
  const [ isSearching, setIsSearching ] = useState(false);
  const [ tracks, setTracks ] = useState([]);
  const searchbarRef = useRef();

  const doSearch = useCallback(async (e) => {
    const q = e.target.value;

    if (!q) {
      setTracks([]);
      return;
    }

    setTracks(await search(q, state));
  });

  const doPlay = useCallback(track => {
    dispatch(playTrack(track))
  }, []);

  // Use this pattern to focus a search box whenever the
  // page enters from a navigation event
  useIonViewDidEnter(() => {
    searchbarRef.current.setFocus();
  })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Search</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar ref={searchbarRef} onIonChange={doSearch} />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {tracks.map(track => (
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
      </IonContent>
    </IonPage>
  );
};

export default Search;
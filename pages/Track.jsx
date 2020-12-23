import React from 'react';
import {
  IonBackButton, IonButtons, IonHeader,
  IonToolbar, IonTitle, IonContent, IonModal
} from '@ionic/react';

const Track = ({ track }) => {
  return (
    <IonModal>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>{track.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <p>Details</p>
      </IonContent>
    </IonModal>
  );
};

export default Track;

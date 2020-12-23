import React, { useContext, useRef, useState } from 'react';
import {
  IonBackButton, IonButtons, IonButton, IonHeader,
  IonToolbar, IonTitle, IonContent, IonPage,
  IonList, IonItem, IonLabel, IonInput, IonLoading
} from '@ionic/react';

import { AppContext, loggedIn } from '../State';

import { signup } from '../auth';

import urls from '../urls';

import './Form.css';

const Signup = ({ track, history }) => {
  const { dispatch } = useContext(AppContext);

  const [ email, setEmail ] = useState('');
  const [ name, setName ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ formErrors, setFormErrors ] = useState(null);
  const [ showLoading, setShowLoading ] = useState(false);

  const formRef = useRef(null);

  const goTo = path => {
    history.push(path, { direction: 'forward' });
  }

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      setShowLoading(true);
      
      const user = await signup(email, password);

      dispatch(loggedIn(user));

      history.replace(urls.APP_HOME);

      setShowLoading(false);
    } catch (e) {
      console.error(e);
      setShowLoading(false);
      setFormErrors(e);
    }
  }

  return (
  <IonPage>
    <IonHeader>
      <IonToolbar color="light">
        <IonButtons slot="start">
          <IonBackButton defaultHref={`/`} />
        </IonButtons>
        <IonTitle>Sign up</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="form">
      <IonLoading isOpen={showLoading} message="Creating account..." onDidDismiss={() => setShowLoading(false)}/>
      <form onSubmit={handleSubmit} method="post" ref={formRef} action="">
        <IonList>
          <IonItem>
            <IonLabel position={'fixed'}>Name</IonLabel>
            <IonInput name="name" type="text" value={name} onInput={e => setName(e.currentTarget.value)} />
          </IonItem>
          <IonItem>
            <IonLabel position={'fixed'}>Username</IonLabel>
            <IonInput name="username" type="text" value={username} onInput={e => setUsername(e.currentTarget.value)} />
          </IonItem>
          <IonItem>
            <IonLabel position={'fixed'}>Email</IonLabel>
            <IonInput name="email" type="email" value={email} onInput={e => setEmail(e.currentTarget.value)} />
          </IonItem>
          <IonItem>
            <IonLabel position={'fixed'}>Password</IonLabel>
            <IonInput name="password" type="password" value={password} onInput={e => setPassword(e.currentTarget.value)} />
          </IonItem>
          <IonButton expand="block" type="submit">Sign up</IonButton>
        </IonList>
      </form>
      <div className="below-form">
        <a href="#/" onClick={(e) => { e.preventDefault(); goTo('/login')}}>Already have an account? Log in</a>
      </div>
    </IonContent>
  </IonPage>
  );
};

export default Signup;

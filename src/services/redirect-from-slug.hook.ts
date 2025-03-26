import {useState, useEffect} from 'react';
import {useFirebaseStore} from './firebase.storage.service';
import { useAppStore } from './state.zus';
import {hydrateUrlToState} from '../utils/hydrateState';

export const useRedirectFromSlug = () => {
  const {getLiveData} = useFirebaseStore();
  const {setName, setEvents, setBirthday} = useAppStore();
  useEffect(() => {
    const url = new URL(window.location.href);
    const slug = url.pathname.slice(1);
    if (!slug) return;
    getLiveData(slug)
    .then(live => {
      if (live) {
        const {state: {name, birthday, events}} = hydrateUrlToState(decodeURIComponent(live))
        setName(name);
        setBirthday(birthday);
        setEvents(events);
      }
    })
    .catch(e => {
      console.error(e);
    });
  }, []);
}
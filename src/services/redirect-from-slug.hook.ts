import {useState, useEffect} from 'react';
import {useFirebaseStore} from './firebase.storage.service';
import { useAppStore } from './state.zus';
import {hydrateUrlToState} from '../utils/hydrateState';

export const useRedirectFromSlug = () => {
  const {getLiveData} = useFirebaseStore();
  const {setName, setEvents, setBirthday} = useAppStore();
  useEffect(() => {
    const url = new URL(window.location.href);
    const stateParam = url.searchParams.get('life');
    const slug = url.pathname.slice(1);
    if (!slug || stateParam) return;
    getLiveData(slug)
    .then(life => {
      if (life) {
        const {name, birthday, events} = life;
        setName(name);
        setBirthday(birthday.toDate());
        setEvents(events.map(event => {
          return {
            start: event.start.toDate(),
            end: event.end.toDate(),
            note: event.note
          };
        }))
      }
    })
    .catch(e => {
      console.error(e);
    });
  }, []);
}
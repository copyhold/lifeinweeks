import {useState, useEffect} from 'react';
import {useFirebaseStore} from './firebase.storage.service';

export const useRedirectFromSlug = () => {
  const {getLiveData} = useFirebaseStore();
  const [live, setLive] = useState(null);
  useEffect(() => {
    const url = new URL(window.location.href);
    const slug = url.pathname.slice(1);
    if (!slug) return;
    getLiveData(slug)
    .then(live => {
      if (live) {

        console.log('%c [  ]-15', 'font-size:13px; background:pink; color:#bf2c9f;', JSON.parse(decodeURIComponent(live)));
        setLive(live);
      }
    })
    .catch(e => {
      console.error(e);
    });
  }, []);

  return {live};
}
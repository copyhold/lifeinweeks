import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFirebaseStore } from '../services/firebase.storage.service';
import { useAppStore } from '../services/state.zus';
import { Weeks } from './Weeks';

const RedirectFromSlug: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { getLiveData } = useFirebaseStore();
  const { setName, setEvents, setBirthday } = useAppStore();
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    if (!slug || location.search) {
      setIsLoading(false);
      return;
    }

    getLiveData(slug)
      .then((life) => {
        if (life) {
          const { name, birthday, events } = life;
          setName(name);
          setBirthday(new Date(birthday));
          setEvents(
            events.map((event: any) => ({
              start: new Date(event.start),
              end: new Date(event.end),
              note: event.note,
            }))
          );
        }
      })
      .catch((e) => {
        console.error(e);
      }).
      finally(() => {
        setIsLoading(false);
      });
  }, [slug, getLiveData, setName, setBirthday, setEvents, navigate]);

  return isLoading ? <div>Loading...</div> : <Weeks />;
};

export default RedirectFromSlug;
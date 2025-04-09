import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFirebaseStore } from '../services/firebase.storage.service';
import { useAppStore } from '../services/state.zus';

export const ShareAccept = () => {
  const { linkId } = useParams();
  const { getSharingLinkData, acceptSharingLink, user } = useFirebaseStore();
  const { addSharedLifeRange } = useAppStore();
  const [linkData, setLinkData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!linkId) return;
    const fetchData = async () => {
      const data = await getSharingLinkData(linkId);
      setLinkData(data);
    };
    fetchData();
  }, [linkId, getSharingLinkData]);

  const handleAccept = async () => {
    if (!linkId || !user) return;
    await acceptSharingLink(linkId, user.uid);
    addSharedLifeRange({
      managerUid: user.uid,
      startWeek: linkData.startWeek,
      endWeek: linkData.endWeek,
      accepted: true,
      linkId: linkId,
      ownerUid: linkData.ownerUid,
      slug: linkData.slug,
    });
    navigate('/');
  };

  if (!linkData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Accept Sharing Invitation</h2>
      <p>
        You are invited to manage a life range <br />
        from: {linkData.startWeek.toDate().toString()} <br />
        to: {linkData.endWeek.toDate().toString()}.
      </p>
      <button onClick={handleAccept}>Accept</button>
      <button onClick={() => navigate('/')}>Decline</button>
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { useFirebaseStore } from '../services/firebase.storage.service';
import { useAppStore } from '../services/state.zus';
import { useNavigate } from 'react-router-dom';

export const ShareManager = () => {
  const { getSharedLifeRanges, user, revokeSharingLink } = useFirebaseStore();
  const { addSharedLifeRange, removeSharedLifeRange } = useAppStore();
  const [sharedRanges, setSharedRanges] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const ranges = await getSharedLifeRanges(user.uid);
      setSharedRanges(ranges);
      ranges.forEach((range) => {
        addSharedLifeRange(range);
      });
    };
    fetchData();
  }, [getSharedLifeRanges, user, addSharedLifeRange]);

  const handleRevoke = async (linkId: string, slug: string) => {
    if (!user) return;
    await revokeSharingLink(linkId, user.uid, slug);
    removeSharedLifeRange(linkId);
    setSharedRanges(sharedRanges.filter((range) => range.linkId !== linkId));
  };

  return (
    <div>
      <h2>Manage Shared Ranges</h2>
      <ul>
        {sharedRanges.map((range) => (
          <li key={range.linkId}>
            Range: {range.startWeek.toDateString()} - {range.endWeek.toDateString()}
            <button onClick={() => handleRevoke(range.linkId, range.slug)}>Revoke</button>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate('/')}>Back</button>
    </div>
  );
};

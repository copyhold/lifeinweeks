import React, { useState } from 'react';
import { useFirebaseStore } from '../services/firebase.storage.service';
import { useAppStore } from '../services/state.zus';
import { useNavigate } from 'react-router-dom';

export const ShareLinkGenerator = () => {
  const { createSharingLink, user } = useFirebaseStore();
  const { allWeeks } = useAppStore();
  const navigate = useNavigate();
  const [startWeek, setStartWeek] = useState<Date | null>(null);
  const [endWeek, setEndWeek] = useState<Date | null>(null);
  const [link, setLink] = useState<string | null>(null);
  const [slug, setSlug] = useState<string>('');

  const handleGenerateLink = React.useCallback(async () => {
    if (!startWeek || !endWeek || !user) return;
    const linkId = await createSharingLink(startWeek, endWeek, slug);
    setLink(`${window.location.origin}/share/${linkId}`);
  }, [startWeek, endWeek, user]);

  const weeks = allWeeks();

  return (
    <div>
      <h2>Generate Sharing Link</h2>
      <div>
        <label>Start Week:</label>
        <select onChange={(e) => setStartWeek(new Date(e.target.value))}>
          <option value="">Select Start Week</option>
          {weeks.map((week, index) => (
            <option key={index} value={week.start.toISOString()}>
              {week.start.toLocaleDateString()}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>End Week:</label>
        <select onChange={(e) => setEndWeek(new Date(e.target.value))}>
          <option value="">Select End Week</option>
          {weeks.map((week, index) => (
            <option key={index} value={week.start.toISOString()}>
              {week.start.toLocaleDateString()}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleGenerateLink}>Generate Link</button>
      {link && (
        <div>
          <h3>Sharing Link:</h3>
          <a href={link} target="_blank" rel="noopener noreferrer">
            {link}
          </a>
        </div>
      )}
    </div>
  );
};

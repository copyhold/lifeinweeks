import React from 'react'

export const Week: React.FC<{week: TWeekOfTheYear }> = ({week}) => {
  return (
        <div key={week.start.getTime()}>
          {
            week.notes && <p>{week.notes[0].note}</p>
          }
        </div>
  );
};
import React from 'react';

import fetchData from './fetchData';

const resource = fetchData(
  'https://run.mocky.io/v3/d6ac91ac-6dab-4ff0-a08e-9348d7deed51',
);

const UserWelcome = () => {
  const userDetails = resource.read();

  return (
    <div>
      <div>Fetch completed.</div>
      <div>
        Welcome <span>{userDetails.name}</span>
      </div>
    </div>
  );
};

export default UserWelcome;

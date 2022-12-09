import React, { useState } from 'react';
import SheetLoading from '../components/SheetLoading';
import ListHeader from '../components/ListHeader';
import MainScreen from './MainScreenHooks';

const HomeLoading = () => {
  const [appLoading, setAppLoading] = useState(true);

  return (
    <div>
      {appLoading ? (
        <SheetLoading onLoadFinish={() => setAppLoading(false)} />
      ) : (
        <>
          <ListHeader />
          <div className="container">
            <MainScreen />
          </div>
        </>
      )}
    </div>
  );
};

export default HomeLoading;

'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '@/store/index';

export const ReduxProviders = ({ children, className }) => {
  const theme = store.getState()?.theme;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className={`root ${className}`} data-theme={theme}>
          {children}
        </div>
      </PersistGate>
    </Provider>
  );
};

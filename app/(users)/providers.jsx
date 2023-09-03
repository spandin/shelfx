'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '@/store/index';

export const Providers = ({ children, className }) => {
  const theme = store.getState()?.theme || 'light';

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <body className={className} data-theme={theme}>
          {children}
        </body>
      </PersistGate>
    </Provider>
  );
};

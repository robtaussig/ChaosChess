import React, { FC } from 'react';

interface AppProps {
  children?: any,
}

export const App: FC<AppProps> = ({ children }) => {
  return (
    <div>
      Hello from App
      {children}
    </div>
  );
};

export default App;

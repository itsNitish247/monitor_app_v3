// ServerCountContext.js

import React, { createContext, useContext, useState } from 'react';

const ServerCountContext = createContext();

export const useServerCount = () => useContext(ServerCountContext);

export const ServerCountProvider = ({ children }) => {
  const [serverCount, setServerCount] = useState(0);
//   const [serverCount2, setServerCount2] = useState(0);
//   const [serverCount3, setServerCount3] = useState(0);

  return (
    <ServerCountContext.Provider value={{ serverCount ,setServerCount }}>
      {children}
    </ServerCountContext.Provider>
  );
};

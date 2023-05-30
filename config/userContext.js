import React, { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userUID, setUserUID] = useState(null);

  const updateUserUID = (uid) => {
    setUserUID(uid);
  };

  return (
    <UserContext.Provider value={{ userUID, updateUserUID }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

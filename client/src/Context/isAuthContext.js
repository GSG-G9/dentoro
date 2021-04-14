import React, { useContext, useState, createContext, useEffect } from 'react';
import { element } from 'prop-types';
import { get } from 'axios';

const IsAuthContext = createContext(false);

export const AuthProvider = ({ children }) => {
  const authState = useState();
  const [, setIsAuth] = authState;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await get('/api/v1/is-auth');
        setIsAuth(true);
      } catch ({ response }) {
        setIsAuth(false);
      }
    };
    checkAuth();
  }, [setIsAuth]);

  return (
    <IsAuthContext.Provider value={authState}>
      {children}
    </IsAuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: element.isRequired,
};
export const useAuth = () => useContext(IsAuthContext);

export default IsAuthContext;

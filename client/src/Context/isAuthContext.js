import React, { useContext, useState, createContext, useEffect } from 'react';
import { element, arrayOf } from 'prop-types';
import { get } from 'axios';

const IsAuthContext = createContext(false);

export default IsAuthContext;

export const AuthProvider = ({ children }) => {
  const authState = useState(false);
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
  children: arrayOf(element).isRequired,
};
export const useAuth = () => useContext(IsAuthContext);

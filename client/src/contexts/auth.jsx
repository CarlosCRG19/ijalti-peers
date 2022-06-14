/* eslint-disable react/prop-types */
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAPI } from '../hooks';
import { isEmptyObject } from '../utils';

const INITIAL_STATE = { idToken: '', user: { username: '', userId: '', role: '' } };

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(INITIAL_STATE);

  const api = useAPI();
  const navigate = useNavigate();

  const isAuthenticated = () => !!auth.idToken && !isEmptyObject(auth.user);

  const storeCredentials = (role, idToken, userId, username) => {
    localStorage.setItem('role', role);
    localStorage.setItem('userId', userId);
    localStorage.setItem('idToken', idToken);
    localStorage.setItem('username', username);

    setAuth({ idToken, user: { userId, username, role } });
  };

  const logout = () => {
    localStorage.clear();
    setAuth(INITIAL_STATE);
    navigate('/');
  };

  const validateAuth = async (role, idToken, userId, username) => {
    const roleAPI = role === 'company' ? api.company : api.aspirant;

    try {
      await roleAPI.getById(userId);
    } catch (error) {
      logout();
    }
  };

  useEffect(() => {
    const {
      role,
      userId,
      idToken,
      username,
    } = localStorage;
    console.log(localStorage);
    if (!role && !idToken && !userId && !username) {
      console.log('a')
      logout();
      return;
    }

    setAuth({ idToken, user: { userId, username, role } });
    validateAuth(role, idToken, userId, username);
  }, []);

  const authInterface = useMemo(() => ({
    ...auth,
    logout,
    isAuthenticated,
    storeCredentials,
  }));

  return (
    <AuthContext.Provider value={authInterface}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export { AuthProvider, useAuth };

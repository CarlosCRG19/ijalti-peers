/* eslint-disable react/prop-types */
import React, {
  createContext,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import { isEmptyObject } from '../utils';

const AspirantSignupContext = createContext(null);

const aspirantSignupReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'setCredentials':
      return { ...state, credentials: { ...payload } };

    case 'setPersonalData':
      return { ...state, personalData: { ...payload } };

    case 'setProfessionalExperience':
      return { ...state, professionalExperience: { ...payload } };

    case 'setPublicProfile':
      return { ...state, publicProfile: { ...payload } };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const AspirantSignupProvider = ({ email, password, children }) => {
  const [aspirantSignup, updateAspirantSignup] = useReducer(aspirantSignupReducer, {
    credentials: { email, password },
    personalData: {},
    professionalExperience: {},
    publicProfile: {},
  });

  const isCompleted = useMemo(() => {
    const {
      credentials,
      personalData,
      professionalExperience,
      publicProfile,
    } = aspirantSignup;

    return [
      credentials,
      personalData,
      professionalExperience,
      publicProfile,
    ].every((field) => !isEmptyObject(field));
  }, [aspirantSignup]);

  return (
    <AspirantSignupContext.Provider value={{ aspirantSignup, updateAspirantSignup, isCompleted }}>
      {children}
    </AspirantSignupContext.Provider>
  );
};

const useAspirantSignup = () => {
  const context = useContext(AspirantSignupContext);

  if (context === undefined) {
    throw new Error('useAspirantSignup must be used within an AspirantSignupProvider');
  }

  return context;
};

export { AspirantSignupProvider, useAspirantSignup };

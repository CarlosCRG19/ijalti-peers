import React, { useContext, createContext, useReducer } from 'react';

const companySignupContext = createContext(null);

const companySignupReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'setCredentials':
      return { ...state, credentials: { ...payload } };

    case 'setGeneralInfo':
      return { ...state, generalInfo: { ...payload } };

    case 'setContactInfo':
      return { ...state, contactInfo: { ...payload } };

    case 'setProfileInfo':
      return { ...state, profileInfo: { ...payload } };

    default:
      throw new Error(`Unhandled action type, ${action.type}`);
  }
};

const CompanySignupProvider = ({ email, password, children }) => {
  const [companySignup, updateCompanySignup] = useReducer(companySignupReducer, {
    credentials: { email, password },
    generalInfo: {},
    contactInfo: {},
    profileInfo: {},
  });

  return (
    <companySignupContext.Provider value={{ companySignup, updateCompanySignup }}>
      {children}
    </companySignupContext.Provider>
  );
};

const useCompanySignupContext = () => {
  const context = useContext(companySignupContext);

  if (context === undefined) {
    throw new Error('useCompanySignupContext must be used within a CompanySignup provider');
  }
  return context;
};

export { CompanySignupProvider, useCompanySignupContext };

import React, { useContext, createContext, useReducer } from 'react';

const companySignupContext = createContext(null);

const companySignupReducer = (state, action) => {
  const { type, payload } = action;

  const validatePayload = (requiredFields) => requiredFields.every((field) => field in payload);

  const setPropertyIfValid = (requiredFields, property) => {
    const isValid = validatePayload(requiredFields);

    if (!isValid) {
      throw new Error(`Missing field in ${property}. RequiredFields are ${requiredFields}`);
    }

    return { ...state, [property]: { ...payload } };
  };

  switch (type) {
    case 'setCredentials': {
      const requiredFields = ['email', 'password'];

      return setPropertyIfValid(requiredFields, 'credentials');
    }
    case 'setGeneralInfo': {
      const requiredFields = [
        'name',
        'socialReason',
        'numEmployees',
        'businessLine',
        'mision',
        'vision',
      ];
      return setPropertyIfValid(requiredFields, 'generalInfo');
    }
    default: {
      throw new Error(`Unhandled action type, ${action.type}`);
    }
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
    <companySignupContext.Provider value={[companySignup, updateCompanySignup]}>
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

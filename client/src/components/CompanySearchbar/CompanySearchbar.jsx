import React, { useState } from 'react';
import { TextField, MenuItem } from '@mui/material';
import { useAPI } from '../../hooks';

const CompanySearchbar = () => {
  const [query, setQuery] = useState('');
  const [queryResult, setQueryResult] = useState([]);
  const [timer, setTimer] = useState(null);
  const { company } = useAPI();
  const handleChange = (event) => {
    setQuery(event.target.value);
    const searchCompanies = async () => {
      console.log(query);
      const companies = await company.listBySearchQuery(query);
      console.log(companies);
      setQueryResult(companies);
    };
    console.log(query);
    if (!timer) {
      setTimer(setTimeout(() => {
        searchCompanies();
        setTimer(null);
      }, 1000));
    }
  };
  const menuItems = [
    {
      label: 'Google',
      id: 1,
    },
    {
      label: 'Meta',
      id: 2,
    },
  ];
  return (
    <div>
      <TextField value={query} onChange={handleChange} />
      {menuItems.map((item) => (
        <MenuItem>{item.label}</MenuItem>
      ))}
    </div>
  );
};

export default CompanySearchbar;

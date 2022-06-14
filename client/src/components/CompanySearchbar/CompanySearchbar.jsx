import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField, MenuItem } from '@mui/material';
import './CompanySearchbar.css';

import { useAPI } from '../../hooks';

const CompanySearchbar = () => {
  const [query, setQuery] = useState('');
  const [queryResult, setQueryResult] = useState([]);
  const { company } = useAPI();
  const handleChange = (event) => {
    const { value } = event.target;
    setQuery(value);
    if (!value.trim()) {
      setQueryResult([]);
      return;
    }
    setQuery(value);
    const searchCompanies = async () => {
      const companies = await company.listBySearchQuery(value);
      setQueryResult(companies);
    };
    searchCompanies();
  };
  return (
    <div className="search-bar">
      <TextField value={query} onChange={handleChange} placeholder="Busca una compañía" />
      {queryResult.map((item) => (
        <Link style={{ textDecoration: 'none' }} to={`/profile/company/${item.id}`}>
          <MenuItem>
            <p className="menu-item">{item.name}</p>
          </MenuItem>
        </Link>
      ))}
    </div>
  );
};

export default CompanySearchbar;

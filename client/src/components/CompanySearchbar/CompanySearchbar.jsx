import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, MenuItem, Autocomplete } from '@mui/material';
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
    <Autocomplete
      freeSolo
      options={queryResult}
      getOptionLabel={(option) => option.name}
      sx={{ width: 300, ml: 4 }}
      renderOption={(props, option) => (
        <Link to={`/profile/company/${option.id}`} style={{ textDecoration: 'none', color: 'black' }}>
          <MenuItem>
            {option.name}
          </MenuItem>
        </Link>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Busca una compañía"
          value={query}
          onChange={handleChange}
          variant="standard"
          InputProps={{
            ...params.InputProps,
          }}
        />
      )}
    />
  );
};

export default CompanySearchbar;

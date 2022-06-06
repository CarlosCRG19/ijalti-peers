import { LocationOn } from '@mui/icons-material'
import { FormControl, InputLabel, ListItemIcon, MenuItem, Select } from '@mui/material'
import React, { useState } from 'react'


const SelectCity = () => {
    const [city, setCity] = useState("");
    const cities = [
        "Guadalajara",
        "Zapopan",
        "San Pedro Tlaquepaque",
        "Tonalá",
        "Tlajomulco de Zúñiga",
        "El Salto",
        "Ixtlahuacán de los Membrillos",
        "Juanacatlán",
        "Zapotlanejo",
        "Acatlán de Juárez"
    ]
    const handleChangeCity = (event) => {
        setCity(event.target.value)
    }
    return (
        <FormControl variant="filled" fullWidth>
            <InputLabel id="city-label">Ubicación</InputLabel>
            <Select
                labelId="city-label"
                id="city"
                value={city}
                onChange={handleChangeCity}
                displayEmpty
                fullWidth
            >
                <MenuItem value="">
                    <ListItemIcon><LocationOn />Ubicación</ListItemIcon>
                </MenuItem>
                {
                    cities.map(cityItem => (
                        <MenuItem
                            value={cityItem}
                            key={cityItem}
                        >
                            {cityItem}
                        </MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    )
}

export default SelectCity
import React from 'react'

import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import axios from "axios"


const Form = () => {

	const [jobOffer, setJobOffer] = React.useState({
		title: "",
		city: "",
		salary: "",
		description: "",
		requiredAbilities: "",
		suggestedAbilities: "",
	})

	const handleChange = event => {
		setJobOffer(prevJobOffer => {
			return {
				...prevJobOffer,
				[event.target.name]: event.target.value
			}
		})
	}

	const handleSubmit = async event => {
		event.preventDefault();


		const res = await axios.post(`http://localhost:3000/job-offers/`, {
			...jobOffer,
			company: "b00d8a63-2166-47de-a97a-1cf6c03371b7"
		})

		console.log(jobOffer);


		// setLoading(false);
		// navigate("/");
	}

	return (
		<main className='main-content'>
			<form className='job-offer-form' onSubmit={handleSubmit}>
				<div className='job-offer-form-title'>
					<h2>Publica una oferta</h2>
				</div>

				<div className='job-offer-form-content'>
					<Grid container spacing={1}>
						<Grid item xs={12}>
							<p className='job-offer-form-content-p'>Llena todos los campos para publicar una nueva oferta de trabajo</p>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								id="standard-helperText"
								label="Título"
								helperText="Requerido"
								variant="filled"

								name="title"
								value={jobOffer.title}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								fullWidth
								id="standard-helperText"
								label="Ubicación"
								helperText="Requerido"
								variant="filled"

								name="city"
								value={jobOffer.city}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								fullWidth
								id="standard-helperText"
								label="Salario mensual"
								helperText="Requerido"
								variant="filled"

								name="salary"
								value={jobOffer.salary}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								id="standard-helperText"
								label="Descripción"
								helperText="Requerido"
								variant="filled"

								name="description"
								value={jobOffer.description}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								id="standard-helperText"
								label="Habilidades Requeridas"
								helperText="Requerido"
								variant="filled"

								name="requiredAbilities"
								value={jobOffer.requiredAbilities}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								id="standard-helperText"
								label="Habilidades Sugeridas"
								// helperText="Requerido"
								variant="filled"

								name="suggestedAbilities"
								value={jobOffer.suggestedAbilities}
								onChange={handleChange}
							/>
						</Grid>
					</Grid>
				</div>
				<div className='job-offer-form-buttons'>
					<Button variant="text">Borrar</Button>
					<Button variant="contained" sx={{ margin: "0 0 0 1rem" }} type="submit">Publicar</Button>
				</div>
			</form>
		</main>

	)
}

export default Form



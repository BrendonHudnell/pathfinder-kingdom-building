import React, { ReactElement, useState } from 'react';
import {
	Button,
	Card,
	Grid,
	makeStyles,
	TextField,
	Typography,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import ky from 'ky';
import { useHistory } from 'react-router-dom';

import { UserData } from './userLogin';

const useStyles = makeStyles((theme) => {
	return {
		root: {
			padding: theme.spacing(3),
		},
	};
});

export function UserRegister(): ReactElement {
	const classes = useStyles();

	const history = useHistory();

	const [errorMessage, setErrorMessage] = useState<string>();

	const { register, handleSubmit, formState, getValues } = useForm({
		mode: 'onChange',
	});

	async function onSubmit(data: UserData): Promise<void> {
		const response = await ky.post('api/user/register', {
			json: { username: data.username, password: data.password },
			throwHttpErrors: false,
		});

		if (response.status === 201) {
			history.push('/');
		} else {
			const body = await response.json();
			setErrorMessage(body.message);
		}
	}

	return (
		<Card className={classes.root}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid container direction="column" spacing={2} alignContent="center">
					<Grid item>
						<Typography component="h1" variant="h5">
							Register
						</Typography>
					</Grid>
					{errorMessage ? (
						<Grid item>
							<Typography color="error">{errorMessage}</Typography>
						</Grid>
					) : null}
					<Grid item>
						<TextField
							required
							variant="outlined"
							size="small"
							label="Username"
							error={formState.errors.username ? true : false}
							helperText={
								formState.errors.username
									? formState.errors.username.message
									: ''
							}
							{...register('username', { required: 'Username is required' })}
						/>
					</Grid>
					<Grid item>
						<TextField
							required
							variant="outlined"
							size="small"
							label="Password"
							type="password"
							error={formState.errors.password ? true : false}
							helperText={
								formState.errors.password
									? formState.errors.password.message
									: ''
							}
							{...register('password', {
								required: 'Password is required',
								minLength: {
									value: 8,
									message: 'Password must be at least 8 characters',
								},
							})}
						/>
					</Grid>
					<Grid item>
						<TextField
							required
							variant="outlined"
							size="small"
							label="Confirm Password"
							type="password"
							error={formState.errors.confirmPassword ? true : false}
							helperText={
								formState.errors.confirmPassword
									? formState.errors.confirmPassword.message
									: ''
							}
							{...register('confirmPassword', {
								required: 'Password confirmation is required',
								validate: (value) =>
									value === getValues('password') || 'Passwords must match',
							})}
						/>
					</Grid>
					<Grid item>
						<Button
							type="submit"
							variant="outlined"
							size="large"
							disabled={!formState.isValid}
						>
							<Typography>Submit</Typography>
						</Button>
					</Grid>
				</Grid>
			</form>
		</Card>
	);
}

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

import { setLoginCookie } from '../../components/cookies';
import { LinkButton } from '../../components/linkButton';
import { useAppDispatch } from '../../components/store';
import { login } from './userSlice';

export interface UserData {
	username: string;
	password: string;
}

const useStyles = makeStyles((theme) => {
	return {
		root: {
			padding: theme.spacing(3),
		},
	};
});

export function UserLogin(): ReactElement {
	const classes = useStyles();

	const dispatch = useAppDispatch();

	const [errorMessage, setErrorMessage] = useState<string>();

	const { register, handleSubmit, formState } = useForm({ mode: 'onChange' });

	async function onSubmit(data: UserData): Promise<void> {
		const response = await ky.post('/api/user/login', {
			json: data,
			throwHttpErrors: false,
		});

		const body = await response.json();
		if (response.status === 200) {
			setLoginCookie(body.expires);
			dispatch(login());
		} else {
			setErrorMessage(body.message);
		}
	}

	return (
		<Card className={classes.root}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid container direction="column" spacing={2} alignContent="center">
					<Grid container item spacing={6}>
						<Grid item>
							<Typography component="h1" variant="h5">
								Sign In
							</Typography>
						</Grid>
						<Grid item>
							<LinkButton variant="outlined" title="Register" to="/register" />
						</Grid>
					</Grid>
					{errorMessage ? (
						<Grid item>
							<Typography color="error">{errorMessage}</Typography>
						</Grid>
					) : null}
					<Grid item>
						<TextField
							fullWidth={false}
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
							{...register('password', { required: 'Password is required' })}
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

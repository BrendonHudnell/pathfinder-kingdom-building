import React, { ReactElement } from 'react';
import {
	Button,
	Card,
	Grid,
	makeStyles,
	TextField,
	Typography,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';

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

	const { register, handleSubmit, formState } = useForm({ mode: 'onChange' });

	function onSubmit(data: UserData): void {
		console.log(data);
	}

	return (
		<Card className={classes.root}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid container direction="column" spacing={2} alignContent="center">
					<Grid item>
						<Typography component="h1" variant="h5">
							Sign In
						</Typography>
					</Grid>
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

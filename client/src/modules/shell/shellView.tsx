import React, { ReactElement, useEffect } from 'react';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';

import { checkLoginCookie } from '../../components/cookies';
import { useAppDispatch, useAppSelector } from '../../components/store';
import { login, UserView } from '../user';
import { ShellLayout } from './shellLayout';

const theme = createMuiTheme({
	typography: {
		button: {
			textTransform: 'none',
		},
		h1: {
			fontSize: '2rem',
			fontWeight: 'bold',
		},
		h2: {
			fontSize: '1.8rem',
			fontWeight: 'bold',
		},
		h3: {
			fontSize: '1.5rem',
			fontWeight: 'bold',
		},
		h4: {
			fontSize: '1.25rem',
			fontWeight: 'bold',
		},
	},
});

export function ShellView(): ReactElement {
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (checkLoginCookie()) {
			dispatch(login());
		}
	}, []);

	const loggedIn = useAppSelector((state) => state.user.loggedIn);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Router>{loggedIn ? <ShellLayout /> : <UserView />}</Router>
		</ThemeProvider>
	);
}

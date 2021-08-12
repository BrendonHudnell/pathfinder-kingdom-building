import React, { ReactElement } from 'react';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';

import { ShellLayout } from './shellLayout';
import { UserView } from '../user/userView';

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
	const loggedIn = false;
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Router>{loggedIn ? <ShellLayout /> : <UserView />}</Router>
		</ThemeProvider>
	);
}

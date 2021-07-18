import React, { ReactElement } from 'react';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';

import { ShellLayout } from './shellLayout';
import { useAppDispatch } from '../../components/store';
import { fetchDistricts } from '../district';
import { fetchHexes } from '../hex';
import { fetchKingdomData } from '../kingdom';
import { fetchLeadershipRoles } from '../leadership';
import { fetchSettlements } from '../settlement';

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

	dispatch(fetchKingdomData(1));
	dispatch(fetchLeadershipRoles(1));
	dispatch(fetchSettlements(1));
	dispatch(fetchDistricts(1));
	dispatch(fetchHexes(1));

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Router>
				<ShellLayout />
			</Router>
		</ThemeProvider>
	);
}

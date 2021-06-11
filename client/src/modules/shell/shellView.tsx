import React, { ReactElement } from 'react';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';

import { ShellLayout } from './shellLayout';
import { useAppDispatch } from '../../components/store';
import { District, fetchDistricts } from '../district';
import { HexData, initialHexes, fetchHexes } from '../hex';
import {
	KingdomState,
	initialKingdomState,
	fetchKingdomData,
} from '../kingdom';
import { Role, initialRoles, fetchLeadershipRoles } from '../leadership';
import { Settlement, fetchSettlements } from '../settlement';

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
	// TODO remove
	const kingdomString = localStorage.getItem('kingdom');
	const kingdom = kingdomString
		? (JSON.parse(kingdomString) as KingdomState)
		: initialKingdomState;
	const rolesString = localStorage.getItem('leadership');
	const roles = rolesString
		? (JSON.parse(rolesString) as Role[])
		: initialRoles;
	const settlementsString = localStorage.getItem('settlements');
	const settlements = settlementsString
		? (JSON.parse(settlementsString) as Settlement[])
		: [];
	const districtsString = localStorage.getItem('districts');
	const districts = districtsString
		? (JSON.parse(districtsString) as District[])
		: [];
	const hexesString = localStorage.getItem('hexes');
	const hexes = hexesString
		? (JSON.parse(hexesString) as HexData[])
		: initialHexes;

	const dispatch = useAppDispatch();

	dispatch(fetchKingdomData(kingdom));

	dispatch(fetchLeadershipRoles(roles));

	dispatch(fetchSettlements(settlements));

	dispatch(fetchDistricts(districts));

	dispatch(fetchHexes(hexes));

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<ShellLayout />
		</ThemeProvider>
	);
}

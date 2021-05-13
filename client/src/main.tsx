import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './components/store';
import { District, fetchDistricts } from './modules/district';
import { fetchHexes, HexData, initialHexes } from './modules/hex';
import {
	fetchKingdomData,
	initialKingdomState,
	KingdomState,
} from './modules/kingdom';
import { fetchLeadershipRoles, initialRoles, Role } from './modules/leadership';
import { fetchSettlements, Settlement } from './modules/settlement';
import { ShellView } from './modules/shell';

// TODO remove when server is set up
const kingdomString = localStorage.getItem('kingdom');
const kingdom = kingdomString
	? (JSON.parse(kingdomString) as KingdomState)
	: initialKingdomState;
const rolesString = localStorage.getItem('leadership');
const roles = rolesString ? (JSON.parse(rolesString) as Role[]) : initialRoles;
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

store.dispatch(fetchKingdomData(kingdom));

store.dispatch(fetchLeadershipRoles(roles));

store.dispatch(fetchSettlements(settlements));

store.dispatch(fetchDistricts(districts));

store.dispatch(fetchHexes(hexes));

ReactDOM.render(
	// <React.StrictMode> TODO put back in
	<Provider store={store}>
		<ShellView />
	</Provider>,
	//</React.StrictMode>
	document.getElementById('root')
);

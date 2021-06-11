import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './components/store';
import { ShellView } from './modules/shell';

// TODO remove when server is set up
// const kingdomString = localStorage.getItem('kingdom');
// const kingdom = kingdomString
// 	? (JSON.parse(kingdomString) as KingdomState)
// 	: initialKingdomState;
// const rolesString = localStorage.getItem('leadership');
// const roles = rolesString ? (JSON.parse(rolesString) as Role[]) : initialRoles;
// const settlementsString = localStorage.getItem('settlements');
// const settlements = settlementsString
// 	? (JSON.parse(settlementsString) as Settlement[])
// 	: [];
// const districtsString = localStorage.getItem('districts');
// const districts = districtsString
// 	? (JSON.parse(districtsString) as District[])
// 	: [];
// const hexesString = localStorage.getItem('hexes');
// const hexes = hexesString
// 	? (JSON.parse(hexesString) as HexData[])
// 	: initialHexes;

// const dispatch = useAppDispatch();

// dispatch(fetchKingdomData(kingdom));

// dispatch(fetchLeadershipRoles(roles));

// dispatch(fetchSettlements(settlements));

// dispatch(fetchDistricts(districts));

// dispatch(fetchHexes(hexes));

ReactDOM.render(
	// <React.StrictMode> TODO put back in
	<Provider store={store}>
		<ShellView />
	</Provider>,
	//</React.StrictMode>
	document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './components/store';
import { fetchDistricts } from './modules/district';
import { fetchHexes } from './modules/hex';
import { fetchLeadershipRoles } from './modules/leadership';
import { fetchSettlements } from './modules/settlement';
import { ShellView } from './modules/shell';

store.dispatch(fetchLeadershipRoles());

store.dispatch(fetchSettlements());

store.dispatch(fetchDistricts());

store.dispatch(fetchHexes());

ReactDOM.render(
	// <React.StrictMode> TODO put back in
	<Provider store={store}>
		<ShellView />
	</Provider>,
	//</React.StrictMode>
	document.getElementById('root')
);

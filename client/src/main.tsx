import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './components/store';
import { ShellView } from './modules/shell';

ReactDOM.render(
	// <React.StrictMode> TODO put back in
	<Provider store={store}>
		<ShellView />
	</Provider>,
	//</React.StrictMode>
	document.getElementById('root')
);

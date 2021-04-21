import React, { ReactElement, useEffect } from 'react';
import {
	makeStyles,
	Container,
	// AppBar,
	// Typography
} from '@material-ui/core';
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom';

import { useAppDispatch } from '../../components/store';
import { KingdomView } from '../kingdom';
import {
	fetchLeadershipRoles,
	initialRoles,
	LeadershipView,
} from '../leadership';
import {
	fetchSettlements,
	initialSettlements,
	SettlementView,
	SettlementListView,
} from '../settlement';
import { fetchDistricts, initialDistricts } from '../district';

const useStyles = makeStyles({
	layout: {
		display: 'flex',
		flexGrow: 1,
		flexDirection: 'column',
	},
	content: {
		display: 'flex',
		flexGrow: 1,
		flexDirection: 'column',
		paddingBottom: '2em',
	},
	footer: {
		top: 'auto',
		bottom: 0,
		position: 'fixed',
		maxHeight: '2em',
	},
});

export function ShellLayout(): ReactElement {
	const classes = useStyles();

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchLeadershipRoles(initialRoles));
	}, []);

	useEffect(() => {
		dispatch(fetchSettlements(initialSettlements));
	}, []);

	useEffect(() => {
		dispatch(fetchDistricts(initialDistricts));
	}, []);

	return (
		<Router>
			<div className={classes.layout}>
				<KingdomView />
				<Container className={classes.content}>
					<Switch>
						{/* <Route exact path="/" component={hexView} /> */}
						<Route exact path="/leadership" component={LeadershipView} />
						{/* <Route exact path="/army" component={ArmyView} />
						<Route exact path="/events" component={EventsView} /> */}
						<Route
							exact
							path="/settlements/:settlementId"
							component={SettlementView}
						/>
						<Route exact path="/settlements/" component={SettlementListView} />
						<Redirect to="/" />
					</Switch>
				</Container>
				{/* <AppBar className={classes.footer}> TODO use a footer?
					<Typography>Designed by Brendon Hudnell. 2021</Typography>
				</AppBar> */}
			</div>
		</Router>
	);
}

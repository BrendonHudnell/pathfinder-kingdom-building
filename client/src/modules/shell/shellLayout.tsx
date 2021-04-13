import React, { ReactElement } from 'react';
import { makeStyles, Container, AppBar, Typography } from '@material-ui/core';
import {
	BrowserRouter as Router,
	// Redirect,
	// Route,
	// Switch,
} from 'react-router-dom';
import { KingdomView } from '../kingdom';

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

	return (
		<Router>
			<div className={classes.layout}>
				<KingdomView />
				<Container className={classes.content}>
					{/* <Switch>
					<Route exact path='/' component={hexView} />
					<Route exact path="/leadership" component={LeadershipView} />
					<Route exact path="/army" component={ArmyView} />
					<Route exact path="/settlement/:settlementId" component={SettlementView} />
          			<Redirect to="/" />
				</Switch> */}
					TODO: The Router for the hex, leadership, settlement, army views goes
					here
				</Container>
				<AppBar className={classes.footer}>
					<Typography>Designed by Brendon Hudnell. 2021</Typography>
				</AppBar>
			</div>
		</Router>
	);
}

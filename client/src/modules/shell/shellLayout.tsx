import React, { ReactElement } from 'react';
import {
	makeStyles,
	Container,
	AppBar,
	Typography,
	Link,
} from '@material-ui/core';
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom';

import { KingdomView } from '../kingdom';
import { LeadershipView } from '../leadership';
import { SettlementView, SettlementListView } from '../settlement';
import { HexGridView } from '../hex';

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
					<Switch>
						<Route exact path="/" component={HexGridView} />
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
				<AppBar className={classes.footer}>
					<Typography>
						Please report any bugs or make feature requests&nbsp;
						<Link
							color="inherit"
							underline="always"
							href="https://github.com/BrendonHudnell/pf1-kingdom-building/issues"
							target="_blank"
							rel="noreferrer"
						>
							HERE
						</Link>
					</Typography>
				</AppBar>
			</div>
		</Router>
	);
}

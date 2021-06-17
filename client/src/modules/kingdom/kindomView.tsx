import React, { ReactElement } from 'react';
import { Grid, makeStyles, Paper } from '@material-ui/core';

import { KingdomOptionsView } from './kingdomOptionsView';
import { EdictsView } from './edictsView';
import { StatsView } from './statsView';
import { EconomyView } from './economyView';
import { BasicInfoView } from './basicInfoView';
import { LinkButtonsView } from './linkButtonsView';

const useStyles = makeStyles((theme) => {
	return {
		container: {
			padding: theme.spacing(3),
		},
	};
});

export function KingdomView(): ReactElement {
	const classes = useStyles();

	return (
		<Paper className={classes.container}>
			<Grid container spacing={2}>
				<BasicInfoView />
				<EconomyView />
				<StatsView />
				<KingdomOptionsView />
				<EdictsView />
				<LinkButtonsView />
			</Grid>
		</Paper>
	);
}

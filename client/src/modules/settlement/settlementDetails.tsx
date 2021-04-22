import React, { ReactElement } from 'react';
import { Grid, makeStyles, TextField, Typography } from '@material-ui/core';

import { useAppDispatch } from '../../components/store';
import { nameUpdated, Settlement } from './settlementSlice';
import {
	useSettlementBonusByType,
	useSettlementPopulation,
	useSettlementSize,
	useSettlementUnrest,
} from './settlementUtils';

const useStyles = makeStyles((theme) => {
	return {
		container: {
			padding: theme.spacing(3),
		},
	};
});

export interface SettlementDetailsProps {
	settlement: Settlement;
}

export function SettlementDetails(props: SettlementDetailsProps): ReactElement {
	const { id, name } = props.settlement;

	const classes = useStyles();

	const dispatch = useAppDispatch();

	const economy = useSettlementBonusByType(id, 'economy');
	const stability = useSettlementBonusByType(id, 'stability');
	const loyalty = useSettlementBonusByType(id, 'loyalty');
	const unrest = useSettlementUnrest(id);

	const population = useSettlementPopulation(id);

	const size = useSettlementSize(id);

	return (
		<Grid container spacing={2} className={classes.container}>
			<Grid container item spacing={2} alignItems="center">
				<Grid item>
					<TextField
						value={name}
						onChange={(e) =>
							dispatch(nameUpdated({ settlementId: id, name: e.target.value }))
						}
						fullWidth
					/>
				</Grid>
				<Grid item>
					<Typography>Size: {size}</Typography>
				</Grid>
				<Grid item>
					<Typography>Population: {population.toLocaleString()}</Typography>
				</Grid>
			</Grid>

			<Grid container item spacing={2} alignItems="center">
				<Grid item>
					<Typography>Economy: {economy}</Typography>
				</Grid>
				<Grid item>
					<Typography>Stability: {stability}</Typography>
				</Grid>
				<Grid item>
					<Typography>Loyalty: {loyalty}</Typography>
				</Grid>
				<Grid item />
				<Grid item>
					<Typography>Unrest: {unrest}</Typography>
				</Grid>
			</Grid>
		</Grid>
	);
}

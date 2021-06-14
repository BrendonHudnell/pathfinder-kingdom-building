import React, { ReactElement } from 'react';
import { Grid, makeStyles, TextField, Typography } from '@material-ui/core';

import { useAppDispatch, useAppSelector } from '../../components/store';
import { numberReducer } from '../../components/arrayNumberReducer';
import { selectDistrictsBySettlementId } from '../district';
import { nameUpdated, Settlement } from './settlementSlice';
import {
	useSettlementBonusByType,
	useSettlementPopulation,
	getSettlementSize,
	useSettlementBaseValue,
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
	const { settlement } = props;

	const classes = useStyles();

	const dispatch = useAppDispatch();

	const economy = useSettlementBonusByType(settlement, 'economy');
	const stability = useSettlementBonusByType(settlement, 'stability');
	const loyalty = useSettlementBonusByType(settlement, 'loyalty');

	const population = useSettlementPopulation(settlement);
	const size = getSettlementSize(population);
	const baseValue = useSettlementBaseValue(settlement);
	const defense = useSettlementBonusByType(settlement, 'defense');

	const corruption = useSettlementBonusByType(settlement, 'corruption');
	const crime = useSettlementBonusByType(settlement, 'crime');
	const law = useSettlementBonusByType(settlement, 'law');
	const lore = useSettlementBonusByType(settlement, 'lore');
	const productivity = useSettlementBonusByType(settlement, 'productivity');
	const society = useSettlementBonusByType(settlement, 'society');

	const districtList = useAppSelector((state) =>
		selectDistrictsBySettlementId(state, settlement.id)
	);
	const totalDistricts = districtList.filter(
		(district) => district.lotTypeList.filter((lotType) => lotType).length
	).length;
	const totalLots = districtList
		.map((district) => district.lotTypeList.filter((lotType) => lotType).length)
		.reduce(numberReducer, 0);

	return (
		<Grid container spacing={2} className={classes.container}>
			<Grid container item spacing={2} alignItems="center">
				<Grid item>
					<TextField
						value={settlement.name}
						onChange={(e) =>
							dispatch(
								nameUpdated({
									settlementId: settlement.id,
									name: e.target.value,
								})
							)
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
				<Grid item>
					<Typography>Base Value: {baseValue.toLocaleString()}gp</Typography>
				</Grid>
				<Grid item>
					<Typography>Defense: {defense}</Typography>
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
					<Typography>Total districts: {totalDistricts}</Typography>
				</Grid>
				<Grid item>
					<Typography>Total lots: {totalLots}</Typography>
				</Grid>
			</Grid>

			<Grid container item spacing={2} alignItems="center">
				<Grid item>
					<Typography>Corruption: {corruption}</Typography>
				</Grid>
				<Grid item>
					<Typography>Crime: {crime}</Typography>
				</Grid>
				<Grid item>
					<Typography>Law: {law}</Typography>
				</Grid>
				<Grid item>
					<Typography>Lore: {lore}</Typography>
				</Grid>
				<Grid item>
					<Typography>Productivity: {productivity}</Typography>
				</Grid>
				<Grid item>
					<Typography>Society: {society}</Typography>
				</Grid>
			</Grid>
		</Grid>
	);
}

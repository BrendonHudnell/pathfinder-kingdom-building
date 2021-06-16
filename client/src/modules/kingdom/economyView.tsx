import React, { ReactElement } from 'react';
import { Grid, TextField, Typography } from '@material-ui/core';

import { useAppDispatch, useAppSelector } from '../../components/store';
import {
	selectClaimedHexes,
	useClaimedHexesConsumptionDecrease,
	useClaimedHexesTerrainIncome,
} from '../hex';
import { selectTotalDistricts } from '../district';
import { treasuryUpdated } from './kingdomSlice';
import { KingdomTooltip } from './kingdomTooltip';
import { useEdictsBonuses } from './kingdomUtils';

export function EconomyView(): ReactElement {
	const dispatch = useAppDispatch();

	const treasury = useAppSelector((state) => state.kingdom.treasury);

	const edictBonuses = useEdictsBonuses();
	const size = useAppSelector((state) => selectClaimedHexes(state)).length;
	const totalDistricts = useAppSelector((state) => selectTotalDistricts(state));
	const hexConsumptionDecrease = useClaimedHexesConsumptionDecrease();
	const totalConsumption =
		edictBonuses.consumption + size + totalDistricts - hexConsumptionDecrease; // TODO add army slice info

	const terrainIncome = useClaimedHexesTerrainIncome();

	return (
		<Grid container item spacing={2} alignItems="center">
			<Grid item>
				<Typography>Treasury:</Typography>
			</Grid>
			<Grid item>
				<TextField
					style={{ minWidth: '5ch' }}
					type="number"
					value={treasury}
					onChange={(e) => dispatch(treasuryUpdated(Number(e.target.value)))}
				/>
			</Grid>
			<Grid item />
			<Grid item>
				<KingdomTooltip
					positives={{
						'# of hexes': size,
						'# of districts': totalDistricts,
						edicts: edictBonuses.consumption,
					}}
					negatives={{ 'terrain improvements': hexConsumptionDecrease }}
				>
					<Typography>
						Consumption: {totalConsumption > 0 ? totalConsumption : 0}
					</Typography>
				</KingdomTooltip>
			</Grid>
			<Grid item />
			<Grid item>
				<Typography>Terrain Income: {terrainIncome}</Typography>
			</Grid>
		</Grid>
	);
}

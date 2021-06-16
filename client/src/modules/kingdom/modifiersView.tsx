import React, { ReactElement } from 'react';
import { Grid, Typography } from '@material-ui/core';

import { useAllSettlementsBonusByType } from '../settlement';
import {
	useKingdomGovernmentBonuses,
	useAlignmentBonuses,
} from './kingdomUtils';
import { FameView } from './fameView';
import { GovernmentView } from './governmentView';

export function ModifiersView(): ReactElement {
	const settlementCorruption = useAllSettlementsBonusByType('corruption');
	const settlementCrime = useAllSettlementsBonusByType('crime');
	const settlementLaw = useAllSettlementsBonusByType('law');
	const settlementLore = useAllSettlementsBonusByType('lore');
	const settlementProductivity = useAllSettlementsBonusByType('productivity');
	const settlementSociety = useAllSettlementsBonusByType('society');

	const alignmentBonuses = useAlignmentBonuses();
	const kingdomGovernmentBonuses = useKingdomGovernmentBonuses();

	const totalCorruption =
		Math.floor(settlementCorruption / 10) +
		alignmentBonuses.corruption +
		kingdomGovernmentBonuses.corruption;
	const totalCrime =
		Math.floor(settlementCrime / 10) +
		alignmentBonuses.crime +
		kingdomGovernmentBonuses.crime;
	const totalLaw =
		Math.floor(settlementLaw / 10) +
		alignmentBonuses.law +
		kingdomGovernmentBonuses.law;
	const totalLore =
		Math.floor(settlementLore / 10) +
		alignmentBonuses.lore +
		kingdomGovernmentBonuses.lore;
	const totalProductivity =
		Math.floor(settlementProductivity / 10) +
		kingdomGovernmentBonuses.productivity;
	const totalSociety =
		Math.floor(settlementSociety / 10) +
		alignmentBonuses.society +
		kingdomGovernmentBonuses.society;

	return (
		<Grid container item spacing={2} alignItems="center">
			<Grid item>
				<Typography>Corruption: {totalCorruption}</Typography>
			</Grid>
			<Grid item>
				<Typography>Crime: {totalCrime}</Typography>
			</Grid>
			<Grid item>
				<Typography>Law: {totalLaw}</Typography>
			</Grid>
			<Grid item>
				<Typography>Lore: {totalLore}</Typography>
			</Grid>
			<Grid item>
				<Typography>Productivity: {totalProductivity}</Typography>
			</Grid>
			<Grid item>
				<Typography>Society: {totalSociety}</Typography>
			</Grid>
			<Grid item />
			<FameView
				settlementCorruption={settlementCorruption}
				settlementCrime={settlementCrime}
				settlementLore={settlementLore}
				settlementSociety={settlementSociety}
			/>
			<GovernmentView />
		</Grid>
	);
}

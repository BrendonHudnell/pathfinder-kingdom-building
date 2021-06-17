import React, { Fragment, ReactElement } from 'react';
import { Grid, Typography } from '@material-ui/core';

import { useAppSelector } from '../../components/store';
import {
	useAllSettlementsBonusByType,
	useAllSettlementsGovernmentBonuses,
} from '../settlement';
import {
	useKingdomGovernmentBonuses,
	useAlignmentBonuses,
} from './kingdomUtils';

export function ModifiersView(): ReactElement {
	const options = useAppSelector((state) => state.kingdom.options);

	const settlementGovernmentBonuses = useAllSettlementsGovernmentBonuses();
	const alignmentBonuses = useAlignmentBonuses();
	const kingdomGovernmentBonuses = useKingdomGovernmentBonuses();

	const settlementCorruption =
		useAllSettlementsBonusByType('corruption') +
		(options.settlementGovernment ? settlementGovernmentBonuses.corruption : 0);
	const settlementCrime =
		useAllSettlementsBonusByType('crime') +
		(options.settlementGovernment ? settlementGovernmentBonuses.crime : 0);
	const settlementLaw =
		useAllSettlementsBonusByType('law') +
		(options.settlementGovernment ? settlementGovernmentBonuses.law : 0);
	const settlementLore =
		useAllSettlementsBonusByType('lore') +
		(options.settlementGovernment ? settlementGovernmentBonuses.lore : 0);
	const settlementProductivity =
		useAllSettlementsBonusByType('productivity') +
		(options.settlementGovernment
			? settlementGovernmentBonuses.productivity
			: 0);
	const settlementSociety =
		useAllSettlementsBonusByType('society') +
		(options.settlementGovernment ? settlementGovernmentBonuses.society : 0);

	const totalCorruption =
		Math.floor(settlementCorruption / 10) +
		alignmentBonuses.corruption +
		(options.kingdomGovernment ? kingdomGovernmentBonuses.corruption : 0);
	const totalCrime =
		Math.floor(settlementCrime / 10) +
		alignmentBonuses.crime +
		(options.kingdomGovernment ? kingdomGovernmentBonuses.crime : 0);
	const totalLaw =
		Math.floor(settlementLaw / 10) +
		alignmentBonuses.law +
		(options.kingdomGovernment ? kingdomGovernmentBonuses.law : 0);
	const totalLore =
		Math.floor(settlementLore / 10) +
		alignmentBonuses.lore +
		(options.kingdomGovernment ? kingdomGovernmentBonuses.lore : 0);
	const totalProductivity =
		Math.floor(settlementProductivity / 10) +
		(options.kingdomGovernment ? kingdomGovernmentBonuses.productivity : 0);
	const totalSociety =
		Math.floor(settlementSociety / 10) +
		alignmentBonuses.society +
		(options.kingdomGovernment ? kingdomGovernmentBonuses.society : 0);

	return (
		<Fragment>
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
		</Fragment>
	);
}

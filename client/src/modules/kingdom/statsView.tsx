import React, { ReactElement } from 'react';
import { Grid, TextField, Typography } from '@material-ui/core';

import { useAppDispatch, useAppSelector } from '../../components/store';
import { useAllSettlementsBonusByType } from '../settlement';
import { useLeadershipBonusByType } from '../leadership';
import {
	selectClaimedHexes,
	useClaimedHexesEconomyBonus,
	useClaimedHexesLoyaltyBonus,
	useClaimedHexesStabilityBonus,
} from '../hex';
import { selectTotalDistricts } from '../district';
import { KingdomTooltip } from './kingdomTooltip';
import { unrestUpdated } from './kingdomSlice';
import { useAlignmentBonuses, useEdictsBonuses } from './kingdomUtils';

export function StatsView(): ReactElement {
	const dispatch = useAppDispatch();

	const size = useAppSelector((state) => selectClaimedHexes(state)).length;
	const totalDistricts = useAppSelector((state) => selectTotalDistricts(state));
	const controlDC = 20 + size + totalDistricts;

	const edictBonuses = useEdictsBonuses();
	const alignmentBonuses = useAlignmentBonuses();
	const kingdomEconomy = edictBonuses.economy + alignmentBonuses.economy;
	const kingdomStability = edictBonuses.stability + alignmentBonuses.stability;
	const kingdomLoyalty = edictBonuses.loyalty + alignmentBonuses.loyalty;

	const leadershipEconomy = useLeadershipBonusByType('Economy');
	const leadershipStability = useLeadershipBonusByType('Stability');
	const leadershipLoyalty = useLeadershipBonusByType('Loyalty');

	const settlementEconomy = useAllSettlementsBonusByType('economy');
	const settlementStability = useAllSettlementsBonusByType('stability');
	const settlementLoyalty = useAllSettlementsBonusByType('loyalty');

	const hexEconomy = useClaimedHexesEconomyBonus();
	const hexStability = useClaimedHexesStabilityBonus();
	const hexLoyalty = useClaimedHexesLoyaltyBonus();

	const currentUnrest = useAppSelector((state) => state.kingdom.unrest);

	const totalEconomy =
		kingdomEconomy +
		leadershipEconomy +
		settlementEconomy +
		hexEconomy -
		currentUnrest;

	const totalStability =
		kingdomStability +
		leadershipStability +
		settlementStability +
		hexStability -
		currentUnrest;

	const totalLoyalty =
		kingdomLoyalty +
		leadershipLoyalty +
		settlementLoyalty +
		hexLoyalty -
		currentUnrest;

	return (
		<Grid container item spacing={2} alignItems="center">
			<Grid item>
				<KingdomTooltip
					positives={{
						base: 20,
						'# of hexes': size,
						'# of districts': totalDistricts,
					}}
				>
					<Typography>Control DC: {controlDC}</Typography>
				</KingdomTooltip>
			</Grid>
			<Grid item />
			<Grid item>
				<KingdomTooltip
					positives={{
						buildings: settlementEconomy,
						edicts: edictBonuses.economy,
						leadership: leadershipEconomy,
						hexes: hexEconomy,
						alignment: alignmentBonuses.economy,
					}}
					negatives={{ unrest: currentUnrest }}
				>
					<Typography>Economy: {totalEconomy}</Typography>
				</KingdomTooltip>
			</Grid>
			<Grid item>
				<KingdomTooltip
					positives={{
						buildings: settlementStability,
						edicts: edictBonuses.stability,
						leadership: leadershipStability,
						hexes: hexStability,
						alignment: alignmentBonuses.stability,
					}}
					negatives={{ unrest: currentUnrest }}
				>
					<Typography>Stability: {totalStability}</Typography>
				</KingdomTooltip>
			</Grid>
			<Grid item>
				<KingdomTooltip
					positives={{
						buildings: settlementLoyalty,
						edicts: edictBonuses.loyalty,
						leadership: leadershipLoyalty,
						hexes: hexLoyalty,
						alignment: alignmentBonuses.loyalty,
					}}
					negatives={{ unrest: currentUnrest }}
				>
					<Typography>Loyalty: {totalLoyalty}</Typography>
				</KingdomTooltip>
			</Grid>
			<Grid item />
			<Grid item>
				<Typography>Unrest:</Typography>
			</Grid>
			<Grid item>
				<TextField
					style={{ minWidth: '5ch' }}
					type="number"
					value={currentUnrest}
					onChange={(e) => dispatch(unrestUpdated(Number(e.target.value)))}
				/>
			</Grid>
		</Grid>
	);
}

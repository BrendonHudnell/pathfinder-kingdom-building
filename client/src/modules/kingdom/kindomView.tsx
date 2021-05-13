import React, { ReactElement } from 'react';
import {
	Button,
	Grid,
	makeStyles,
	MenuItem,
	Paper,
	Select,
	TextField,
	Tooltip,
	Typography,
} from '@material-ui/core';

import { useAppDispatch, useAppSelector } from '../../components/store';
import { LinkButton } from '../../components/linkButton';
import { useLeadershipBonusByType } from '../leadership';
import { useAllSettlementsBonusByType } from '../settlement';
import {
	selectClaimedHexes,
	useClaimedHexesConsumptionDecrease,
	useClaimedHexesEconomyBonus,
	useClaimedHexesLoyaltyBonus,
	useClaimedHexesStabilityBonus,
	useClaimedHexesTerrainIncome,
} from '../hex';
import { selectTotalDistricts, useTotalPopulation } from '../district';
import {
	alignmentUpdated,
	holidayEdictLevelUpdated,
	incrementMonth,
	nameUpdated,
	promotionEdictLevelUpdated,
	taxationEdictLevelUpdated,
	treasuryUpdated,
	unrestUpdated,
} from './kingdomSlice';
import {
	Alignment,
	HolidayEdict,
	PromotionEdict,
	TaxationEdict,
	useAlignmentBonuses,
	useEdictsBonuses,
} from './kingdomUtils';

const useStyles = makeStyles((theme) => {
	return {
		container: {
			padding: theme.spacing(3),
		},
	};
});

export function KingdomView(): ReactElement {
	const classes = useStyles();

	const dispatch = useAppDispatch();

	const name = useAppSelector((state) => state.kingdom.name);
	const alignment = useAppSelector((state) => state.kingdom.alignment);
	const month = useAppSelector((state) => state.kingdom.month);
	const treasury = useAppSelector((state) => state.kingdom.treasury);
	const currentUnrest = useAppSelector((state) => state.kingdom.unrest);
	const holidayEdictLevel = useAppSelector(
		(state) => state.kingdom.holidayEdict
	);
	const promotionEdictLevel = useAppSelector(
		(state) => state.kingdom.promotionEdict
	);
	const taxationEdictLevel = useAppSelector(
		(state) => state.kingdom.taxationEdict
	);
	const edictBonuses = useEdictsBonuses();
	const alignmentBonuses = useAlignmentBonuses();
	const consumption = edictBonuses.consumption;
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
	const hexConsumptionDecrease = useClaimedHexesConsumptionDecrease();

	const population = useTotalPopulation();
	const size = useAppSelector((state) => selectClaimedHexes(state)).length;
	const totalDistricts = useAppSelector((state) => selectTotalDistricts(state));
	const controlDC = 20 + size + totalDistricts;
	const terrainIncome = useClaimedHexesTerrainIncome();

	const totalConsumption =
		consumption + size + totalDistricts - hexConsumptionDecrease; // TODO add army slice info

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

	// TODO remove when server is connected
	const state = useAppSelector((state) => state);
	function saveState(): void {
		localStorage.setItem('kingdom', JSON.stringify(state.kingdom));
		localStorage.setItem(
			'leadership',
			JSON.stringify(state.leadership.entities)
		);
		localStorage.setItem(
			'settlements',
			JSON.stringify(state.settlement.entities)
		);
		localStorage.setItem('districts', JSON.stringify(state.district.entities));
		localStorage.setItem('hexes', JSON.stringify(state.hex.entities));
	}

	// TODO remove when server is connected
	function resetState(): void {
		localStorage.clear();
	}

	return (
		<Paper className={classes.container}>
			<Grid container spacing={2}>
				<Grid container item spacing={2} alignItems="center">
					<Grid item>
						<TextField
							value={name}
							onChange={(e) => dispatch(nameUpdated(e.target.value))}
							fullWidth
						/>
					</Grid>
					<Grid item>
						<Typography>Alignment:</Typography>
					</Grid>
					<Grid item>
						<Select
							style={{ minWidth: '16ch' }}
							value={alignment}
							onChange={(e) =>
								dispatch(alignmentUpdated(e.target.value as Alignment))
							}
						>
							{Object.values(Alignment).map((value) => (
								<MenuItem key={value} value={value}>
									{value}
								</MenuItem>
							))}
						</Select>
					</Grid>
					<Grid item>
						<Typography>Month: {month}</Typography>
					</Grid>
					<Grid item>
						<Button
							variant="contained"
							onClick={() => dispatch(incrementMonth())}
						>
							Next month
						</Button>
					</Grid>
					{/*TODO remove buttons when server is connected*/}
					<Grid item xs />
					<Grid item>
						<Button
							variant="contained"
							color="primary"
							onClick={() => saveState()}
						>
							Save Current Kingdom
						</Button>
					</Grid>
					<Grid item>
						<Tooltip title="Refresh page to see defaults">
							<Button
								variant="contained"
								color="secondary"
								onClick={() => resetState()}
							>
								Reset to Defaults
							</Button>
						</Tooltip>
					</Grid>
				</Grid>

				<Grid container item spacing={2} alignItems="center">
					<Grid item>
						<Typography>Treasury:</Typography>
					</Grid>
					<Grid item>
						<TextField
							style={{ width: '5ch' }}
							type="number"
							value={treasury}
							onChange={(e) =>
								dispatch(treasuryUpdated(Number(e.target.value)))
							}
						/>
					</Grid>
					<Grid item />
					<Grid item>
						<Typography>
							Consumption: {totalConsumption > 0 ? totalConsumption : 0}
						</Typography>
					</Grid>
					<Grid item />
					<Grid item>
						<Typography>Terrain Income: {terrainIncome}</Typography>
					</Grid>
					<Grid item />
					<Grid item>
						<Typography>Size (hexes): {size}</Typography>
					</Grid>
					<Grid item>
						<Typography>Population: {population.toLocaleString()}</Typography>
					</Grid>
				</Grid>

				<Grid container item spacing={2} alignItems="center">
					<Grid item>
						<Typography>Control DC: {controlDC}</Typography>
					</Grid>
					<Grid item />
					<Grid item>
						<Typography>Economy: {totalEconomy}</Typography>
					</Grid>
					<Grid item>
						<Typography>Stability: {totalStability}</Typography>
					</Grid>
					<Grid item>
						<Typography>Loyalty: {totalLoyalty}</Typography>
					</Grid>
					<Grid item />
					<Grid item>
						<Typography>Unrest:</Typography>
					</Grid>
					<Grid item>
						<TextField
							style={{ width: '5ch' }}
							type="number"
							value={currentUnrest}
							onChange={(e) => dispatch(unrestUpdated(Number(e.target.value)))}
						/>
					</Grid>
				</Grid>

				<Grid container item spacing={2} alignItems="center">
					<Grid item>
						<Typography>Holiday Edict:</Typography>
					</Grid>
					<Grid item>
						<Select
							style={{ minWidth: '10ch' }}
							value={holidayEdictLevel}
							onChange={(e) =>
								dispatch(
									holidayEdictLevelUpdated(e.target.value as HolidayEdict)
								)
							}
						>
							{Object.values(HolidayEdict).map((value) => (
								<MenuItem key={value} value={value}>
									{value}
								</MenuItem>
							))}
						</Select>
					</Grid>
					<Grid item>
						<Typography>Promotion Edict:</Typography>
					</Grid>
					<Grid item>
						<Select
							style={{ minWidth: '13ch' }}
							value={promotionEdictLevel}
							onChange={(e) =>
								dispatch(
									promotionEdictLevelUpdated(e.target.value as PromotionEdict)
								)
							}
						>
							{Object.values(PromotionEdict).map((value) => (
								<MenuItem key={value} value={value}>
									{value}
								</MenuItem>
							))}
						</Select>
					</Grid>
					<Grid item>
						<Typography>Taxation Edict:</Typography>
					</Grid>
					<Grid item>
						<Select
							style={{ minWidth: '13ch' }}
							value={taxationEdictLevel}
							onChange={(e) =>
								dispatch(
									taxationEdictLevelUpdated(e.target.value as TaxationEdict)
								)
							}
						>
							{Object.values(TaxationEdict).map((value) => (
								<MenuItem key={value} value={value}>
									{value}
								</MenuItem>
							))}
						</Select>
					</Grid>
				</Grid>

				<Grid container item spacing={2} alignItems="center">
					<Grid item>
						<LinkButton title="Hexes" to="/" />
					</Grid>
					<Grid item>
						<LinkButton title="Settlements" to="/settlements" />
					</Grid>
					<Grid item>
						<LinkButton title="Leadership" to="/leadership" />
					</Grid>
					{/* <Grid item> TODO remove
						<LinkButton title="Army" to="/army" />
					</Grid>
					<Grid item>
						<LinkButton title="Events" to="/events" />
					</Grid> */}
				</Grid>
			</Grid>
		</Paper>
	);
}

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
} from '../hex';
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
import { selectTotalDistricts } from '../district';

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
	const consumption = useAppSelector((state) => state.kingdom.consumption);
	const kingdomEconomy = useAppSelector((state) => state.kingdom.economy);
	const kingdomStability = useAppSelector((state) => state.kingdom.stability);
	const kingdomLoyalty = useAppSelector((state) => state.kingdom.loyalty);
	const currentUnrest = useAppSelector((state) => state.kingdom.unrest);
	const holidayEdictLevel = useAppSelector(
		(state) => state.kingdom.holidayEdictLevel
	);
	const promotionEdictLevel = useAppSelector(
		(state) => state.kingdom.promotionEdictLevel
	);
	const taxationEdictLevel = useAppSelector(
		(state) => state.kingdom.taxationEdictLevel
	);
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

	// TODO need to add Size, Population, and Terrain Income
	const controlDC =
		20 +
		useAppSelector((state) => selectClaimedHexes(state)).length +
		useAppSelector((state) => selectTotalDistricts(state));

	const totalConsumption = consumption - hexConsumptionDecrease; // add size, # of districts, army slices info

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
								dispatch(alignmentUpdated(e.target.value as string))
							}
						>
							<MenuItem value={'LG'}>Lawful Good</MenuItem>
							<MenuItem value={'NG'}>Neutral Good</MenuItem>
							<MenuItem value={'CG'}>Chaotic Good</MenuItem>
							<MenuItem value={'LN'}>Lawful Neutral</MenuItem>
							<MenuItem value={'N'}>Neutral</MenuItem>
							<MenuItem value={'CN'}>Chaotic Neutral</MenuItem>
							<MenuItem value={'LE'}>Lawful Evil</MenuItem>
							<MenuItem value={'NE'}>Neutral Evil</MenuItem>
							<MenuItem value={'CE'}>Chaotic Evil</MenuItem>
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
				</Grid>

				<Grid container item spacing={2} alignItems="center">
					<Grid item>
						<Typography>Control DC: {controlDC}</Typography>
					</Grid>
					<Grid />
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
								dispatch(holidayEdictLevelUpdated(Number(e.target.value)))
							}
						>
							<MenuItem value={0}>None</MenuItem>
							<MenuItem value={1}>1/year</MenuItem>
							<MenuItem value={2}>6/year</MenuItem>
							<MenuItem value={3}>12/year</MenuItem>
							<MenuItem value={4}>24/year</MenuItem>
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
								dispatch(promotionEdictLevelUpdated(Number(e.target.value)))
							}
						>
							<MenuItem value={0}>None</MenuItem>
							<MenuItem value={1}>Token</MenuItem>
							<MenuItem value={2}>Standard</MenuItem>
							<MenuItem value={3}>Aggressive</MenuItem>
							<MenuItem value={4}>Expansionist</MenuItem>
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
								dispatch(taxationEdictLevelUpdated(Number(e.target.value)))
							}
						>
							<MenuItem value={0}>None</MenuItem>
							<MenuItem value={1}>Light</MenuItem>
							<MenuItem value={2}>Normal</MenuItem>
							<MenuItem value={3}>Heavy</MenuItem>
							<MenuItem value={4}>Overwhelming</MenuItem>
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

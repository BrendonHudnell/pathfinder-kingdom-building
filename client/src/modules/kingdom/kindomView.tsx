import React, { ReactElement, useState } from 'react';
import {
	Badge,
	Button,
	Dialog,
	DialogTitle,
	FormControlLabel,
	Grid,
	List,
	ListItem,
	makeStyles,
	MenuItem,
	Paper,
	Radio,
	RadioGroup,
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
	fameUpdated,
	governmentUpdated,
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
	alignmentMenuItems,
	FameKingdomLevel,
	FameValue,
	getKingdomFame,
	getKingdomInfamy,
	getUnsetKingdomFame,
	HolidayEdict,
	holidayEdictMenuItems,
	PromotionEdict,
	promotionEdictMenuItems,
	TaxationEdict,
	taxationEdictMenuItems,
	getAlignmentBonuses,
	getEdictsBonuses,
	KingdomGovernment,
	kingdomGovernmentMenuItems,
	getKingdomGovernmentBonuses,
} from './kingdomUtils';
import { KingdomTooltip } from './kingdomTooltip';

const useStyles = makeStyles((theme) => {
	return {
		container: {
			padding: theme.spacing(3),
		},
	};
});

export function KingdomView(): ReactElement {
	const classes = useStyles();

	const [fameOpen, setFameOpen] = useState(false);

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
	const fameInfo = useAppSelector((state) => state.kingdom.fame);
	const government = useAppSelector((state) => state.kingdom.government);

	const edictBonuses = getEdictsBonuses(
		holidayEdictLevel,
		promotionEdictLevel,
		taxationEdictLevel
	);
	const alignmentBonuses = getAlignmentBonuses(alignment);
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
	const settlementCorruption = useAllSettlementsBonusByType('corruption');
	const settlementCrime = useAllSettlementsBonusByType('crime');
	const settlementLaw = useAllSettlementsBonusByType('law');
	const settlementLore = useAllSettlementsBonusByType('lore');
	const settlementProductivity = useAllSettlementsBonusByType('productivity');
	const settlementSociety = useAllSettlementsBonusByType('society');
	const settlementFame = useAllSettlementsBonusByType('fame');

	const hexEconomy = useClaimedHexesEconomyBonus();
	const hexStability = useClaimedHexesStabilityBonus();
	const hexLoyalty = useClaimedHexesLoyaltyBonus();
	const hexConsumptionDecrease = useClaimedHexesConsumptionDecrease();

	const population = useTotalPopulation();
	const size = useAppSelector((state) => selectClaimedHexes(state)).length;
	const totalDistricts = useAppSelector((state) => selectTotalDistricts(state));
	const controlDC = 20 + size + totalDistricts;
	const terrainIncome = useClaimedHexesTerrainIncome();

	const kingdomFame = getKingdomFame(fameInfo);
	const kingdomInfamy = getKingdomInfamy(fameInfo);
	const kingdomUnsetFame = getUnsetKingdomFame(fameInfo, size);

	const kingdomGovernmentBonuses = getKingdomGovernmentBonuses(government);

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

	const totalFame =
		Math.floor((settlementLore + settlementSociety) / 10) +
		settlementFame +
		kingdomFame; // todo add event bonuses
	const totalInfamy =
		Math.floor((settlementCorruption + settlementCrime) / 10) + kingdomInfamy; // todo add event bonuses

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
							{alignmentMenuItems.map((item) => (
								<MenuItem key={item.value} value={item.value}>
									<Tooltip title={<Typography>{item.title}</Typography>}>
										<Typography>{item.value}</Typography>
									</Tooltip>
								</MenuItem>
							))}
						</Select>
					</Grid>
					<Grid item>
						<Typography>Government:</Typography>
					</Grid>
					<Grid item>
						<Select
							style={{ minWidth: '17ch' }}
							value={government}
							onChange={(e) =>
								dispatch(governmentUpdated(e.target.value as KingdomGovernment))
							}
						>
							{kingdomGovernmentMenuItems.map((item) => (
								<MenuItem key={item.value} value={item.value}>
									<Tooltip title={<Typography>{item.title}</Typography>}>
										<Typography>{item.value}</Typography>
									</Tooltip>
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
							style={{ minWidth: '5ch' }}
							type="number"
							value={treasury}
							onChange={(e) =>
								dispatch(treasuryUpdated(Number(e.target.value)))
							}
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
					<Grid item>
						<Typography>Fame: {totalFame}</Typography>
					</Grid>
					<Grid item>
						<Typography>Infamy: {totalInfamy}</Typography>
					</Grid>
					<Grid item>
						<Badge color="error" variant="dot" badgeContent={kingdomUnsetFame}>
							<Button onClick={() => setFameOpen(true)}>Size Bonuses</Button>
						</Badge>
						<Dialog open={fameOpen} onClose={() => setFameOpen(false)}>
							<DialogTitle>Fame/Infamy Kingdon Size Bonuses</DialogTitle>
							<List dense>
								{Object.entries(fameInfo).map(([level, info]) =>
									size >= Number(level) ? (
										<ListItem key={`fame-level-${level}`}>
											<Typography>
												Size {level} Bonus:&nbsp;&nbsp;&nbsp;&nbsp;
											</Typography>
											<RadioGroup
												row
												value={info.value}
												onChange={(e) =>
													dispatch(
														fameUpdated({
															level: Number(level) as FameKingdomLevel,
															value: e.target.value as FameValue,
														})
													)
												}
											>
												<FormControlLabel
													value={FameValue.FAME}
													control={<Radio />}
													label="Fame"
												/>
												<FormControlLabel
													value={FameValue.INFAMY}
													control={<Radio />}
													label="Infamy"
												/>
											</RadioGroup>
										</ListItem>
									) : null
								)}
							</List>
						</Dialog>
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
							{holidayEdictMenuItems.map((item) => (
								<MenuItem key={item.value} value={item.value}>
									<Tooltip title={<Typography>{item.title}</Typography>}>
										<Typography>{item.value}</Typography>
									</Tooltip>
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
							{promotionEdictMenuItems.map((item) => (
								<MenuItem key={item.value} value={item.value}>
									<Tooltip title={<Typography>{item.title}</Typography>}>
										<Typography>{item.value}</Typography>
									</Tooltip>
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
							{taxationEdictMenuItems.map((item) => (
								<MenuItem key={item.value} value={item.value}>
									<Tooltip title={<Typography>{item.title}</Typography>}>
										<Typography>{item.value}</Typography>
									</Tooltip>
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

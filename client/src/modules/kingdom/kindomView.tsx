import React, { ReactElement } from 'react';
import {
	Button,
	Grid,
	makeStyles,
	MenuItem,
	Paper,
	Select,
	TextField,
	Typography,
} from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../components/store';
import { LinkButton } from '../../components/linkButton';
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
import { useLeadershipBonusByType } from '../leadership';

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

	// TODO need to add Size, Population, Control DC, and Terrain Income

	const totalConsumption = consumption; // add size and hex/army slices info
	const totalEconomy = kingdomEconomy + leadershipEconomy - currentUnrest; // add hex/settlement slices info
	const totalStability = kingdomStability + leadershipStability - currentUnrest; // add hex/settlement slices info
	const totalLoyalty = kingdomLoyalty + leadershipLoyalty - currentUnrest; // add hex/settlement slices info
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
						<LinkButton title="Leadership" to="/leadership" />
					</Grid>
					<Grid item>
						<LinkButton title="Army" to="/army" />
					</Grid>
				</Grid>
			</Grid>
		</Paper>
	);
}

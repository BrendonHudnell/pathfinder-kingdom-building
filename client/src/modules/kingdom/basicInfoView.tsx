import React, { ReactElement } from 'react';
import {
	Grid,
	TextField,
	Typography,
	Button,
	Select,
	MenuItem,
	Tooltip,
} from '@material-ui/core';

import { useAppDispatch, useAppSelector } from '../../components/store';
import { useTotalPopulation } from '../district';
import { selectClaimedHexes } from '../hex';
import { alignmentUpdated, incrementMonth, nameUpdated } from './kingdomSlice';
import { Alignment, alignmentMenuItems } from './kingdomUtils';

export function BasicInfoView(): ReactElement {
	const dispatch = useAppDispatch();

	const name = useAppSelector((state) => state.kingdom.name);
	const alignment = useAppSelector((state) => state.kingdom.alignment);
	const size = useAppSelector((state) => selectClaimedHexes(state)).length;
	const population = useTotalPopulation();
	const month = useAppSelector((state) => state.kingdom.month);

	return (
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
			<Grid item />
			<Grid item>
				<Typography>Size (hexes): {size}</Typography>
			</Grid>
			<Grid item>
				<Typography>Population: {population.toLocaleString()}</Typography>
			</Grid>
			<Grid item />
			<Grid item>
				<Typography>Month: {month}</Typography>
			</Grid>
			<Grid item>
				<Button variant="contained" onClick={() => dispatch(incrementMonth())}>
					Next month
				</Button>
			</Grid>
		</Grid>
	);
}

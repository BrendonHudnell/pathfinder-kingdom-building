import React, { ReactElement } from 'react';
import {
	Grid,
	Typography,
	Select,
	MenuItem,
	FormControlLabel,
	Checkbox,
	makeStyles,
} from '@material-ui/core';

import { useAppDispatch } from '../../components/store';
import {
	District,
	moatUpdated,
	terrainUpdated,
	wallUpdated,
} from './districtSlice';
import { Direction, DistrictTerrainType } from './districtUtils';

const useStyles = makeStyles({
	halfWidth: {
		width: '50%',
	},
});

export interface DistrictBorderGridProps {
	district: District;
	name: string;
	direction: Direction;
}

export function DistrictBorderGrid(
	props: DistrictBorderGridProps
): ReactElement {
	const { district, name, direction } = props;

	const classes = useStyles();

	const dispatch = useAppDispatch();

	return (
		<Grid
			className={classes.halfWidth}
			container
			item
			spacing={2}
			alignItems="center"
		>
			{direction === 'north' || direction === 'east' ? (
				<Grid item xs={2} />
			) : null}
			<Grid item>
				<Typography>{`${name}:`}</Typography>
			</Grid>
			<Grid item>
				<Select
					style={{ minWidth: '8ch' }}
					value={district[direction].terrain}
					onChange={(e) =>
						dispatch(
							terrainUpdated({
								districtId: district.id,
								direction,
								terrain: e.target.value as DistrictTerrainType,
							})
						)
					}
				>
					{Object.values(DistrictTerrainType).map((value) => (
						<MenuItem key={`${direction}-${value}`} value={value}>
							{value}
						</MenuItem>
					))}
				</Select>
			</Grid>
			<Grid item>
				{district[direction].terrain === DistrictTerrainType.LAND ? (
					<FormControlLabel
						control={
							<Checkbox
								checked={district[direction].wall}
								onChange={(e) =>
									dispatch(
										wallUpdated({
											districtId: district.id,
											direction,
											wall: e.target.checked,
										})
									)
								}
							/>
						}
						label="Wall"
					/>
				) : null}
			</Grid>
			<Grid item>
				{district[direction].terrain === DistrictTerrainType.LAND ? (
					<FormControlLabel
						control={
							<Checkbox
								checked={district[direction].moat}
								onChange={(e) =>
									dispatch(
										moatUpdated({
											districtId: district.id,
											direction,
											moat: e.target.checked,
										})
									)
								}
							/>
						}
						label="Moat"
					/>
				) : null}
			</Grid>
		</Grid>
	);
}

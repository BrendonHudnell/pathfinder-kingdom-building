import React, { ReactElement } from 'react';
import {
	Grid,
	Typography,
	Select,
	MenuItem,
	FormControlLabel,
	Checkbox,
	Tooltip,
} from '@material-ui/core';

import { useAppDispatch } from '../../components/store';
import { buildingAdded, buildingRemoved } from '../settlement';
import {
	District,
	moatUpdated,
	terrainUpdated,
	wallUpdated,
} from './districtSlice';
import { Direction, DistrictTerrainType } from './districtUtils';
import { DistrictTooltip } from './districtTooltip';
import { BuildingDisplayType } from './buildingTypes';

export interface DistrictBorderGridProps {
	district: District;
	name: string;
	direction: Direction;
}

export function DistrictBorderGrid(
	props: DistrictBorderGridProps
): ReactElement {
	const { district, name, direction } = props;

	const dispatch = useAppDispatch();

	function toggleChecked(
		building: BuildingDisplayType,
		checked: boolean
	): void {
		if (building === 'City Wall') {
			dispatch(
				wallUpdated({ districtId: district.id, direction, wall: checked })
			);
		} else if (building === 'Moat') {
			dispatch(
				moatUpdated({ districtId: district.id, direction, moat: checked })
			);
		}

		if (checked) {
			dispatch(
				buildingAdded({ settlementId: district.settlementId, building })
			);
		} else {
			dispatch(
				buildingRemoved({ settlementId: district.settlementId, building })
			);
		}
	}

	return (
		<Grid item>
			<Grid container spacing={2} alignItems="center" justify="center">
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
			</Grid>
			<Grid container spacing={2} alignItems="center" justify="center">
				<Grid item>
					{district[direction].terrain === DistrictTerrainType.LAND ? (
						<Tooltip title={<DistrictTooltip displayType="City Wall" />}>
							<FormControlLabel
								control={
									<Checkbox
										checked={district[direction].wall}
										onChange={(e) =>
											toggleChecked('City Wall', e.target.checked)
										}
									/>
								}
								label="Wall"
							/>
						</Tooltip>
					) : null}
				</Grid>
				<Grid item>
					{district[direction].terrain === DistrictTerrainType.LAND ? (
						<Tooltip title={<DistrictTooltip displayType="Moat" />}>
							<FormControlLabel
								control={
									<Checkbox
										checked={district[direction].moat}
										onChange={(e) => toggleChecked('Moat', e.target.checked)}
									/>
								}
								label="Moat"
							/>
						</Tooltip>
					) : null}
				</Grid>
			</Grid>
		</Grid>
	);
}

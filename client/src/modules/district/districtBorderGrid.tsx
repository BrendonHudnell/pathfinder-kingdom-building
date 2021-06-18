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

import { useAppDispatch, useAppSelector } from '../../components/store';
import { unrestAdded } from '../kingdom';
import {
	buildingAdded,
	buildingRemoved,
	moatUnrestUsed,
	wallUnrestUsed,
} from '../settlement';
import {
	District,
	moatUpdated,
	terrainUpdated,
	wallUpdated,
} from './districtSlice';
import { Direction, DistrictTerrainType } from './districtUtils';
import { DistrictTooltip } from './districtTooltip';
import { BuildingDisplayType, buildingInfoList } from './buildingTypes';

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

	const settlement = useAppSelector(
		(state) => state.settlement.entities[district.settlementId]
	);

	function toggleChecked(
		building: BuildingDisplayType,
		checked: boolean
	): void {
		if (building === 'City Wall') {
			if (!settlement?.wallUnrestUsed) {
				dispatch(wallUnrestUsed(district.settlementId));
				dispatch(unrestAdded(buildingInfoList['City Wall'].unrest!));
			}
			dispatch(
				wallUpdated({ districtId: district.id, direction, wall: checked })
			);
		} else if (building === 'Moat') {
			if (!settlement?.moatUnrestUsed) {
				dispatch(moatUnrestUsed(district.settlementId));
				dispatch(unrestAdded(buildingInfoList['Moat'].unrest!));
			}
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

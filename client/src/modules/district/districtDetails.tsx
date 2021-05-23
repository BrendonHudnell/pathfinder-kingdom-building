import React, { ReactElement } from 'react';
import {
	Checkbox,
	FormControlLabel,
	Grid,
	TextField,
	Tooltip,
	Typography,
} from '@material-ui/core';

import { useAppDispatch } from '../../components/store';
import {
	District,
	nameUpdated,
	pavedUpdated,
	sewersUpdated,
} from './districtSlice';
import { DistrictTooltip } from './districtTooltip';
import { DistrictBorderGrid } from './districtBorderGrid';

export interface DistrictDetailsProps {
	district: District;
}

export function DistrictDetails(props: DistrictDetailsProps): ReactElement {
	const { district } = props;

	const dispatch = useAppDispatch();

	const usedLots = district.lotTypeList.filter((lotType) => lotType).length;

	return (
		<Grid container spacing={2} alignItems="center" justify="space-evenly">
			<Grid container item spacing={8} alignItems="center">
				<Grid item>
					<TextField
						value={district.name}
						onChange={(e) =>
							dispatch(
								nameUpdated({ districtId: district.id, name: e.target.value })
							)
						}
					/>
				</Grid>
				<Grid item>
					<Typography>Used Lots: {usedLots}</Typography>
				</Grid>
				<Grid item>
					<Typography>Free Lots: {36 - usedLots}</Typography>
				</Grid>
				<Grid item>
					<Tooltip title={<DistrictTooltip displayType="Sewer System" />}>
						<FormControlLabel
							control={
								<Checkbox
									checked={district.paved}
									onChange={(e) =>
										dispatch(
											pavedUpdated({
												districtId: district.id,
												paved: e.target.checked,
											})
										)
									}
								/>
							}
							label="Paved Streets"
						/>
					</Tooltip>
				</Grid>
				<Grid item>
					<Tooltip title={<DistrictTooltip displayType="Sewer System" />}>
						<FormControlLabel
							control={
								<Checkbox
									checked={district.sewers}
									onChange={(e) =>
										dispatch(
											sewersUpdated({
												districtId: district.id,
												sewers: e.target.checked,
											})
										)
									}
								/>
							}
							label="Sewer System"
						/>
					</Tooltip>
				</Grid>
			</Grid>
			<DistrictBorderGrid district={district} name="North" direction="north" />
			<DistrictBorderGrid district={district} name="South" direction="south" />
			<DistrictBorderGrid district={district} name="East" direction="east" />
			<DistrictBorderGrid district={district} name="West" direction="west" />
		</Grid>
	);
}

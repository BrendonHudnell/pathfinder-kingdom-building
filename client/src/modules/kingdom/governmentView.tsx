import React, { Fragment, ReactElement } from 'react';
import { Grid, Typography, Select, MenuItem, Tooltip } from '@material-ui/core';

import { useAppDispatch, useAppSelector } from '../../components/store';
import { governmentUpdated } from './kingdomSlice';
import { KingdomGovernment, kingdomGovernmentMenuItems } from './kingdomUtils';

export function GovernmentView(): ReactElement {
	const dispatch = useAppDispatch();

	const government = useAppSelector((state) => state.kingdom.government);

	return (
		<Fragment>
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
		</Fragment>
	);
}

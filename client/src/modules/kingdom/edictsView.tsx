import React, { ReactElement } from 'react';
import { Grid, Typography, Select, MenuItem, Tooltip } from '@material-ui/core';

import { useAppDispatch, useAppSelector } from '../../components/store';
import {
	holidayEdictLevelUpdated,
	promotionEdictLevelUpdated,
	taxationEdictLevelUpdated,
} from './kingdomSlice';
import {
	HolidayEdict,
	holidayEdictMenuItems,
	PromotionEdict,
	promotionEdictMenuItems,
	TaxationEdict,
	taxationEdictMenuItems,
} from './kingdomUtils';

export function EdictsView(): ReactElement {
	const dispatch = useAppDispatch();

	const holidayEdictLevel = useAppSelector(
		(state) => state.kingdom.holidayEdict
	);
	const promotionEdictLevel = useAppSelector(
		(state) => state.kingdom.promotionEdict
	);
	const taxationEdictLevel = useAppSelector(
		(state) => state.kingdom.taxationEdict
	);

	return (
		<Grid container item spacing={2} alignItems="center">
			<Grid item>
				<Typography>Holiday Edict:</Typography>
			</Grid>
			<Grid item>
				<Select
					style={{ minWidth: '10ch' }}
					value={holidayEdictLevel}
					onChange={(e) =>
						dispatch(holidayEdictLevelUpdated(e.target.value as HolidayEdict))
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
						dispatch(taxationEdictLevelUpdated(e.target.value as TaxationEdict))
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
	);
}

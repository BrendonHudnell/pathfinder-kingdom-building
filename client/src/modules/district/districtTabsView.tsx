import React, { ReactElement, useState } from 'react';
import { AppBar, Grid, makeStyles, Paper, Tab, Tabs } from '@material-ui/core';
import { EntityId } from '@reduxjs/toolkit';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { useAppDispatch, useAppSelector } from '../../components/store';
import { Trashcan } from './trashcan';
import { BuildingList } from './buildingList';
import { addNewDistrict, selectDistrictsBySettlementId } from './districtSlice';
import { DistrictView } from './districtView';
import { TabPanel } from './districtTabPanel';

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
		height: '100%',
	},
	rightAlign: {
		marginLeft: 'auto',
	},
});

export interface DistrictTabsViewProps {
	settlementId: EntityId;
}

export function DistrictTabsView(props: DistrictTabsViewProps): ReactElement {
	const { settlementId } = props;

	const classes = useStyles();

	const [value, setValue] = useState(0);

	const dispatch = useAppDispatch();

	const districts = useAppSelector((state) =>
		selectDistrictsBySettlementId(state, settlementId)
	);

	function setDistrictValue(newValue: number): void {
		if (newValue < districts.length) {
			setValue(newValue);
		}
	}

	return (
		<Paper className={classes.root}>
			<AppBar position="static">
				<Tabs
					value={value}
					onChange={(_, newValue) => setDistrictValue(newValue)}
				>
					{districts.map((district) => (
						<Tab key={`district-tab.${district.id}`} label={district.name} />
					))}
					<Tab
						className={classes.rightAlign}
						onClick={() => dispatch(addNewDistrict(settlementId))}
						label="Add District"
					/>
				</Tabs>
			</AppBar>
			<DndProvider backend={HTML5Backend}>
				<Grid container>
					<Grid item>
						<BuildingList />
					</Grid>
					<Grid item xs>
						{districts.map((district, index) => (
							<TabPanel
								key={`district-tab-panel.${district.id}`}
								value={value}
								index={index}
							>
								{value === index ? (
									<DistrictView districtId={district.id} />
								) : null}
							</TabPanel>
						))}
						<Trashcan />
					</Grid>
				</Grid>
			</DndProvider>
		</Paper>
	);
}

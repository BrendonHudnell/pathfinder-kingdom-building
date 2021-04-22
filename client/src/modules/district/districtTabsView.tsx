import React, { ReactElement, ReactNode, useState } from 'react';
import {
	AppBar,
	Box,
	Grid,
	makeStyles,
	Paper,
	Tab,
	Tabs,
} from '@material-ui/core';
import { EntityId } from '@reduxjs/toolkit';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { useAppSelector } from '../../components/store';
import { Trashcan } from './trashcan';
import { BuildingList } from './buildingList';
import { selectDistrictsBySettlementId } from './districtSlice';
import { DistrictView } from './districtView';

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
		height: '100%',
	},
});

export interface DistrictTabsViewProps {
	settlementId: EntityId;
}

export function DistrictTabsView(props: DistrictTabsViewProps): ReactElement {
	const { settlementId } = props;

	const classes = useStyles();

	const [value, setValue] = useState(0);

	const districts = useAppSelector((state) =>
		selectDistrictsBySettlementId(state, settlementId)
	);

	return (
		<Paper className={classes.root}>
			<AppBar position="static">
				<Tabs value={value} onChange={(_, newValue) => setValue(newValue)}>
					{districts.map((district) => (
						<Tab key={`district-tab.${district.id}`} label={district.name} />
					))}
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

export interface TabPanelProps {
	children?: ReactNode;
	index: number;
	value: number;
}

export function TabPanel(props: TabPanelProps): ReactElement {
	const { children, value, index } = props;

	return (
		<Box p={3} hidden={value !== index}>
			{children}
		</Box>
	);
}

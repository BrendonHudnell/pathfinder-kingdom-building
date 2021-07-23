import React, { ReactElement, useState } from 'react';
import { AppBar, makeStyles, Paper, Tab, Tabs } from '@material-ui/core';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { useAppDispatch, useAppSelector } from '../../components/store';
import { addDistrict, selectDistrictsBySettlementId } from './districtSlice';
import { TabPanel } from './districtTabPanel';
import { DistrictDetails } from './districtDetails';
import { LotsView } from './lotsView';

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
	settlementId: number;
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
						onClick={() =>
							dispatch(addDistrict({ kingdomId: 1, settlementId }))
						}
						label="Add District"
					/>
				</Tabs>
			</AppBar>
			<DndProvider backend={HTML5Backend}>
				{districts.map((district, index) => (
					<TabPanel
						key={`district-tab-panel.${district.id}`}
						value={value}
						index={index}
					>
						{value === index ? <DistrictDetails district={district} /> : null}
						{value === index ? <LotsView district={district} /> : null}
					</TabPanel>
				))}
			</DndProvider>
		</Paper>
	);
}

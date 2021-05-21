import React, { ReactElement, useMemo, useState } from 'react';
import {
	Box,
	Card,
	Collapse,
	List,
	ListItem,
	ListItemText,
	makeStyles,
	TextField,
} from '@material-ui/core';

import { BuildingListCard } from './buildingListCard';
import { BuildingListType } from './buildingTypes';

const useStyles = makeStyles({
	button: {
		cursor: 'pointer',
	},
});

export function BuildingList(): ReactElement {
	const classes = useStyles();

	const [searchString, setSearchString] = useState('');
	const [bridgesOpen, setBridgesOpen] = useState(false);
	const [waterwaysOpen, setWaterwaysOpen] = useState(false);

	const bridges = useMemo(
		() =>
			Object.values(BuildingListType).filter((buildingListType) =>
				buildingListType.includes('Bridge')
			),
		[]
	);
	const waterways = useMemo(
		() =>
			Object.values(BuildingListType).filter((buildingListType) =>
				buildingListType.includes('Waterway')
			),
		[]
	);
	const buildings = useMemo(
		() =>
			Object.values(BuildingListType).filter(
				(buildingListType) =>
					!buildingListType.includes('Bridge') &&
					!buildingListType.includes('Waterway')
			),
		[]
	);

	return (
		<List
			component="div"
			dense
			disablePadding
			subheader={
				<TextField
					fullWidth
					variant="outlined"
					size="small"
					placeholder="Search"
					onChange={(e) => setSearchString(e.target.value.toLowerCase())}
				/>
			}
		>
			<Box style={{ height: '70vh', overflowY: 'scroll' }}>
				<ListItem
					className={classes.button}
					component={Card}
					onClick={() => setBridgesOpen(!bridgesOpen)}
				>
					<ListItemText primary="Bridges" />
					{bridgesOpen ? '^' : 'V'} {/* TODO change to icons */}
				</ListItem>
				<Collapse in={bridgesOpen}>
					<List component="div" dense disablePadding>
						{bridges.map((bridge) => (
							<ListItem key={bridge} component={Card}>
								<BuildingListCard buildingListType={bridge} />
							</ListItem>
						))}
					</List>
				</Collapse>
				<ListItem
					className={classes.button}
					component={Card}
					onClick={() => setWaterwaysOpen(!waterwaysOpen)}
				>
					<ListItemText primary="Waterways" />
					{waterwaysOpen ? '^' : 'V'} {/* TODO change to icons */}
				</ListItem>
				<Collapse in={waterwaysOpen}>
					<List component="div" dense disablePadding>
						{waterways.map((bridge) => (
							<ListItem key={bridge} component={Card}>
								<BuildingListCard buildingListType={bridge} />
							</ListItem>
						))}
					</List>
				</Collapse>
				{buildings
					.filter((building) => building.toLowerCase().includes(searchString))
					.map((building) => (
						<ListItem key={building} component={Card}>
							<BuildingListCard buildingListType={building} />
						</ListItem>
					))}
			</Box>
		</List>
	);
}

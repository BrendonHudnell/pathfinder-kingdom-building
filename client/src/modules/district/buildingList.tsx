import React, { ReactElement, useState } from 'react';
import { Box, Grid, TextField } from '@material-ui/core';

import { buildingList } from './buildingTypes';
import { BuildingCard } from './buildingCard';
import { Trashcan } from './trashcan';

export function BuildingList(): ReactElement {
	const [searchString, setSearchString] = useState('');

	return (
		<Grid container direction="column" alignItems="center" spacing={3}>
			<Grid item />
			<Grid item>
				<TextField
					variant="outlined"
					size="small"
					placeholder="Search"
					onChange={(e) => setSearchString(e.target.value.toLowerCase())}
				/>
				<Box style={{ height: '80vh', overflowY: 'scroll' }}>
					{buildingList
						.filter(
							(building) =>
								building.name &&
								building.name.toLowerCase().includes(searchString)
						)
						.map((building) => (
							<BuildingCard key={building.name} building={building} />
						))}
				</Box>
			</Grid>
			<Grid item>
				<Trashcan />
			</Grid>
		</Grid>
	);
}

import React, { ReactElement, useState } from 'react';
import { Box, Paper, TextField } from '@material-ui/core';

import { buildingList } from './buildingTypes';
import { BuildingCard } from './buildingCard';

export function BuildingList(): ReactElement {
	const [searchString, setSearchString] = useState('');

	return (
		<Paper>
			<TextField
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
		</Paper>
	);
}

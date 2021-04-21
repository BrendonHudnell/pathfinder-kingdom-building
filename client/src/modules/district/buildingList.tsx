import React, { ReactElement, useState } from 'react';
import { Paper, TextField } from '@material-ui/core';

import { buildingList } from './buildingTypes';
import { BuildingCard } from './buildingCard';

export function BuildingList(): ReactElement {
	const [searchString, setSearchString] = useState('');

	return (
		<Paper style={{ height: '80vh', overflowY: 'scroll' }}>
			<TextField
				placeholder="Search"
				onChange={(e) => setSearchString(e.target.value.toLowerCase())}
			/>
			{buildingList
				.filter(
					(building) =>
						building.name && building.name.toLowerCase().includes(searchString)
				)
				.map((building) => (
					<BuildingCard key={building.name} building={building} />
				))}
		</Paper>
	);
}

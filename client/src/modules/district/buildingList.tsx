import React, { Fragment, ReactElement, useState } from 'react';
import { Box, TextField } from '@material-ui/core';

import { BuildingListCard } from './buildingListCard';
import { BuildingListType } from './buildingTypes';

export function BuildingList(): ReactElement {
	const [searchString, setSearchString] = useState('');

	return (
		<Fragment>
			<TextField
				fullWidth
				variant="outlined"
				size="small"
				placeholder="Search"
				onChange={(e) => setSearchString(e.target.value.toLowerCase())}
			/>
			<Box style={{ height: '70vh', overflowY: 'scroll' }}>
				{Object.values(BuildingListType)
					.filter((buildingListType) =>
						buildingListType.toLowerCase().includes(searchString)
					)
					.map((buildingListType) => (
						<BuildingListCard
							key={buildingListType}
							buildingListType={buildingListType}
						/>
					))}
			</Box>
		</Fragment>
	);
}

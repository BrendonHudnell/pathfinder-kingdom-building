import React, { ReactElement } from 'react';
import { Grid } from '@material-ui/core';

import { Lot } from './lot';
import { District } from './districtSlice';

export interface LotGridRowProps {
	district: District;
	inclusiveStart: number;
	exclusiveEnd: number;
}

export function LotGridRow(props: LotGridRowProps): ReactElement {
	const { district, inclusiveStart, exclusiveEnd } = props;

	return (
		<Grid container item alignItems="center">
			{district.lotIds
				.slice(inclusiveStart, exclusiveEnd)
				.map((lotId, index) => (
					<Grid
						item
						xs={2}
						key={`${district.name}-lot-${index + inclusiveStart}`}
					>
						<Lot
							districtId={district.id}
							buildingId={lotId}
							index={index + inclusiveStart}
						/>
					</Grid>
				))}
		</Grid>
	);
}

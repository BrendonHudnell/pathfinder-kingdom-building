import React, { ReactElement } from 'react';
import { TableCell, TableRow } from '@material-ui/core';

import { Lot } from './lot';
import { District } from './districtSlice';

export interface LotTableRowProps {
	district: District;
	inclusiveStart: number;
	exclusiveEnd: number;
}

export function LotTableRow(props: LotTableRowProps): ReactElement {
	const { district, inclusiveStart, exclusiveEnd } = props;

	return (
		<TableRow>
			{district.lotIds
				.slice(inclusiveStart, exclusiveEnd)
				.map((lotId, index) => (
					<TableCell
						style={{ padding: 0, borderWidth: 0 }}
						key={`${district.name}-lot-${index + inclusiveStart}`}
					>
						<Lot
							district={district}
							buildingId={lotId}
							index={index + inclusiveStart}
						/>
					</TableCell>
				))}
		</TableRow>
	);
}

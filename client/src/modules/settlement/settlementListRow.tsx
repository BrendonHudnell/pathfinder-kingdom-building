import React, { ReactElement } from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { Settlement } from './settlementSlice';
import {
	useSettlementBonusByType,
	useSettlementSize,
	useSettlementUnrest,
} from './settlementUtils';

export interface SettlementRowProps {
	settlement: Settlement;
}

export function SettlementListRow(props: SettlementRowProps): ReactElement {
	const { settlement } = props;

	const size = useSettlementSize(settlement.id);
	const economy = useSettlementBonusByType(settlement.id, 'Economy');
	const stability = useSettlementBonusByType(settlement.id, 'Stability');
	const loyalty = useSettlementBonusByType(settlement.id, 'Loyalty');
	const unrest = useSettlementUnrest(settlement.id);

	return (
		<TableRow>
			<TableCell>
				<Link to={`/settlements/${settlement.id}`}>{settlement.name}</Link>
			</TableCell>
			<TableCell>{size}</TableCell>
			<TableCell>{settlement.hexId}</TableCell>
			<TableCell>{economy}</TableCell>
			<TableCell>{stability}</TableCell>
			<TableCell>{loyalty}</TableCell>
			<TableCell>{unrest}</TableCell>
		</TableRow>
	);
}

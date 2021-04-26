import React, { ReactElement } from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { Settlement } from './settlementSlice';
import {
	useSettlementBonusByType,
	getSettlementSize,
	useSettlementUnrest,
	useSettlementPopulation,
} from './settlementUtils';

export interface SettlementRowProps {
	settlement: Settlement;
}

export function SettlementListRow(props: SettlementRowProps): ReactElement {
	const { settlement } = props;

	const population = useSettlementPopulation(settlement.id);
	const size = getSettlementSize(population);
	const economy = useSettlementBonusByType(settlement.id, 'economy');
	const stability = useSettlementBonusByType(settlement.id, 'stability');
	const loyalty = useSettlementBonusByType(settlement.id, 'loyalty');
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

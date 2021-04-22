import React, { ReactElement } from 'react';

import { Settlement } from './settlementSlice';
import {
	useSettlementBonusByType,
	useSettlementPopulation,
	useSettlementSize,
	useSettlementUnrest,
} from './settlementUtils';

export interface SettlementDetailsProps {
	settlement: Settlement;
}

export function SettlementDetails(props: SettlementDetailsProps): ReactElement {
	const { settlement } = props;

	const economy = useSettlementBonusByType(settlement.id, 'economy');
	const stability = useSettlementBonusByType(settlement.id, 'stability');
	const loyalty = useSettlementBonusByType(settlement.id, 'loyalty');
	const unrest = useSettlementUnrest(settlement.id);

	const population = useSettlementPopulation(settlement.id);

	const size = useSettlementSize(settlement.id);

	return (
		<div>
			Name: {settlement.name}&nbsp;&nbsp;&nbsp;&nbsp;Size: {size}
			&nbsp;&nbsp;&nbsp;&nbsp;Population: {population}
			<br />
			<br />
			Economy: {economy}&nbsp;&nbsp;&nbsp;&nbsp;Stability: {stability}
			&nbsp;&nbsp;&nbsp;&nbsp;Loyalty: {
				loyalty
			}&nbsp;&nbsp;&nbsp;&nbsp;Unrest: {unrest}
		</div>
	);
}

import React, { Fragment, ReactElement } from 'react';
import { Paper } from '@material-ui/core';
import { useParams } from 'react-router';

import { useAppSelector } from '../../components/store';
import { DistrictTabsView } from '../district';
import { selectSettlementById } from './settlementSlice';
import { SettlementDetails } from './settlementDetails';

export interface SettlementProps {
	settlementId: string;
}

export function SettlementView(): ReactElement {
	const { settlementId } = useParams<SettlementProps>();

	const settlement = useAppSelector((state) =>
		selectSettlementById(state, settlementId)
	);

	return (
		<Fragment>
			{settlement ? (
				<Paper>
					<SettlementDetails settlement={settlement} />
					<DistrictTabsView settlementId={settlementId} />
				</Paper>
			) : null}
		</Fragment>
	);
}

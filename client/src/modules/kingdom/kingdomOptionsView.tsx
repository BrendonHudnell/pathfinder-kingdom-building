import React, { ReactElement } from 'react';
import { Grid } from '@material-ui/core';

import { useAppSelector } from '../../components/store';
import { FameView } from './fameView';
import { GovernmentView } from './governmentView';
import { ModifiersView } from './modifiersView';

export function KingdomOptionsView(): ReactElement {
	const options = useAppSelector((state) => state.kingdom.options);

	return (
		<Grid container item spacing={2} alignItems="center">
			{options.settlementModifiers && options.kingdomModifiers ? (
				<ModifiersView />
			) : null}
			{options.settlementModifiers &&
			options.kingdomModifiers &&
			options.kingdomGovernment ? (
				<GovernmentView />
			) : null}
			{options.settlementModifiers && options.kingdomFame ? <FameView /> : null}
		</Grid>
	);
}

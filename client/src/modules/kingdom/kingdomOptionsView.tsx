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
			{options.kingdomModifiers ? <ModifiersView /> : null}
			{options.kingdomFame ? <FameView /> : null}
			{options.kingdomModifiers && options.kingdomGovernment ? (
				<GovernmentView />
			) : null}
		</Grid>
	);
}

import React, { Fragment, ReactElement, useState } from 'react';
import { Badge, Button, Grid, Typography } from '@material-ui/core';

import { useAppSelector } from '../../components/store';
import { useAllSettlementsBonusByType } from '../settlement';
import { selectClaimedHexes } from '../hex';
import {
	getKingdomFame,
	getKingdomInfamy,
	getUnsetKingdomFame,
} from './kingdomUtils';
import { FameKingdomSizeChoicesDialog } from './fameKingdomSizeChoicesDialog';

export function FameView(): ReactElement {
	const [fameOpen, setFameOpen] = useState(false);

	const fameInfo = useAppSelector((state) => state.kingdom.fame);
	const kingdomSize = useAppSelector((state) =>
		selectClaimedHexes(state)
	).length;

	const settlementCorruption = useAllSettlementsBonusByType('corruption');
	const settlementCrime = useAllSettlementsBonusByType('crime');
	const settlementLore = useAllSettlementsBonusByType('lore');
	const settlementSociety = useAllSettlementsBonusByType('society');

	const kingdomFame = getKingdomFame(fameInfo);
	const kingdomInfamy = getKingdomInfamy(fameInfo);
	const kingdomUnsetFame = getUnsetKingdomFame(fameInfo, kingdomSize);

	const settlementFame = useAllSettlementsBonusByType('fame');

	const totalFame =
		Math.floor((settlementLore + settlementSociety) / 10) +
		settlementFame +
		kingdomFame; // todo add event bonuses
	const totalInfamy =
		Math.floor((settlementCorruption + settlementCrime) / 10) + kingdomInfamy; // todo add event bonuses

	return (
		<Fragment>
			<Grid item>
				<Typography>Fame: {totalFame}</Typography>
			</Grid>
			<Grid item>
				<Typography>Infamy: {totalInfamy}</Typography>
			</Grid>
			<Grid item>
				<Badge color="error" badgeContent={kingdomUnsetFame}>
					<Button onClick={() => setFameOpen(true)}>Size Bonuses</Button>
				</Badge>
				<FameKingdomSizeChoicesDialog
					fameInfo={fameInfo}
					kingdomSize={kingdomSize}
					open={fameOpen}
					onClose={() => setFameOpen(false)}
				/>
			</Grid>
		</Fragment>
	);
}

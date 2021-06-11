import React, { ReactElement } from 'react';
import { Box, Typography } from '@material-ui/core';

import { signedNumber } from '../../components/signedNumber';
import { getBuildingDisplayTypeByLotType } from './buildingUtils';
import { buildingInfoList, LotType } from './buildingTypes';

export interface LotTooltipProps {
	lotType: LotType;
}

export function LotTooltip(props: LotTooltipProps): ReactElement {
	const displayType = getBuildingDisplayTypeByLotType(props.lotType);
	const { name, description, cost, economy, stability, loyalty } =
		buildingInfoList[displayType];

	const bonuses =
		(economy ? `${signedNumber(economy)} Economy ` : '') +
		(stability ? `${signedNumber(stability)} Stability ` : '') +
		(loyalty ? `${signedNumber(loyalty)} Loyalty` : '');

	return (
		<Box>
			<Typography>{name}</Typography>
			<Typography>Cost: {cost}</Typography>
			{bonuses ? <Typography>Bonuses: {bonuses}</Typography> : null}
			<br />
			<Typography>{description}</Typography>
		</Box>
	);
}

import React, { ReactElement } from 'react';
import { Box, Typography } from '@material-ui/core';

import { signedNumber } from '../../components/signedNumber';
import { BuildingDisplayType, buildingInfoList } from './buildingTypes';

export interface DistrictTooltipProps {
	displayType: BuildingDisplayType;
}

export function DistrictTooltip(props: DistrictTooltipProps): ReactElement {
	const { cost, economy, stability, loyalty } = buildingInfoList[
		props.displayType
	];

	const bonuses =
		(economy ? `${signedNumber(economy)} Economy ` : '') +
		(stability ? `${signedNumber(stability)} Stability ` : '') +
		(loyalty ? `${signedNumber(loyalty)} Loyalty` : '');

	return (
		<Box>
			<Typography>Cost: {cost}</Typography>
			{bonuses ? <Typography>Bonuses: {bonuses}</Typography> : null}
		</Box>
	);
}

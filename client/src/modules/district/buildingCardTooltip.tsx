import React, { ReactElement } from 'react';
import { Box, Typography } from '@material-ui/core';

import { signedNumber } from '../../components/signedNumber';
import { Building } from './buildingTypes';

export interface BuildingCardTooltipProps {
	building: Building;
}

export function BuildingCardTooltip(
	props: BuildingCardTooltipProps
): ReactElement {
	const { description, cost, economy, stability, loyalty } = props.building;

	const bonuses =
		(economy ? `${signedNumber(economy)} Economy ` : '') +
		(stability ? `${signedNumber(stability)} Stability ` : '') +
		(loyalty ? `${signedNumber(loyalty)} Loyalty` : '');

	return (
		<Box>
			<Typography>Cost: {cost}</Typography>
			{bonuses ? <Typography>Bonuses: {bonuses}</Typography> : null}
			<Typography>{description}</Typography>
		</Box>
	);
}

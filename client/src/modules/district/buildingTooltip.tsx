import React, { ReactElement } from 'react';
import { Box, Typography } from '@material-ui/core';

import { signedNumber } from '../../components/signedNumber';
import { Building } from './buildingTypes';

export interface BuildingTooltipProps {
	building: Building;
	inLot?: boolean;
}

export function BuildingTooltip(props: BuildingTooltipProps): ReactElement {
	const { building, inLot } = props;
	const { name, description, cost, economy, stability, loyalty } = building;

	const bonuses =
		(economy ? `${signedNumber(economy)} Economy ` : '') +
		(stability ? `${signedNumber(stability)} Stability ` : '') +
		(loyalty ? `${signedNumber(loyalty)} Loyalty` : '');

	return (
		<Box>
			{inLot ? <Typography>{name}</Typography> : null}
			<Typography>Cost: {cost}</Typography>
			{bonuses ? <Typography>Bonuses: {bonuses}</Typography> : null}
			<Typography>{description}</Typography>
		</Box>
	);
}

import React, { ReactElement } from 'react';
import { Box, Typography } from '@material-ui/core';

import { signedNumber } from '../../components/signedNumber';
import { getBuildingDisplayTypeByListType } from './buildingUtils';
import { buildingInfoList, BuildingListType } from './buildingTypes';

export interface BuildingListTooltipProps {
	buildingListType: BuildingListType;
}

export function BuildingListTooltip(
	props: BuildingListTooltipProps
): ReactElement {
	const displayType = getBuildingDisplayTypeByListType(props.buildingListType);
	const {
		description,
		cost,
		economy,
		stability,
		loyalty,
		unrest,
	} = buildingInfoList[displayType];

	const bonuses =
		(economy ? `${signedNumber(economy)} Economy ` : '') +
		(stability ? `${signedNumber(stability)} Stability ` : '') +
		(loyalty ? `${signedNumber(loyalty)} Loyalty` : '') +
		(unrest ? `${signedNumber(unrest)} Unrest` : '');

	return (
		<Box>
			<Typography>Cost: {cost}</Typography>
			{bonuses ? <Typography>Bonuses: {bonuses}</Typography> : null}
			<br />
			<Typography>{description}</Typography>
		</Box>
	);
}

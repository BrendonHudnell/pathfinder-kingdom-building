import React, { Fragment, ReactElement } from 'react';
import { Box, Typography } from '@material-ui/core';

import { useAppSelector } from '../../components/store';
import { selectSettlementById } from '../settlement';
import { HexData } from './hexSlice';

export interface HexagonTooltipProps {
	hexData: HexData | undefined;
}

export function HexagonTooltip(props: HexagonTooltipProps): ReactElement {
	const { hexData } = props;

	const settlement = useAppSelector((state) =>
		selectSettlementById(state, hexData?.settlementId ?? -1)
	);

	return (
		<Fragment>
			{hexData ? (
				<Box>
					<Typography>{hexData.name}</Typography>
					<Typography>{settlement?.name}</Typography>
					<Typography>{hexData.notes}</Typography>
				</Box>
			) : null}
		</Fragment>
	);
}

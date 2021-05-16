import React, { ReactElement } from 'react';
import { makeStyles, Tooltip, Typography } from '@material-ui/core';

const useStyles = makeStyles({
	noMaxWidth: {
		maxWidth: 'none',
	},
});

export interface KingdomTooltipProps {
	positives: { [key: string]: number };
	negatives?: { [key: string]: number };
	children: ReactElement;
}

export function KingdomTooltip(props: KingdomTooltipProps): ReactElement {
	const { positives, negatives, children } = props;

	const classes = useStyles();

	const title =
		Object.entries(positives)
			.map(([key, value]) => `${value}(${key})`)
			.join(' + ') +
		(negatives
			? ' - ' +
			  Object.entries(negatives)
					.map(([key, value]) => `${value}(${key})`)
					.join(' - ')
			: '');

	return (
		<Tooltip
			classes={{ tooltip: classes.noMaxWidth }}
			title={<Typography>{title}</Typography>}
		>
			{children}
		</Tooltip>
	);
}

import React, { ReactElement, ReactNode } from 'react';
import { Box } from '@material-ui/core';

export interface TabPanelProps {
	children?: ReactNode;
	index: number;
	value: number;
}

export function TabPanel(props: TabPanelProps): ReactElement {
	const { children, value, index } = props;

	return (
		<Box p={3} hidden={value !== index}>
			{children}
		</Box>
	);
}

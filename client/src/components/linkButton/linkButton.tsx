import React, { ReactElement } from 'react';
import { Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

export interface LinkButtonProps {
	title: string;
	to: string;
	variant?: 'contained' | 'outlined' | 'text';
}

export function LinkButton(props: LinkButtonProps): ReactElement {
	return (
		<Link to={props.to} style={{ textDecoration: 'none' }}>
			<Button variant={props.variant ?? 'contained'}>
				<Typography>{props.title}</Typography>
			</Button>
		</Link>
	);
}

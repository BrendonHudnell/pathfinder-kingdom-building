import { makeStyles, Paper } from '@material-ui/core';
import React, { ReactElement } from 'react';
import { HexGrid, Layout, GridGenerator } from 'react-hexgrid';

import { useAppSelector } from '../../components/store';
import { HexagonView } from './hexagonView';
import { selectAllHexes } from './hexSlice';

const useStyles = makeStyles((theme) => {
	return {
		root: {
			paddingLeft: theme.spacing(30),
			paddingRight: theme.spacing(30),
		},
	};
});

export function HexGridView(): ReactElement {
	const classes = useStyles();

	const hexagons = GridGenerator.rectangle(8, 12).filter(
		(_, index) => index % 16 !== 15
	);

	const allHexData = useAppSelector((state) => selectAllHexes(state));

	return (
		<Paper className={classes.root}>
			<HexGrid width="100%" height="100%" viewBox="-15 -15 151 193">
				<Layout flat={false} spacing={1.015}>
					{hexagons.map((hex, i) => (
						<HexagonView
							key={`hexagon-${i}`}
							hex={hex}
							hexData={allHexData[i]}
						/>
					))}
				</Layout>
			</HexGrid>
		</Paper>
	);
}

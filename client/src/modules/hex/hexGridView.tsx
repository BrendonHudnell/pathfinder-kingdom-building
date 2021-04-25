import React, { ReactElement } from 'react';
import { HexGrid, Layout, GridGenerator, Hex } from 'react-hexgrid';
import { HexagonView } from './hexagonView';

export function HexGridView(): ReactElement {
	const hexagons: Hex[] = GridGenerator.rectangle(8, 12);

	return (
		<HexGrid width="100%" height="100%" viewBox="-15 -15 151 193">
			<Layout flat={false}>
				{hexagons.map((hex, i) => (
					<HexagonView key={`hexagon-${i}`} hex={hex} hexId={i} />
				))}
			</Layout>
		</HexGrid>
	);
}

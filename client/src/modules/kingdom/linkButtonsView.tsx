import React, { ReactElement } from 'react';
import { Grid } from '@material-ui/core';

import { LinkButton } from '../../components/linkButton';

export function LinkButtonsView(): ReactElement {
	return (
		<Grid container item spacing={2} alignItems="center">
			<Grid item>
				<LinkButton title="Hexes" to="/" />
			</Grid>
			<Grid item>
				<LinkButton title="Settlements" to="/settlements" />
			</Grid>
			<Grid item>
				<LinkButton title="Leadership" to="/leadership" />
			</Grid>
			<Grid item>
				<LinkButton title="Events" to="/events" />
			</Grid>
			{/* <Grid item> TODO remove
						<LinkButton title="Army" to="/army" />
					</Grid> */}
		</Grid>
	);
}

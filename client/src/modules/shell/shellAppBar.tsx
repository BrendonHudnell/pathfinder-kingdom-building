import React, { ReactElement } from 'react';
import { AppBar, Toolbar } from '@material-ui/core';

import { HorizontalSpacer } from '../../components/horizontalSpacer';
import { OptionsDialogButton } from '../kingdom';
import { UserLogoutButton } from '../user';

export function ShellAppBar(): ReactElement {
	return (
		<AppBar position="static">
			<Toolbar variant="dense">
				<HorizontalSpacer />
				<OptionsDialogButton />
				<UserLogoutButton />
			</Toolbar>
		</AppBar>
	);
}

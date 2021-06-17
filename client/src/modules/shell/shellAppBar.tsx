import React, { ReactElement } from 'react';
import { AppBar, Button, Toolbar, Tooltip } from '@material-ui/core';

import { useAppSelector } from '../../components/store';
import { HorizontalSpacer } from '../../components/horizontalSpacer';
import { OptionsDialogButton } from '../kingdom/optionsDialogButton';

export function ShellAppBar(): ReactElement {
	// TODO remove when server is connected
	const state = useAppSelector((state) => state);
	function saveState(): void {
		localStorage.setItem('kingdom', JSON.stringify(state.kingdom));
		localStorage.setItem(
			'leadership',
			JSON.stringify(state.leadership.entities)
		);
		localStorage.setItem(
			'settlements',
			JSON.stringify(state.settlement.entities)
		);
		localStorage.setItem('districts', JSON.stringify(state.district.entities));
		localStorage.setItem('hexes', JSON.stringify(state.hex.entities));
	}

	// TODO remove when server is connected
	function resetState(): void {
		localStorage.clear();
	}

	return (
		<AppBar position="static">
			<Toolbar variant="dense">
				<Button variant="contained" color="primary" onClick={() => saveState()}>
					Save Current Kingdom
				</Button>
				<Tooltip title="Refresh page to see defaults">
					<Button
						variant="contained"
						color="secondary"
						onClick={() => resetState()}
					>
						Reset to Defaults
					</Button>
				</Tooltip>

				<HorizontalSpacer />

				<OptionsDialogButton />
				{/* TODO add login */}
			</Toolbar>
		</AppBar>
	);
}

import React, { ReactElement } from 'react';
import { Button, Typography } from '@material-ui/core';
import ky from 'ky';

import { deleteLoginCookie } from '../../components/cookies';
import { useAppDispatch } from '../../components/store';
import { logout } from './userSlice';

export function UserLogoutButton(): ReactElement {
	const dispatch = useAppDispatch();

	async function handleLogout(): Promise<void> {
		deleteLoginCookie();
		dispatch(logout());
		await ky.post('api/user/logout', { throwHttpErrors: false });
	}

	return (
		<Button color="inherit" onClick={handleLogout}>
			<Typography>Logout</Typography>
		</Button>
	);
}

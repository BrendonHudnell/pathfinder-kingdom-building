import React, { ReactElement } from 'react';
import { Container } from '@material-ui/core';

import { UserLogin } from './userLogin';
import { UserRegister } from './userRegister';

export function UserView(): ReactElement {
	return (
		<Container maxWidth="xs">
			<UserLogin />
			<br />
			<UserRegister />
		</Container>
	);
}

import React, { ReactElement } from 'react';
import { Container } from '@material-ui/core';
import { Redirect, Route, Switch } from 'react-router-dom';

import { UserLogin } from './userLogin';
import { UserRegister } from './userRegister';

export function UserView(): ReactElement {
	return (
		<Container>
			<Switch>
				<Route exact path="/" component={UserLogin} />
				<Route exact path="/register" component={UserRegister} />
				<Redirect to="/" />
			</Switch>
		</Container>
	);
}

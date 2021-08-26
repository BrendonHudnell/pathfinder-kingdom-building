import { loginCookieName } from './setLoginCookie';

export function deleteLoginCookie(): void {
	document.cookie =
		loginCookieName + '=true;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/';
}

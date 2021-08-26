import { loginCookieName } from './setLoginCookie';

export function checkLoginCookie(): boolean {
	const name = loginCookieName + '=';

	const decodedCookie = decodeURIComponent(document.cookie);
	const cookies = decodedCookie.split(';');

	return cookies.some((cookie) => {
		cookie.trim();
		if (cookie.indexOf(name) == 0) {
			return true;
		}
		return false;
	});
}

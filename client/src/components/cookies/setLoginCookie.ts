export const loginCookieName = 'loggedIn';

export function setLoginCookie(expires: string): void {
	document.cookie = loginCookieName + '=true;expires=' + expires + ';path=/';
}

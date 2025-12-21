type CookieProps = {
  expires?: number | Date | string;
  path?: string;
  secure?: boolean;
  sameSite?: "Strict" | "Lax" | "None";
  domain?: string;
  [key: string]: string | number | boolean | Date | undefined;
};

export function setCookie(
  name: string,
  value: string,
  props: CookieProps = {}
) {
  let exp = props.expires;

  if (typeof exp === "number") {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    props.expires = d;
  }

  if (props.expires instanceof Date) {
    props.expires = props.expires.toUTCString();
  }

  let updatedCookie =
    encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (const propName in props) {
    const propValue = props[propName];

    if (propValue === undefined) continue;

    updatedCookie += "; " + propName;
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}

export function getCookie(name: string): string | undefined {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" + name.replace(/([.$?*|{}()[]\\\/+^])/g, "\\$1") + "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name: string) {
  setCookie(name, "", { "max-age": -1 });
}

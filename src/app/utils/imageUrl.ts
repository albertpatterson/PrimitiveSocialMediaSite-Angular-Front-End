export function createUrl(pathname: string): string{
  return `${document.location.origin}:9000/social-media/static/${pathname}`;
}

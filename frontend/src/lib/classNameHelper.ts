export function classNameHelper(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

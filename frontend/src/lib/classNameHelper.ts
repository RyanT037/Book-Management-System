/**
 * A utility function to conditionally join CSS class names together.
 * Filters out falsy values (false, null, undefined, empty strings) 
 * and joins the remaining strings with a space.
 */
export function classNameHelper(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

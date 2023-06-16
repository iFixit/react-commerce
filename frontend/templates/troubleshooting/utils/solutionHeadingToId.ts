export function solutionHeadingToId(heading: string) {
   return encodeURI(heading.toLowerCase().replace(/ /g, '-'));
}

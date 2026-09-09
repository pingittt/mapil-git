// Navigation helper: section anchors generally point to <section id=...>
// elements that only exist on the homepage. Prefixing them with "/" makes
// them resolve to the homepage section no matter which route the user is
// currently on (home, /join/member, etc.). Full paths are left untouched.

export function sectionHref(href: string): string {
  return href.startsWith("#") ? `/${href}` : href;
}
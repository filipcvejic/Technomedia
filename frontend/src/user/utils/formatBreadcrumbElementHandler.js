export default function ormatBreadcrumbHandler(word) {
  return word
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

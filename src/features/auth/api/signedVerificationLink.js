const VERIFICATION_PREFIXES = [
  "/auth/verify-email/",
  "/verify-email/",
  "/email/verify/",
  "/api/auth/verify-email/",
];

export function normalizeSignedQuery(search) {
  return search.replaceAll("&amp;signature=", "&signature=");
}

export function readSignedVerificationLink(pathname, search) {
  const matchingPrefix = VERIFICATION_PREFIXES.find((prefix) =>
    pathname.startsWith(prefix)
  );

  if (!matchingPrefix) return null;

  const pathValues = pathname.slice(matchingPrefix.length);
  const separatorIndex = pathValues.indexOf("/");

  if (separatorIndex <= 0 || separatorIndex === pathValues.length - 1) {
    return null;
  }

  const id = pathValues.slice(0, separatorIndex);
  const hash = pathValues.slice(separatorIndex + 1);

  if (hash.includes("/")) return null;

  const signedQuery = normalizeSignedQuery(search);
  const searchParams = new URLSearchParams(signedQuery);

  if (
    !searchParams.get("expires") ||
    !searchParams.get("signature") ||
    searchParams.has("amp;signature")
  ) {
    return null;
  }

  return { id, hash, signedQuery };
}

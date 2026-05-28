const PROTECTED_NICHES = ["cloneyfanz"] as const;
type ProtectedNiche = (typeof PROTECTED_NICHES)[number];

export class ProtectedNicheAccessError extends Error {
  constructor(niche: string) {
    super(
      `ACCESS DENIED: The "${niche}" niche is protected and requires human legal approval before implementation. ` +
        `See protected-niches/${niche}/DO_NOT_BUILD_YET.md for requirements.`
    );
    this.name = "ProtectedNicheAccessError";
  }
}

export function guardProtectedNiche(niche: string): never {
  throw new ProtectedNicheAccessError(niche);
}

export function isProtectedNiche(niche: string): niche is ProtectedNiche {
  return PROTECTED_NICHES.includes(niche as ProtectedNiche);
}

export function checkRouteForProtectedNiche(path: string): void {
  for (const niche of PROTECTED_NICHES) {
    if (path.toLowerCase().includes(niche)) {
      guardProtectedNiche(niche);
    }
  }
}

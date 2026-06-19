export const authRoles = ['Consumer', 'Creator', 'Vendor', 'Designer', 'Tailor', 'Event Organizer', 'Investor'] as const;

export type AuthRole = (typeof authRoles)[number];

export const betterAuthConfig = {
  provider: 'better-auth',
  rbac: authRoles,
};

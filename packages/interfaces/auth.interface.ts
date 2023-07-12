interface AuthUserMetaData {
  creationTime?: string;
  lastSignInTime?: string;
}

export interface IUser {
  uid: string;
  accessToken?: string;
  refreshToken: string;
  displayName: string | null;
  email: string | null;
  emailVerified: boolean;
  isAnonymous: boolean;
  metadata?: AuthUserMetaData;
  photoURL: string | null;
  provider: string;
}

export interface DBUserSchema {
  uid: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  photoURL: string | null;
  provider: string;
  ageGeoRequirements: boolean;
  acceptPrivacyTerms: boolean;
}

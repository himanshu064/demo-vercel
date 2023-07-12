import { IFirebaseUser } from '@lantern/api';
import { IUser } from '@lantern/interfaces';

export const transformAuthUser = (
  user: IFirebaseUser,
  accessToken?: string
): IUser => {
  return {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    emailVerified: user.emailVerified,
    metadata: {
      creationTime: user.metadata.creationTime,
      lastSignInTime: user.metadata.lastSignInTime,
    },
    isAnonymous: user.isAnonymous,
    photoURL: user.photoURL,
    provider: user.providerData[0]?.providerId,
    accessToken,
    refreshToken: user?.refreshToken,
  };
};

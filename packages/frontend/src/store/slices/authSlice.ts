import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createUserWithCredentials,
  signInWithCredentials,
  signInWithGoogle,
  getCurrentUser,
  logout,
} from '@lantern/api';
import { IUser } from '@lantern/interfaces';
import { notifySuccess } from '../../helpers/toaster';
import {
  TLoginSchema,
  TRegisterSchema,
} from '../../validation/auth.validation';
import { transformAuthUser } from '../../helpers/auth-helper';

export const loginWithGoogleAction = createAsyncThunk(
  'auth/loginWithGoogle',
  async (data, thunkAPI) => {
    try {
      const response = await signInWithGoogle();
      const _user = response.user as any;
      const user = await getCurrentUser(_user.email);
      const authUser: IUser = transformAuthUser(_user, _user.accessToken);
      return {
        authUser,
        user,
      };
    } catch (error) {
      const err = error as Error;
      console.log(err, 'error is here');
    }
  }
);

export const registerWithCredentialsAction = createAsyncThunk(
  'auth/registerWithCredentialsAction',
  async (data: TRegisterSchema, thunkAPI) => {
    try {
      const { user: userResponse } = await createUserWithCredentials(
        data.email,
        data.password,
        data.firstName,
        data.lastName,
        data.ageGeoRequirements,
        data.acceptPrivacyTerms
      );
      const _user = userResponse as any;
      const user = await getCurrentUser(_user.email);
      const authUser: IUser = transformAuthUser(_user, _user.accessToken);
      // logout the user immediately, to prevent automatically sign in after register user
      thunkAPI.dispatch(logoutAction({ notifySuccess: false }));
      return {
        user,
        authUser,
      };
    } catch (error) {
      const err = error as Error;
      console.log(err.message, 'Error => regsiter user');
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const loginWithCredentialsAction = createAsyncThunk(
  'auth/loginWithCredentialsAction',
  async (data: TLoginSchema, thunkAPI) => {
    try {
      const { user: userResponse } = await signInWithCredentials(
        data.email,
        data.password
      );
      const _user = userResponse as any;
      const user = await getCurrentUser(data.email);
      const authUser: IUser = transformAuthUser(_user, _user.accessToken);
      return {
        user,
        authUser,
      };
    } catch (error) {
      const err = error as Error;
      console.log(err.message, 'Error => login user');
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const logoutAction = createAsyncThunk(
  'auth/logout',
  async (
    data: { notifySuccess?: boolean } = { notifySuccess: true },
    thunkAPI
  ) => {
    try {
      await logout();
      thunkAPI.dispatch(reset());
      if (data.notifySuccess) {
        notifySuccess('Logout successfully!');
      }

      return {};
    } catch (error) {
      console.log(error, 'errors are here!');
    }
  }
);

interface IAuthState {
  error: any;
  googleLoading: boolean;
  credentialLoading: boolean;
  authUser: IUser | null;
  user: Partial<TRegisterSchema> | null;
}
const initialState: IAuthState = {
  error: '',
  googleLoading: false,
  credentialLoading: false,
  authUser: null,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<any>) => {
      state.authUser = action.payload.authUser;
      state.user = action.payload.user;
      state.error = '';
      state.credentialLoading = false;
      state.googleLoading = false;
    },
    reset: (state) => {
      state.error = '';
      state.user = null;
      state.authUser = null;
      state.googleLoading = false;
      state.credentialLoading = false;
    },
  },
  extraReducers: (builders) => {
    /** Google Login **/
    builders.addCase(loginWithGoogleAction.fulfilled, (state, action) => {
      state.googleLoading = false;
      state.user = action.payload?.user!;
      notifySuccess('Logged in successfully!');
    });
    builders.addCase(loginWithGoogleAction.rejected, (state, action) => {
      state.googleLoading = false;
    });
    builders.addCase(loginWithGoogleAction.pending, (state, action) => {
      state.googleLoading = false;
      state.error = '';
    });

    /** Register with credentials **/
    builders.addCase(
      registerWithCredentialsAction.fulfilled,
      (state, action) => {
        state.credentialLoading = false;
        notifySuccess('Account registered successfully!');
      }
    );
    builders.addCase(
      registerWithCredentialsAction.rejected,
      (state, action) => {
        state.credentialLoading = false;
        state.error = action.payload;
      }
    );
    builders.addCase(registerWithCredentialsAction.pending, (state, action) => {
      state.credentialLoading = true;
      state.error = '';
    });

    /** Login with credentials **/
    builders.addCase(loginWithCredentialsAction.fulfilled, (state, action) => {
      state.credentialLoading = false;
      notifySuccess('Logged in successfully!');
    });
    builders.addCase(loginWithCredentialsAction.rejected, (state, action) => {
      state.credentialLoading = false;
      state.error = action.payload;
    });
    builders.addCase(loginWithCredentialsAction.pending, (state, action) => {
      state.credentialLoading = true;
      state.error = '';
    });
  },
});

export const { reset, setAuth } = authSlice.actions;

export default authSlice.reducer;

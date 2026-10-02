import type { Session, User } from '@supabase/supabase-js';
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { supabase } from '@/config/supabase';
import { formatError } from '@/utils/format-error';

type AuthState = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  session: null,
  user: null,
  loading: true,
  error: null,
};

export const initializeAuth = createAsyncThunk('auth/initialize', async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  } catch (error) {
    throw new Error(formatError(error));
  }
});

export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return data.session;
    } catch (error) {
      throw new Error(formatError(error));
    }
  },
);

export const signOut = createAsyncThunk('auth/signOut', async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    throw new Error(formatError(error));
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    sessionChanged: (state, action: PayloadAction<Session | null>) => {
      state.session = action.payload;
      state.user = action.payload?.user ?? null;
      state.loading = false;
      state.error = null;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.session = action.payload;
        state.user = action.payload?.user ?? null;
        state.loading = false;
      })
      .addCase(initializeAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'No se pudo iniciar la sesión.';
      })
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.session = action.payload;
        state.user = action.payload?.user ?? null;
        state.loading = false;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'No se pudo iniciar sesión.';
      })
      .addCase(signOut.fulfilled, (state) => {
        state.session = null;
        state.user = null;
        state.error = null;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.error = action.error.message ?? 'No se pudo cerrar sesión.';
      });
  },
});

export const { sessionChanged, clearAuthError } = authSlice.actions;
export default authSlice.reducer;

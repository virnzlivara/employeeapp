import { IUser } from './model/IUser';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'; 
import { RootState } from '../../app/store'; 
import {  fetchUsers } from './userAPI'; 

export interface UserState {
  data: IUser[],
  loggedInUser: string,
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UserState = {
  data: [],
  loggedInUser: '',
  status: 'idle',
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const retrieveUsers = createAsyncThunk(
  'user/retrieveUser',
  async () => { 
    const response = await fetchUsers();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'users',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: { 
    setLoggedInUser: (state, action: PayloadAction<string>) => { 
      state.loggedInUser = action.payload
    },
    setLoggedOutUser: (state) => { 
      state.loggedInUser = '';
    }, 
    addUser: (state, action: PayloadAction<IUser>) => { 
      state.data.push(action.payload!)
    },
    deleteUser: (state, action: PayloadAction<number>) => { 
      state.data = state.data.filter(item => item.branchId !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(retrieveUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(retrieveUsers.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload;
      })
      .addCase(retrieveUsers.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setLoggedInUser, setLoggedOutUser, addUser, deleteUser} = userSlice.actions;
 
export const selectAllUsers = (state: RootState) => state;
export const selectLoggedInUser = (state: RootState) => state.user.loggedInUser 

 

export default userSlice.reducer;

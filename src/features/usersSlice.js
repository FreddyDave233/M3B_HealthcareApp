import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API =
    "https://425b0681-6d67-4258-837b-4ef9dc7bc8ab-00-2fi27jczr1g9d.pike.replit.dev";

//===================================================

//Create User
export const createUser = createAsyncThunk(
    "users/createUser",
    async ({ name, phone, email, age, gender, address, birthDate }) => {
        const database = {
            user_name: name,
            user_phone: phone,
            user_email: email,
            user_age: age,
            user_gender: gender,
            user_address: address,
            user_birth_date: birthDate,
        };

        const res = await axios.post(`${API}/users`, database);
        return res.data;
    },
);

//GET All detail
export const fetchAllUsers = createAsyncThunk(
    "users/fetchAllUsers",
    async () => {
        // const userId = decode.id;

        const res = await fetch(`${API}/users`);
        const users = await res.json();
        return users;
    },
);

//GET Personal detail
export const fetchUserDetail = createAsyncThunk(
    "users/fetchUserDetail",
    async ({ email }) => {
        const res = await fetch(`${API}/users/${email}`);
        const userDetail = await res.json();
        return userDetail;
    },
);

//GET Patient detail (STUFF)
export const fetchPatients = createAsyncThunk(
    "users/fetchPatients",
    async () => {
        // const userId = decode.id;
        const res = await fetch(`${API}/users/${stuff_id}/doctor`);
        const users = await res.json();
        return users;
    },
);

//Update Personal detail
export const updateUserDetail = createAsyncThunk(
    "users/updateUserDetail",
    async () => {
        // const userId = decode.id;

        const database = {
            user_name: "Jobiden",
            user_phone: "000",
            user_email: "no more",
            user_address: "goner",
        };

        const userId = 15;
        const res = await axios.put(`${API}/users/detail/${userId}`, database);
        console.log(res.data);
        return res.data;
    },
);

//Update Health detail (STUFF)
export const updateUserHealth = createAsyncThunk(
    "users/updateUserHealth",
    async ({ status, health, description, userID }) => {
        // const userId = decode.id;

        const database = {
            patient_status: status,
            patient_health: health,
            patient_description: description,
        };

        const res = await axios.put(`${API}/users/health/${userID}`, database);
        return res.data;
    },
);

//Remove user detail
export const removeUserDetail = createAsyncThunk(
    "users/removeUserDetail",
    async () => {
        // const userId = decode.id;

        const userID = 15;
        const res = await axios.delete(`${API}/users/${userID}`);
        return res.data;
    },
);

//===================================================

const usersSlice = createSlice({
    name: "usersSlice",
    initialState: { users: [], profile: [] },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createUser.fulfilled, (state, action) => {
                state.users = action.payload;
                // state.users = [...state.users, action.payload];
                console.log(state.users);
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(fetchUserDetail.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(fetchPatients.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(updateUserDetail.fulfilled, (state, action) => {
                if (action.payload.updatedUser)
                    state.users = state.users.map((user) => {
                        if (user.id === action.payload.updatedUser.id) {
                            return action.payload.updatedUser;
                        } else {
                            return user;
                        }
                    });
            })
            .addCase(updateUserHealth.fulfilled, (state, action) => {
                if (action.payload.updatedUser) {
                    state.users = state.users.map((user) => {
                        if (user.id === action.payload.updatedUser.id) {
                            return action.payload.updatedUser;
                        } else {
                            return user;
                        }
                    });
                }
            })
            .addCase(removeUserDetail.fulfilled, (state, action) => {
                if (action.payload.deletedUser)
                    state.users = state.users.filter(
                        (user) => user.id !== action.payload.deletedUser.id,
                    );
            });
    },
});

export default usersSlice.reducer;

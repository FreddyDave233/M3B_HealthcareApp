import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://425b0681-6d67-4258-837b-4ef9dc7bc8ab-00-2fi27jczr1g9d.pike.replit.dev";

//===================================================

//CREATE APPT
export const createAppt = createAsyncThunk(
    "appts/createAppt",
    async () => {
        const database = {
            service_type: "",
            description: "",
            date: "",
            time: "",
            patientId: "",
            doctorId: ""
        };

        const res = await axios.post(`${API}/appts`, database);
        return res.data;
    }
)

//GET ALL APPT
export const fetchAllAppts = createAsyncThunk(
    "appts/fetchAllAppts",
    async () => {
        const res = await fetch(`${API}/appts`);
        const users = await res.json();
        return users;
    }
)

//GET USER APPT
export const fetchUserAppts = createAsyncThunk(
    "appts/fetchUserDetail",
    async () => {
        const res = await fetch(`${API}/appts/users/${userID}`);
        const data = await res.json();
        return data;
    }
)

//GET DOCTOR APPT
export const fetchDoctorAppts = createAsyncThunk(
    "appts/fetchPatients",
    async () => {
        // const userId = decode.id;
        const res = await fetch(`${API}/appts/doctor/${stuff_id}`);
        const data = await res.json();
        return data;
    }
)

//UPDATE APPT
export const updateApptDetail = createAsyncThunk(
    "appts/updateApptDetail",
    async () => {
        // const userId = decode.id;

        const database = {
            appts_date: "",
            appts_time: ""
        };

        const userId = 15;
        const res = await axios.put(`${API}/users/detail/${userId}`, database);
        console.log(res.data);
        return res.data;
    }
)

//REMOVE APPT
export const removeAppt = createAsyncThunk(
    "appts/removeAppt",
    async () => {
        // const userId = decode.id;

        const userID = 15;
        const res = await axios.delete(`${API}/appts/${userID}`);
        return res.data;
    }
)

//===================================================

const apptsSlice = createSlice({
    name: "apptsSlice",
    initialState: { appts: [] },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createAppt.fulfilled, (state, action) => {
            state.appts = [...state.appts, action.payload];
            console.log(state.appts);
        })
        .addCase(fetchAllAppts.fulfilled, (state, action) => {
            state.appts = action.payload;
        })
        .addCase(fetchUserAppts.fulfilled, (state, action) => {
            state.appts = action.payload;
        })
        .addCase(fetchDoctorAppts.fulfilled, (state, action) => {
            state.appts = action.payload;
        })
        .addCase(updateApptDetail.fulfilled, (state, action) => {
            if (action.payload.updatedUser) { 
                state.appts = state.appts.map((appt) => {
                    if (appt.id === action.payload.updatedAppt.id) {
                        return action.payload.updatedAppt;
                    } else {
                        return user;
                    }
                });
            };
        })
        .addCase(removeAppt.fulfilled, (state, action) => {
            if (action.payload.deletedAppt)
                state.appts = state.appts.filter((appt) => 
                    appt.id !== action.payload.deletedAppt.id
                );
        })
    }
})

export default apptsSlice.reducer;
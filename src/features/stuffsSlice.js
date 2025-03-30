import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://425b0681-6d67-4258-837b-4ef9dc7bc8ab-00-2fi27jczr1g9d.pike.replit.dev";

//===================================================

//Create Stuff
export const createStuff = createAsyncThunk(
    "stuffs/createStuff",
    async ({name, phone, email, age, gender, address, birthDate, position, specialist, department}) => {
        const database = {
            stuff_name: name,
            stuff_address: address,
            stuff_phone: phone,
            stuff_email: email,
            stuff_age: age,
            stuff_gender: gender,
            stuff_birth_date: birthDate,
            stuff_position: position,
            stuff_specialist: specialist,
            stuff_department: department,
        };

        const res = await axios.post(`${API}/stuffs`, database);
        return res.data;
    }
)

//GET All detail
export const fetchAllStuff = createAsyncThunk(
    "stuffs/fetchAllStuff",
    async () => {
        const res = await fetch(`${API}/stuffs`);
        const users = await res.json();
        return users;
    }
)

//GET Stuff detail (Do we need it? As we can used fetchAllStuff and set the true id)
export const fetchStuff = createAsyncThunk(
    "stuffs/fetchStuff",
    async (email) => {
        // const userId = decode.id;
        console.log("Fetch stuff id", email);
        
        const res = await fetch(`${API}/stuffs/${email}`);
        const userDetail = await res.json();
        return userDetail;
    }
)

//Update Stuff detail
export const updateStuffDetail = createAsyncThunk(
    "stuffs/updateStuffDetail",
    async () => {
        // const userId = decode.id;

        const database = {
            stuff_name: "Jobiden",
            stuff_phone: "000",
            stuff_email: "no more",
            stuff_address: "goner",
        };

        const userId = 15;
        const res = await axios.put(`${API}/stuffs/${userId}`, database);
        console.log(res.data);
        return res.data;
    }
)

//Remove user detail
export const removeStuffDetail = createAsyncThunk(
    "stuffs/removeStuffDetail",
    async () => {
        // const userId = decode.id;

        const userID = 15;
        const res = await axios.delete(`${API}/stuffs/${userID}`);
        return res.data;
    }
)

//===================================================

const stuffsSlice = createSlice({
    name: "stuffSlice",
    initialState: { stuffs: [], profile: [] },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createStuff.fulfilled, (state, action) => {
            state.stuffs = [...state.stuffs, action.payload];
        })
        .addCase(fetchAllStuff.fulfilled, (state, action) => {
            state.stuffs = action.payload;
        })
        .addCase(fetchStuff.fulfilled, (state, action) => {
            state.stuffs = action.payload;
        })
        .addCase(updateStuffDetail.fulfilled, (state, action) => {
            if (action.payload.updatedUser)
                state.stuffs = state.stuffs.map((stuff) => {
                    if (stuff.id === action.payload.updatedStuff.id) {
                        return action.payload.updatedStuff;
                    } else {
                        return user;
                    }
                });
        })
        .addCase(removeStuffDetail.fulfilled, (state, action) => {
            if (action.payload.deletedUser)
                state.stuffs = state.stuffs.filter((user) => 
                    user.id !== action.payload.deletedStuff.id
                );
        })
    }
})

export default stuffsSlice.reducer;
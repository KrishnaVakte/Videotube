import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    loading: false,
    status: false,
    userData: null,
    signupData: null,
    notifications: [],
    notificationsLoading: false
};

export const createAccount = createAsyncThunk("register", async (data) => {
    const formData = new FormData();
    formData.append("avatar", data.avatar[0]);
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("fullname", data.fullName);
    formData.append("otp", data.otp);
    if (data.coverImage) {
        formData.append("coverImage", data.coverImage[0]);
    }

    try {
        const response = await axiosInstance.post("/user/register", formData);
        console.log(response.data);
        toast.success("Registered successfully!!!");
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const userLogin = createAsyncThunk("login", async (data) => {
    try {
        const response = await axiosInstance.post("/user/login", data);
        console.log(response.data)
        localStorage.setItem('accessToken', response.data.data.accessToken);
        localStorage.setItem('refreshToken', response.data.data.refreshToken);
        return response.data.data.user;
    } catch (error) {
        toast.error("Invalid Credintials.. Try Agian.");
        throw error;
    }
});

export const sendOtp = createAsyncThunk("sendOtp", async (email) => {
    try {
        const response = await axiosInstance.post("/user/sendotp", { email });
        toast.success("OTP Sent Successfully")
        return response.data;
    } catch (error) {
        toast.error("OTP not sent, Try again...");
        throw error;
    }
});

export const userLogout = createAsyncThunk("logout", async () => {
    try {
        const response = await axiosInstance.post("/user/logout", null, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        localStorage.removeItem('accessToken', response.data.data.accessToken);
        localStorage.removeItem('refreshToken', response.data.data.refreshToken);
        toast.success(response.data?.message);
        return response.data;
    } catch (error) {
        toast.error("Some Error Occured , try again..");
        throw error;
    }
});

export const refreshAccessToken = createAsyncThunk(
    "refreshAccessToken",
    async (data) => {
        try {
            const response = await axiosInstance.post(
                "/user/refresh-token",
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('refreshToken')}`
                    }
                }
            );
            return response.data;
        } catch (error) {
            toast.error("Some Error Occured , try again..");
            throw error;
        }
    }
);

export const changePassword = createAsyncThunk(
    "changePassword",
    async (data) => {
        try {
            const response = await axiosInstance.post(
                "/user/change-password",
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                }
            );
            toast.success(response.data?.message);
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.error);
            throw error;
        }
    }
);

export const getCurrentUser = createAsyncThunk("getCurrentUser", async () => {
    const response = await axiosInstance.post("/user/current-user", null, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    });
    return response.data.data;
});

export const updateAvatar = createAsyncThunk("updateAvatar", async (avatar) => {
    try {
        const response = await axiosInstance.patch(
            "/user/avatar",
            avatar,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            }
        );
        toast.success("Updated details successfully!!!");
        return response.data.data;
    } catch (error) {
        toast.error("Some Error Occured , try again..");
        throw error;
    }
});

export const updateCoverImg = createAsyncThunk(
    "updateCoverImg",
    async (coverImage) => {
        try {
            const formData = new FormData();
            formData.append('coverImage', coverImage);
            const response = await axiosInstance.post(
                "/user/cover-image",
                coverImage,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}` // Include the accessToken in Authorization header
                    }
                }
            );
            toast.success(response.data?.message);
            return response.data.data;
        } catch (error) {
            toast.error("Some Error Occured , try again..");
            throw error;
        }
    }
);

export const updateUserDetails = createAsyncThunk(
    "updateUserDetails",
    async (data) => {
        try {
            const response = await axiosInstance.patch(
                "/user/update-account",
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                }
            );
            toast.success("Updated details successfully!!!");
            return response.data;
        } catch (error) {
            toast.error("Some Error Occured , try again..");
            throw error;
        }
    }
);

export const getUserNotifications = createAsyncThunk("getUserNotifications", async () => {
    try {
        const response = await axiosInstance.get('/user/notifications', {
            headers: {
                'Authorization': localStorage.getItem('accessToken')
            }
        });
        return response.data?.data;

    } catch (error) {
        console.log("ERROR! fetching the notifications.")
    }
})

export const deleteNotification = createAsyncThunk("deleteNotification", async (notificationId) => {
    try {
        const response = await axiosInstance.delete(`/user/notification/${notificationId}`, {
            headers: {
                'Authorization': localStorage.getItem('accessToken')
            }
        })
        return response.data.data;
    } catch (error) {
        console.log("ERROR! notification not deleted.")
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setSignupData(state, action) {
            state.signupData = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createAccount.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createAccount.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(createAccount.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(userLogin.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(userLogin.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.loading = false;
            state.status = true;
            state.userData = action.payload;
        });
        builder.addCase(sendOtp.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(sendOtp.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(sendOtp.rejected, (state) => {
            state.loading = false;
        })
        builder.addCase(userLogout.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(userLogout.fulfilled, (state) => {
            state.loading = false;
            state.status = false;
            state.userData = null;
        });
        builder.addCase(getCurrentUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getCurrentUser.fulfilled, (state, action) => {
            state.loading = false;
            state.status = true;
            state.userData = action.payload;
        });
        builder.addCase(getCurrentUser.rejected, (state) => {
            state.loading = false;
            state.status = false;
            state.userData = null;
        });
        builder.addCase(updateAvatar.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateAvatar.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
        });
        builder.addCase(updateAvatar.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(updateCoverImg.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateCoverImg.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
        });
        builder.addCase(updateCoverImg.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(updateUserDetails.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateUserDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
        });
        builder.addCase(getUserNotifications.pending, (state) => {
            state.notificationsLoading = true;
        })
        builder.addCase(getUserNotifications.fulfilled, (state, action) => {
            state.notificationsLoading = false;
            state.notifications = action.payload;
        })
        builder.addCase(getUserNotifications.rejected, (state) => {
            state.notificationsLoading = false;
        })

        builder.addCase(deleteNotification.fulfilled, (state, action) => {
            state.notifications = state.notifications.filter((notification) => (notification._id !== action.payload._id));
        })
    },
});

export const { setSignupData } = authSlice.actions;

export default authSlice.reducer;

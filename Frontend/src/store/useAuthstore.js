import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
export const useAuthstore = create((set) => ({
  authUser: null,
  isLoggingin: false,
  isUpdatatingProfile: false,
  isSigninup: false,
  ischeckingAuth: true,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("error in the check auth", error);
      set({ authUser: null });
    } finally {
      set({ ischeckingAuth: false });
    }
  },
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },
  logout:async()=>{
      try {
              await axiosInstance.post("/auth/logout");
          set({authUser:null})
          toast.success("loggout out ")
      } catch (error) {
          toast.error(error.response.data.message)
      }
        },
  login:async(data) =>{
      set({ isLoggingin: true });
        try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Account login successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingin: false });
    }
},
updateProfile:async(data)=>{
        set({ isUpdatatingProfile: true });
        try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("update profile successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatatingProfile: false });
    }
}













      }));

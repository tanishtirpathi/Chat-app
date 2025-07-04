import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useChatstore = create((set, get ) => ({
  message: [],
  users: [],
  selectedUser: null,
  isUserloading: false,
  isMessageloading: true,
  onlineUsers:[],

getUsers: async () => {
  set({ isUserloading: true });
  try {
    const res = await axiosInstance.get("/message/users");
    set({ users: res.data.filterUser }); // ✅ Fix is here
  } catch (error) {
    console.log(error.response?.data?.message);
    toast.error(error.response?.data?.message || "Failed to fetch users");
  } finally {
    set({ isUserloading: false });
  }
},
  getMessage: async (userId) => {
    set({ isMessageloading: true });
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      set({ message: res.data });
    } catch (error) {
      console.log(error.response.data.message);
    } finally {
      set({ isMessageloading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, message } = get();
    try {
      const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData); // 
      set({ message: [...message, res.data] }); 
    } catch (error) {
      console.error("Message sending failed:", error);
    }
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));

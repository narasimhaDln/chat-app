import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSendingMessage: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    if (!selectedUser) return;
    
    set({ isSendingMessage: true });
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
      
      // Also emit through socket for real-time communication
      const socket = useAuthStore.getState().socket;
      if (socket?.connected) {
        socket.emit("sendMessage", {
          ...res.data,
          receiverId: selectedUser._id
        });
      }
      
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
      return null;
    } finally {
      set({ isSendingMessage: false });
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    if (!socket) {
      console.error("Socket not connected");
      return;
    }

    // Unsubscribe first to avoid duplicate listeners
    get().unsubscribeFromMessages();

    socket.on("newMessage", (newMessage) => {
      // Only add messages from the currently selected user
      const isMessageFromSelectedUser = newMessage.senderId === selectedUser._id;
      if (!isMessageFromSelectedUser) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });

    // Subscribe to general message updates
    socket.on("messageUpdate", (data) => {
      const { selectedUser } = get();
      if (!selectedUser) return;
      
      // Check if this update is relevant to current chat
      if (
        (data.senderId === selectedUser._id && data.receiverId === useAuthStore.getState().authUser?._id) ||
        (data.receiverId === selectedUser._id && data.senderId === useAuthStore.getState().authUser?._id)
      ) {
        set({
          messages: [...get().messages, data.message],
        });
      }
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (socket) {
      socket.off("newMessage");
      socket.off("messageUpdate");
    }
  },

  setSelectedUser: (selectedUser) => {
    set({ selectedUser });
    if (selectedUser) {
      get().getMessages(selectedUser._id);
      get().subscribeToMessages();
    } else {
      get().unsubscribeFromMessages();
    }
  },
}));

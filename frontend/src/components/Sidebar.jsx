import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, LogOut } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { authUser, onlineUsers, logout } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  // Filter out the current logged-in user from the contacts list
  const filteredContacts = users.filter((user) => user._id !== authUser?._id);

  // Apply online filter if enabled
  const displayedUsers = showOnlineOnly
    ? filteredContacts.filter((user) => onlineUsers.includes(user._id))
    : filteredContacts;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      {/* Current User Profile Section */}
      <div className="border-b border-base-300 w-full p-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={authUser?.profilePic || "/avatar.png"}
              alt="Your profile"
              className="size-10 object-cover rounded-full border border-base-300"
            />
            <span className="absolute bottom-0 right-0 size-2.5 bg-green-500 rounded-full ring-2 ring-zinc-900" />
          </div>
          <div className="hidden lg:block overflow-hidden flex-1">
            <div className="font-medium truncate">{authUser?.fullName}</div>
            <div className="text-xs text-zinc-400">You • Online</div>
          </div>
          <button 
            onClick={logout}
            className="btn btn-ghost btn-sm btn-square hidden lg:flex"
            title="Logout"
          >
            <LogOut className="size-4 text-zinc-400" />
          </button>
        </div>
      </div>

      {/* Contacts Section */}
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        {/* TODO: Online filter toggle */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">
            ({onlineUsers.filter(id => id !== authUser?._id).length} online)
          </span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {displayedUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {displayedUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">
            {showOnlineOnly ? "No online contacts" : "No contacts found"}
          </div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;

import React from "react";
import  useAuthStore  from "../store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

export default function Navbar() {
  const { logout, authUser } = useAuthStore();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-lg shadow-md border-b border-gray-200">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left Side: Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 hover:opacity-80 transition"
        >
          <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-xl font-semibold text-gray-800">Chatty</h1>
        </Link>

        {/* Right Side: Buttons */}
        <div className="flex items-center gap-4">
          {/* Settings */}
          <Link
            to="/settings"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition text-gray-700"
          >
            <Settings className="w-5 h-5" />
            <span className="hidden sm:inline text-sm">Settings</span>
          </Link>

          {authUser && (
            <>
              {/* Profile */}
              <Link
                to="/profile"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition text-blue-700"
              >
                <User className="w-5 h-5" />
                <span className="hidden sm:inline text-sm">Profile</span>
              </Link>

              {/* Logout */}
              <button
                onClick={logoutHandler}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 hover:bg-red-200 transition text-red-700"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline text-sm">Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
// import React from "react";
// import { useAuthStore } from "../store/useAuthStore.js";
// import { Link, useNavigate } from "react-router-dom";
// import { LogOut, MessageSquare, Settings, User } from "lucide-react";

// export default function Navbar() {
//   const { logout, authUser } = useAuthStore();
//   const navigate = useNavigate(); // Use navigate for redirection

//   const logoutHandler = async () => {
//     try {
//       await logout();
//       navigate("/login", { replace: true }); //  Redirect to login after logout
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };
//   return (
//     <header
//       className=" border-b border-base-300 fixed w-full top-0 z-40
//     backdrop-blur-lg bg-base-100/80"
//     >
//       <div className="container mx-auto px-4 h-16">
//         <div className="flex items-center justify-between h-full">
//           <div className="flex items-center gap-8">
//             <Link
//               to="/"
//               className="flex items-center gap-2.5 hover:opacity-80 transition-all"
//             >
//               <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
//                 <MessageSquare className="w-5 h-5 text-primary" />
//               </div>
//               <h1 className="text-lg font-bold">Chatty</h1>
//             </Link>
//           </div>

//           <div className="flex items-center gap-2">
//             <Link
//               to={"/settings"}
//               className={`
//               btn btn-sm gap-2 transition-colors

//               `}
//             >
//               <Settings className="w-4 h-4 " />
//               <span className="hidden sm:inline">Settings</span>
//             </Link>

//             {authUser && (
//               <>
//                 <Link to={"/profile"} className={`btn btn-sm gap-2`}>
//                   <User className="size-5" />
//                   <span className="hidden sm:inline">Profile</span>
//                 </Link>

//                 <button
//                   className="flex gap-2 items-center  transition text-red-700"
//                   onClick={logoutHandler}
//                 >
//                   <LogOut className="size-5" />
//                   <span className="hidden sm:inline">Logout</span>
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

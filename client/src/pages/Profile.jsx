/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center font-semibold p-3 mt-7 text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <img
          src={currentUser.avatar}
          alt="profile"
          className="rounded-full w-36 h-36 p-3 cursor-pointer self-center object-cover mt-2"
        />
        <input
          type="text"
          className="rounded-lg border p-3"
          placeholder="username"
          id="username"
        />
        <input
          type="email"
          className="rounded-lg border p-3"
          placeholder="email"
          id="email"
        />
        <input
          type="password"
          className="rounded-lg border p-3"
          placeholder="password"
          id="password"
        />
        <button className="bg-slate-700 text-slate-50 rounded-lg p-3 font-semibold text-lg uppercase hover:opacity-95 disabled:opacity-80">
          update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}

export default Profile;

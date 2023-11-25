/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className="p-3 max-w-lg mx-auto ">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          id="username"
          className="border p-3 rounded-xl"
        />
        <input
          type="text"
          placeholder="email"
          id="email"
          className="border p-3 rounded-xl"
        />
        <input
          type="text"
          placeholder="password"
          id="password"
          className="border p-3 rounded-xl"
        />
        <button className="bg-slate-700 text-white p-3 rounded-xl uppercase hover:opacity-95 disabled:opacity-80">
          Sign Up
        </button>
      </form>
      <div className="flex gap-2 mt-5 justify-center">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign In</span>
        </Link>
      </div>
    </div>
  );
}

export default SignUp;

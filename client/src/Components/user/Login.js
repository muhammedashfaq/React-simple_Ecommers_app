import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { RouteObjects } from "../../Routes/RouteObjests";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    email: "",
    password: "",
  });

  const handlechange = (event) => {
    const { name, value } = event.target;
    setFormData((pre) => ({
      ...pre,
      [name]: value,
    }));

    setErrorMessage((pre) => ({
      ...pre,
      [name]: "",
    }));
  };

  const loginsubmit = async (e) => {
    try {
      e.preventDefault();

      const errors = {};
      if (!formData.email) {
        errors.email = "Enter email";
      }
      if (!formData.password) {
        errors.password = "Enter Password";
      }
      if (!Object.values(errors).every((value) => value === "")) {
        setErrorMessage(errors);
        return;
      } else {
        const response = await axios.post(
          "http://localhost:5000/user/login",
          formData
        );

        if (response.data.success) {
          toast.success(response.data.message);
          localStorage.setItem("token", response.data.data);
          navigate(RouteObjects.Home);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-stone-400 via-zinc-200 to-teal-300">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gradient-to-t from-orange-400 to-sky-400 dark:text-gray-100">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign in</h1>
        </div>
        <form onSubmit={loginsubmit} className="space-y-12">
          <div className="space-y-4">
            <div>
              <label for="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                onChange={handlechange}
                type="text"
                name="email"
                id="email"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              />
              {errorMessage.email && (
                <p className="text-red-500 text-md">{errorMessage.email}</p>
              )}
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label for="password" className="text-sm">
                  Password
                </label>
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="text-xs hover:underline dark:text-gray-400"
                >
                  Forgot password?
                </a>
              </div>
              <input
                onChange={handlechange}
                type="password"
                name="password"
                id="password"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              />
              {errorMessage.password && (
                <p className="text-red-500 text-md">{errorMessage.password}</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-evenly">
              <button
                type="submit"
                className="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900"
              >
                Sign in
              </button>

              <button
                type="submit"
                className="w-full px-8 py-3  ml-2 font-semibold rounded-md bg-slate-300 "
              >
                <FcGoogle className="w-20 h-8" />
              </button>
            </div>
            <p className="px-6 text-sm text-center dark:text-gray-400">
              Don't have an account yet?
              <a
                rel="noopener noreferrer"
                href={RouteObjects.Register}
                className="hover:underline dark:text-violet-400"
              >
                Sign up
              </a>
              .
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

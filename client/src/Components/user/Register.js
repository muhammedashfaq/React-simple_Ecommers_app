import axios from "axios";
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast";
import { useState } from "react";
import { RouteObjects } from "../../Routes/RouteObjests";
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    name: "",
    email: "",
    password: "",
    
  });
  const handlechangeinput = (event) => {
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

  const register = async (e) => {
    try {
      e.preventDefault();
      const error = {};

      if (!formData.name) {
        error.name = "please enter a name";
      }

      if (!formData.email) {
        error.email = "please enter a email";
      }

      if (!formData.password) {
        error.password = "please enter password";
      }

      if (!Object.values(error).every((value) => value === "")) {
        setErrorMessage(error);
        return;
      } else {
        const response = await axios.post(
          "http://localhost:5000/user/register",
          formData
        );

        if (response.data.success) {
          toast.success(response.data.message);
          navigate('/');
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return  <div className="w-screen h-screen flex justify-center items-center bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-stone-400 via-zinc-200 to-teal-300">
  <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gradient-to-t from-orange-400 to-sky-400 dark:text-gray-100">
    <div className="mb-8 text-center">
      <h1 className="my-3 text-4xl font-bold">Register</h1>
    </div>
    <form onSubmit={register} className="space-y-12">
      <div className="space-y-4">
        <div>
          <label  className="block mb-2 text-sm">
            Name
          </label>
          <input
            onChange={handlechangeinput}
            type="text"
            name="name"
            id="email"
            className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          />
          {errorMessage.name && (
            <p className="text-red-500 text-md">{errorMessage.name}</p>
          )}
        </div>
        <div>
          <label  className="block mb-2 text-sm">
            Email ID
          </label>
          <input
            onChange={handlechangeinput}
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
            <label  className="text-sm">
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
            onChange={handlechangeinput}
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
        <div>
          <button
            type="submit"
            className="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900"
          >
            Register
          </button>
        </div>
        <p className="px-6 text-sm text-center dark:text-gray-400">
          already have accout?
          <a
            rel="noopener noreferrer"
            href={RouteObjects.Login}
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
};

export default Register;

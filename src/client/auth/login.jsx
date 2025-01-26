import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

function Login() {
  const INITIAL_LOGIN_OBJ = {
    password: "",
    emailId: "",
  };

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);

  const submitForm = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (loginObj.emailId.trim() === "")
      return setErrorMessage("Email Id is required! (use any value)");
    if (loginObj.password.trim() === "")
      return setErrorMessage("Password is required! (use any value)");

    try {
      setLoading(true);
      const response = await axios.post("auth/login", {
        email: loginObj.emailId,
        password: loginObj.password,
      });

      const token = response.data.data?.token;
      const expiredToken = response.data.data?.expires_in;

      if (token) {
        localStorage.setItem("expired_token", expiredToken);
        localStorage.setItem("token", token);
        toast.success("Selamat datang kembali! Anda sudah login.");
        window.location.href = "/peserta";
      } else {
        setErrorMessage("Invalid credentials. Please try again.");
        toast.error("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An error occurred. Please try again.");
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const updateFormValue = (e) => {
    setErrorMessage("");
    const { name, value } = e.target;
    setLoginObj({ ...loginObj, [name]: value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={submitForm} className="space-y-4">
          <div>
            <label
              htmlFor="emailId"
              className="block text-sm font-medium text-gray-700"
            >
              Email 
            </label>
            <input
              id="emailId"
              name="emailId"
              type="email"
              value={loginObj.emailId}
              onChange={updateFormValue}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={loginObj.password}
              onChange={updateFormValue}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
            />
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-indigo-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-4 text-white font-semibold rounded-md ${
              loading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600"
            }`}
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

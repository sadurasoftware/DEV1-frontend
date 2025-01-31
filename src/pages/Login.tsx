import { useEffect, useState } from "react";
import { LoginUser } from "@/types/loginType";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "@/hooks/useLoginMutation";
import { loginschema } from "@/validation/validator";
import { z } from "zod";
import {useLoginInfoStore} from "../store/useLoginInfoStore"

export const Login = () => {


    // Get from store
  const setLoginInfo = useLoginInfoStore((state) => state.setLoginInfo)

    const [user, setUser] = useState<LoginUser>({ email: "", password: "" });
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");

    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));

        setError("");

    };

    // Mutation
    const { mutate, isPending, isError, isSuccess, error: mutationError, data } = useLoginMutation();


    useEffect(() => {
        if (isSuccess && data) {
            setSuccess(data.user.username);
            //sending store data
            setLoginInfo(data?.token, data?.user)
            setError("")
            setUser({ email: "", password: "" })
            if(data?.user?.roleId === 1)
            {
                navigate("/super-admin")   
            }
            else if(data?.user?.roleId === 2)
            {
                navigate("/admindashboard")
            }
            else
            {
                navigate("/userdashboard")

            }
        }

        if (isError && mutationError) {
            setError(mutationError.response?.data.message || "An unexpected error occurred.");
            setSuccess("")
        }
    }, [isSuccess, isError, data, mutationError]);


    // Handle login action
    const handleLogin = () => {
        try {

            loginschema.parse(user);

            mutate(user);
          
        } catch (err) {
            if (err instanceof z.ZodError) {
                // If validation fails, show the first error message
                setError(err.errors[0]?.message || "Invalid input");
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
                <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>

                <div className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                            value={user.email}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                            value={user.password}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <button
                    onClick={handleLogin}
                    className="w-full mt-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
                >
                    {isPending ? "Logging in..." : "Login"}

                </button>


                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                {success && <p className="text-green-500 mt-4 text-center">{success}

                </p>}



                <Link
                    to="/register"
                    className="mt-5"
                >
                    Sign up? Register here
                </Link>
                {/* {data?.username && <h3>Welcome back!!... {data.username}</h3>} */}

                <button
                onClick={() => navigate("/forget-password")}
                className="w-full mt-4 py-3 bg-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-400 transition"
                >
                Forgot Password
                </button>
            </div>
        </div>
    )
}


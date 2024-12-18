import Image from "next/image";

export default function SignUp() {
    return (
        <div className="flex bg-red-500 min-h-screen overflow-hidden justify-center">
            <div className="shadow-lg w-full max-w-md">
                {/* Header */}
                <div className=" text-white text-center py-12">
                    <div className="flex items-center justify-center">
                        <Image
                            src="/Irent.png"
                            alt="Logo"
                            width={170}
                            height={100}
                            className="items-center justify-center"
                        />
                    </div>
                </div>

                {/* Form */}
                <div className="p-8 rounded-t-[38px] bg-white h-full">
                    <h2 className="text-3xl font-Poppins font-bold  text-center mb-8 text-black">
                        Create New <br></br>Account
                    </h2>
                    <form className="flex flex-col gap-6 font-poppins">
                        <div>
                            <label className="block text-xl font-medium text-gray-700">
                                Full Name
                            </label>
                            <input
                                type="text"
                                placeholder="Your Full Name"
                                className="mt-1 block w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="mt-1 block w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                placeholder="Your Phone Number"
                                className="mt-1 block w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="Enter Password"
                                className="mt-1 block w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition duration-200 mt-4"
                        >
                            Sign Up
                        </button>
                    </form>
                    <p className="mt-4 text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <a href="/login" className="text-red-500 font-semibold hover:underline">
                            Log in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

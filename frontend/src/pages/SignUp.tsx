import { Link } from "react-router-dom";
import GenderCheckbox from "../components/GenderCheckbox";
import { useState } from "react";
import useSignup from "./useSignup";

const SignUp = () => {
	const [inputs, setInputs] = useState({
		fullName: "",
		username: "",
		password: "",
		confirmPassword: "",
		gender: "",
	});
	const { loading, signup } = useSignup();

	const handleCheckboxChange = (gender: "male" | "female") => {
		setInputs({ ...inputs, gender });
	};

	const handleSubmitForm = (e: React.FormEvent) => {
		e.preventDefault();
		signup(inputs);
	};

	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-900 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20'>
				<h1 className='text-3xl font-semibold text-center text-white'>
					Sign Up <span className='text-gray-700'></span>
				</h1>

				<form onSubmit={handleSubmitForm}>
					<div>
						<label className='label p-2'>
							<span className='text-base label-text text-white'>Full Name</span>
						</label>
						<input
							type='text'
							placeholder='Full Name'
							className='w-full input input-bordered h-10 bg-black bg-opacity-50 text-white placeholder-gray-300'
							value={inputs.fullName}
							onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
						/>
					</div>

					<div>
						<label className='label p-2 '>
							<span className='text-base label-text text-white'>Username</span>
						</label>
						<input
							type='text'
							placeholder='johndoe'
							className='w-full input input-bordered h-10 bg-black bg-opacity-50 text-white placeholder-gray-300'
							value={inputs.username}
							onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text text-white'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10 bg-black bg-opacity-50 text-white placeholder-gray-300'
							value={inputs.password}
							onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text text-white'>Confirm Password</span>
						</label>
						<input
							type='password'
							placeholder='Confirm Password'
							className='w-full input input-bordered h-10 bg-black bg-opacity-50 text-white placeholder-gray-300'
							value={inputs.confirmPassword}
							onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
						/>
					</div>

					<GenderCheckbox selectedGender={inputs.gender} onCheckboxChange={handleCheckboxChange} />

					<Link
						to={"/login"}
						className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-white'
					>
						Already have an account?
					</Link>

					<div>
						<button className='w-full py-2 mt-4 text-white bg-black bg-opacity-50 hover:bg-opacity-75 rounded-md border border-transparent' disabled={loading}>
							{loading ? "Loading..." : "Sign Up"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default SignUp;
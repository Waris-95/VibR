import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const Login = () => {
	const [inputs, setInputs] = useState({
		username: "",
		password: "",
	});

	const { loading, login } = useLogin();

	const handleSubmitForm = (e: React.FormEvent) => {
		e.preventDefault();
		login(inputs.username, inputs.password);
	};

	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-200 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-white'>
					Login
					<span className='text-blue-500'></span>
				</h1>

				<form onSubmit={handleSubmitForm}>
					<div>
						<label className='label p-2 '>
							<span className='text-base label-text text-white'>Username</span>
						</label>
						<input
							type='text'
							placeholder='Enter username'
							className='w-full input input-bordered h-10 bg-black bg-opacity-50 text-white'
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
							className='w-full input input-bordered h-10 bg-black bg-opacity-50 text-white'
							value={inputs.password}
							onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
						/>
					</div>
					<Link
						to='/signup'
						className='text-sm hover:underline text-white hover:text-blue-600 mt-2 inline-block'
					>
						{"Don't"} have an account?
					</Link>

					<div>
						<button className='btn btn-block btn-sm mt-2' disabled={loading}>
							{loading ? "Loading..." : "Login"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default Login;
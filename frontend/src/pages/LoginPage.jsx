import React, { useState } from 'react';
import Input from '../components/Input';
import Logo from '../components/Login';

// A simple SVG for the Google 'G' icon
const GoogleIcon = (props) => (
  <svg {...props} viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.088,5.574l6.19,5.238C39.901,36.625,44,30.636,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
  </svg>
);

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="min-h-screen w-full flex font-sans">
      
      {/* Left Panel: The Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <Logo />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Welcome back</h1>
          <p className="mt-2 text-slate-600">Please enter your details</p>

          <form className="mt-8 space-y-5">
            <Input id="email" label="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input id="password" type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="remember" className="ml-2 text-slate-700">Remember for 30 days</label>
              </div>
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password</a>
            </div>

            <div className="space-y-4 pt-2">
              <button type="submit" className="w-full bg-indigo-600 text-white font-semibold py-2.5 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                Sign in
              </button>
              <button type="button" className="w-full flex items-center justify-center bg-white text-slate-700 font-semibold py-2.5 border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                <GoogleIcon className="h-6 w-6 mr-2" />
                Sign in with Google
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-slate-600">
            Don't have an account? <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Sign up</a>
          </p>
        </div>
      </div>

      {/* Right Panel: The Image */}
      <div className="hidden lg:flex w-1/2 bg-[#EDE9FE] items-center justify-center">
        {/* This is where you will add your image */}
        {/* For now, it's just a colored background. */}
        {/* Example: <img src="/path/to/your/image.svg" alt="Illustration" className="w-full h-full object-cover" /> */}
      </div>

    </div>
  );
};

export default LoginPage;
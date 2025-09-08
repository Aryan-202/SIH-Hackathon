import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { useNavigate } from 'react-router-dom';

// Main App component that serves as the sign-up page.
const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigateSignIn = useNavigate();

  const handleSignUpClick = () =>{
    navigateSignIn("/login");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    // Simulate a network request
    setTimeout(() => {
      setLoading(false);
      console.log('Sign up attempt with:');
      console.log('Name:', name);
      console.log('Email:', email);
      console.log('Password:', password);
      // Implement your sign-up logic here.
    }, 1500);
  };

  const handleSocialLogin = (provider) => {
    console.log(`${provider} login clicked. Implement social login logic here.`);
    // The user will add social login authentication here.
  };

  const googleIcon = (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.24 10.284v2.54h3.916c-.183 1.168-1.173 2.502-3.916 2.502-2.35 0-4.26-1.92-4.26-4.288s1.91-4.288 4.26-4.288c1.353 0 2.296.58 2.81 1.07l2.126-2.07c-1.325-1.22-3.13-1.972-4.936-1.972-4.14 0-7.5 3.36-7.5 7.5s3.36 7.5 7.5 7.5c4.27 0 7.23-2.914 7.23-7.258 0-.5-.045-.964-.12-1.428h-7.11z" />
    </svg>
  );

  const githubIcon = (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.6.111.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.043-1.61-4.043-1.61-.542-1.372-1.32-1.745-1.32-1.745-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.49-1 .108-.781.42-1.305.762-1.604-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.12-3.18 0 0 1.006-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.046.138 3.006.404 2.29-1.552 3.296-1.23 3.296-1.23.66 1.657.255 2.877.12 3.18.77.84 1.235 1.91 1.235 3.22 0 4.61-2.805 5.624-5.475 5.923.42.365.81 1.096.81 2.22 0 1.605-.015 2.898-.015 3.286 0 .315.21.69.825.57C20.565 21.802 24 17.302 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );

  const facebookIcon = (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.959.19-1.333 1.5-1.333h2.5v-3h-3.472c-4.045 0-5.528 2.518-5.528 5.485v1.515z" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-950 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl space-y-8">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
            Create an Account
          </h1>
          <p className="text-gray-500">
            Sign up to get started
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Input */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Confirm Password Input */}
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?
            <a
              href="#"
              className="ml-1 font-medium text-indigo-600 hover:text-indigo-500"
              onClick={handleSignUpClick}
            >
              Sign In
            </a>
          </p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">
              Or sign up with
            </span>
          </div>
        </div>

        {/* Social Login Buttons as Circular Icons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => handleSocialLogin('Google')}
            className="w-12 h-12 rounded-full flex items-center justify-center text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
          >
            {googleIcon}
          </button>
          <button
            onClick={() => handleSocialLogin('GitHub')}
            className="w-12 h-12 rounded-full flex items-center justify-center text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
          >
            {githubIcon}
          </button>
          <button
            onClick={() => handleSocialLogin('Facebook')}
            className="w-12 h-12 rounded-full flex items-center justify-center text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
          >
            {facebookIcon}
          </button>
        </div>
      </div>
    </div>
  );
};

// The root for rendering the app, needed for a single-file runnable example.
const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}

export default App;

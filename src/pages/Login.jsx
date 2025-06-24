import React from 'react';
import { Login as LoginComponent } from '../components';

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-yellow-50 via-orange-100 to-red-100 dark:from-gray-900 dark:via-gray-800 dark:to-black transition-colors duration-300">
      <LoginComponent />
    </div>
  );
}

export default Login;

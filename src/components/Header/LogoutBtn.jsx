import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';
import { LogOut } from 'lucide-react';
import { Loader2 } from 'lucide-react'; // Spinner icon from Lucide

function LogoutBtn() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const logoutHandler = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log me out!',
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        authService.logout().then(() => {
          dispatch(logout());
          Swal.fire('Logged Out!', 'You have been logged out successfully.', 'success');
          setTimeout(() => {
            setLoading(false);
            window.location.href = '/';
          }, 1500);
        });
      }
    });
  };

  return (
    <button
      className={`flex justify-center items-center gap-2 px-6 py-2 duration-200 rounded-full w-full font-semibold md:text-lg ${
        loading ? 'cursor-not-allowed opacity-70' : ''
      }`}
      onClick={logoutHandler}
      disabled={loading}
    >
      {loading ? (
        <>
          <Loader2 className="animate-spin" size={20} />
          <span>Logging out...</span>
        </>
      ) : (
        <>
          <span>Logout</span>
          <LogOut size={20} />
        </>
      )}
    </button>
  );
}

export default LogoutBtn;

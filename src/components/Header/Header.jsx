import React from "react";
import { Container, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);

  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 shadow bg-gradient-to-r from-yellow-100 via-orange-100 to-red-100 transition duration-300 animate-slide-down">
      <Container>
        <nav className="flex items-center">
          <div className="mr-4 animate-fade-in">
            <Link to="/">
              <div>
                <img
                  src="src/assets/logo1.jpg"
                  alt="Logo"
                  className="w-[120px] h-auto object-contain transition-transform duration-500 hover:scale-110"
                />
              </div>
            </Link>
          </div>

          <ul className="flex ml-auto space-x-4">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name} className="animate-fade-in-delayed">
                  <button
                    className="inline-block px-6 py-2 text-orange-600 font-semibold bg-yellow-100 hover:bg-orange-200 rounded-full shadow-md transition-transform duration-300 hover:scale-105"
                    onClick={() => navigate(item.slug)}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li className="animate-fade-in-delayed">
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;

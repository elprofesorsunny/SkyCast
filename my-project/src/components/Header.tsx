import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="flex bg-transparent justify-center sticky top-0">
      <nav className="absolute flex m-6 py-3 px-4 bg-[#e9ecef] rounded-xl shadow-lg">
        <ul className="flex gap-8 items-center">
          {/* Home Icon */}
          <li>
            <Link to="/">
              <img src="../assets/icons/home-icon.svg" className="w-[28px] h-[28px]" alt="Home" />
            </Link>
          </li>

          {/* About Icon */}
          <li>
            <Link to="/about">
              <img src="../assets/icons/news-icon.svg" className="w-[28px] h-[28px]" alt="About" />
            </Link>
          </li>

          {/* Cities Icon */}
          <li>
            <Link to="/cities">
              <img src="../assets/icons/cities-icon.svg" className="w-[28px] h-[28px]" alt="Cities" />
            </Link>
          </li>
        </ul>
      </nav>
      <section className="absolute flex bg-[#e9ecef] m-6 font-semibold text-xl right-5 rounded-xl shadow-xl justify-center items-center">
        <button className="py-3 px-4 rounded-l-xl transition duration-300 hover:text-[#B60046]">
          Login
        </button>
        <span>|</span>
        <button className="py-3 px-4 rounded-r-xl transition duration-300 hover:text-[#B60046]">
          Sign Up
        </button>
      </section>
    </header>
  );
}

export default Header;
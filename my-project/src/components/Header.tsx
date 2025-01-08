/**
 * @file Header.tsx
 * @description This component renders the header of the website, including a sticky navigation menu 
 *              with icons for different sections like Home, News, and Cities. The header is styled 
 *              using Tailwind CSS for a modern design.
 * 
 * @component
 * @returns {TSX.Element} A sticky header with navigation links and icons.
 * 
 * @author elprofesorsunny
 * @version 1.0.0
 * @date 2025-01-04
 */

function Header() {
  return (
    // Header Section
    <header className="flex bg-transparent justify-center sticky top-0">
        <nav className="absolute flex m-6 py-3 px-4 bg-[#e9ecef] rounded-xl shadow-lg">
            <ul className="flex gap-8 items-center">

                {/* Home Icon */}
                <li>
                    <a href="#home">
                        <img src="../assets/icons/home-icon.svg" className="w-[28px] h-[28px]" />
                    </a>
                </li>

                {/* News Icon */}
                <li>
                    <a href="#about">
                        <img src="../assets/icons/news-icon.svg" className="w-[28px] h-[28px]" />
                    </a>
                </li>

                {/* Cities Icon */}
                <li>
                    <a href="#contact" className="">
                        <img src="../assets/icons/cities-icon.svg" className="w-[28px] h-[28px]" />
                    </a>
                </li>
            </ul>
        </nav>
        <section className="absolute flex m-6 font-semibold text-xl right-5 gap-5">
            <button className="py-3 px-4 bg-[#e9ecef] rounded-xl shadow-lg">
                Login
            </button>
            <button className="py-3 px-4 bg-[#e9ecef] rounded-xl shadow-lg">
                Sign Up
            </button>
        </section>
    </header>
  )
}

export default Header
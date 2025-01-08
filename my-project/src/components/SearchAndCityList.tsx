/**
 * @file SearchAndCityList.tsx
 * @description This component provides a search bar to look up cities and displays a list of cities 
 *              along with their weather details, including temperature, weather condition, and icons. 
 *              It utilizes Tailwind CSS for styling and supports responsive design.
 * 
 * @component
 * @returns {JSX.Element} A responsive search bar and city weather list UI.
 * 
 * @author elprofesorsunny
 * @version 1.0.0
 * @date 2025-01-07
 */

function SearchAndCityList() {
  return (
    <main className="flex flex-col bg-[#e9ecef] shadow-lg absolute right-0 bottom-10 top-28 p-5 text-black rounded-tl-2xl rounded-bl-2xl gap-8">

        {/* SEARCH Item */}
        <search>
            <form>
                <input placeholder="Search" className="bg-[#f8f9fa] rounded-2xl w-[300px] h-[35px] p-4 shadow-[inset_2px_2px_6px_rgba(0,0,0,0.2)]"/>
            </form>
        </search>

        {/* CITY LIST Item */}
        <div className="flex flex-col gap-5">
            <div className="flex bg-gradient-to-r from-[#dee2e6] from-50% to-50% to-[#f8f9fa] rounded-2xl shadow-xl w-[300px] h-[100px]">
                <div className="flex bg-[#f8f9fa] p-4 rounded-2xl items-center text-2xl font-semibold">
                    27 C
                </div>
                <div className="flex bg-[#dee2e6] p-4 items-center text-2xl font-semibold rounded-tr-2xl rounded-br-2xl">
                    Tehran
                </div>
                <img src="../assets/icons/sunnyDay-icon.svg" className="flex content-center fill-black bg-[#f8f9fa] flex-grow rounded-tr-2xl rounded-br-2xl justify-center items-center" />
            </div>
        </div>

    </main>
  )
}

export default SearchAndCityList
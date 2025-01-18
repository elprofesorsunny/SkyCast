function WeatherDetail() {
    return (

        <section className="flex flex-col gap-8">
            <div className="flex flex-row gap-8">
                {/* WIND Item */}
                <div className="flex flex-col w-[214px] h-[150px] shadow-2xl rounded-2xl">
                    <div className="flex flex-row-reverse bg-[#dee2e6] justify-center items-center gap-1 rounded-tl-2xl rounded-tr-2xl py-1">
                        <h4 className="text-sm">WIND</h4>
                        <img src="../assets/icons/wind-icon.svg" className="w-[20px] h-[20px] fill-white" />
                    </div>
                    <div className="flex justify-center items-center w-full h-full">
                        Not valid data
                    </div>
                </div>
                {/* PRECIPITATION Item */}
                <div className="flex flex-col w-[214px] h-[150px] shadow-2xl rounded-2xl">
                    <div className="flex flex-row-reverse bg-[#dee2e6] justify-center items-center gap-1 rounded-tl-2xl rounded-tr-2xl py-1">
                        <h4 className="text-sm">PRECIPITATION</h4>
                        <img src="../assets/icons/precipitation-icon.svg" className="w-[20px] h-[20px] fill-black" />
                    </div>
                    <div className="flex justify-center items-center w-full h-full">
                        Not valid data
                    </div>
                </div>
            </div>
            <div className="flex flex-row gap-8">

                {/* VISIBILITY Item */}
                <div className="flex flex-col w-[214px] h-[150px] shadow-2xl rounded-2xl">
                    <div className="flex flex-row-reverse bg-[#dee2e6] justify-center items-center gap-1 rounded-tl-2xl rounded-tr-2xl py-1">
                        <h4 className="text-sm">VISIBILITY</h4>
                        <img src="../assets/icons/visibility-icon.svg" className="w-[20px] h-[20px]" />
                    </div>
                    <div className="flex justify-center items-center w-full h-full">
                        Not valid data
                    </div>
                </div>

                {/* HUMIDITY Item */}
                <div className="flex flex-col w-[214px] h-[150px] shadow-2xl rounded-2xl">
                    <div className="flex flex-row-reverse bg-[#dee2e6] justify-center items-center gap-1 rounded-tl-2xl rounded-tr-2xl py-1">
                        <h4 className="text-sm">HUMIDITY</h4>
                        <img src="../assets/icons/humidity-icon.svg" className="w-[20px] h-[20px] fill-white" />
                    </div>
                    <div className="flex justify-center items-center w-full h-full">
                        Not valid data
                    </div>
                </div>
            </div>
        </section>

    )
}

export default WeatherDetail
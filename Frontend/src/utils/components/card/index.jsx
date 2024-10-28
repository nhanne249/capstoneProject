const Card = (value) => {
    return (
        <div className="relative group cursor-pointer overflow-hidden duration-500 w-64 h-[340px] bg-white text-teal-600 p-5 rounded-xl shadow-2xl">
            <div className="">
                <img className="group-hover:scale-110 w-full h-60 duration-500" src={value?.link} />
                <div className="absolute w-56 left-0 p-5 -bottom-8 duration-500 group-hover:-translate-y-8">
                    <div className="absolute -z-10 left-0 w-64 h-28 opacity-0 duration-500 group-hover:opacity-50 group-hover:bg-slate-100"></div>
                    <span className="text-xl font-bold overflow-auto min-h-14 h-14 flex items-center duration-500 group-hover:items-start">{value.title}</span>
                    <p className="group-hover:opacity-100 w-56 duration-500 opacity-0 group-hover:text-red-600 text-base font-medium">
                        {value?.sellingPrice?.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Card;

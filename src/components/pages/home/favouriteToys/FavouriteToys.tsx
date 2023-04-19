/* eslint-disable @next/next/no-img-element */

const FavouriteToys = () => {
    return (
        <div className="flex justify-center py-16 bg-white">
            <div className="max-w-[80rem] w-full mx-6 md:mx-10">
                <h2 className="text-4xl font-bold tracking-wide text-center text-indigo-600 ">
                    Their Favourite Toys
                </h2>
                <img
                    src="/assets/images/toys/toys.svg"
                    alt="Toys - fish, feather on a stick, ball, mouse"
                />
            </div>
        </div>
    );
};

export default FavouriteToys;

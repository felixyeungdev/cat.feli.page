import cats from "data/cats";
import React from "react";
import SimpleCatCard from "./SimpleCatCard";

const MeetTheCats = () => {
    return (
        <div className="w-full px-8 py-16 bg-gradient-to-r from-blue-600 to-purple-600">
            <h2 className="text-4xl font-bold tracking-wide text-center text-gray-50">
                Meet the Cats
            </h2>
            <div className="grid grid-cols-1 grid-rows-3 gap-8 mt-8 md:grid-rows-1 md:grid-cols-3">
                {Object.keys(cats).map(
                    (cat) =>
                        cats[cat]?.meetTheCats && (
                            <SimpleCatCard cat={cat} key={cat} />
                        )
                )}
            </div>
        </div>
    );
};

export default MeetTheCats;

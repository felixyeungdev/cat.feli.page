import CatPage from "components/pages/cat/CatPage";
import cats from "data/cats";
import React from "react";

const SesamePage = () => {
    return (
        <>
            <CatPage cat={cats.caramel} />
        </>
    );
};

export default SesamePage;

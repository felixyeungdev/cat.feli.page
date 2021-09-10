import React from "react";

const FelixYeung = (
    <a href="https://felixyeung.com/" target="_blank">
        Felix Yeung
    </a>
);

const Veronica = <span>Veronica</span>;

const Heroicons = (
    <a href="https://heroicons.com/" target="_blank">
        Heroicons
    </a>
);

const FontAwesome = (
    <a href="https://fontawesome.com/" target="_blank">
        Font Awesome
    </a>
);

const NextJS = (
    <a href="https://nextjs.org/" target="_blank">
        Next.js
    </a>
);

const Vercel = (
    <a href="https://vercel.com/" target="_blank">
        Vercel
    </a>
);

const Credits = () => {
    return (
        <>
            <div className="flex items-center justify-center bg-white">
                <div className="flex flex-col items-center max-w-[80rem] w-full mx-6 md:mx-10 my-8">
                    <article className="w-full min-h-screen prose-sm prose">
                        <h1>Credits</h1>
                        <h2>Designed, Developed and Maintained by</h2>
                        <ul>
                            <li>{FelixYeung}</li>
                        </ul>
                        <h2>Photography</h2>
                        <ul>
                            <li>{FelixYeung}</li>
                            <li>{Veronica}</li>
                        </ul>
                        <h2>Icons</h2>
                        <ul>
                            <li>{Heroicons}</li>
                            <li>{FontAwesome}</li>
                        </ul>
                        <h2>Illustrations</h2>
                        <ul>
                            <li>{FelixYeung}</li>
                        </ul>
                        <p>
                            This site is powered by {NextJS} and hosted by{" "}
                            {Vercel}
                        </p>
                    </article>
                </div>
            </div>
        </>
    );
};

export default Credits;

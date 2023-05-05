"use client";

/* eslint-disable @next/next/no-img-element */
import html2canvas from "html2canvas";
import { useRef } from "react";
import { _cats as cats } from "src/data/cats";
import collage from "src/data/collage";
import ActionButton from "~/components/common/ActionButton";

const WallpaperPage = () => {
    const wallpaperRef = useRef<HTMLDivElement>(null);

    const downloadWallpaper = async () => {
        try {
            const canvas = await html2canvas(wallpaperRef.current!);
            const image = canvas.toDataURL();
            const anchor = document.createElement("a");
            document.body.append(anchor);
            anchor.href = image;
            anchor.download = "wallpaper.png";
            anchor.click();
            anchor.remove();
        } catch (error) {
            alert("Something went wrong...");
            console.error(error);
        }
    };

    return (
        <div>
            <div className="flex justify-center">
                <div
                    ref={wallpaperRef}
                    id="wallpaper"
                    className="p-8 bg-white dark:bg-black"
                    style={{ aspectRatio: "16 / 9" }}
                >
                    <div className="flex">
                        {[cats.simba, cats.sesame, cats.shiba].map((cat) => (
                            <div key={cat.name}>
                                <div className="scale-[90%] rounded-full bg-gradient-to-r from-blue-600 to-purple-600">
                                    <img
                                        src={cat.avatar}
                                        className="w-32 h-32 scale-[90%] rounded-full"
                                        alt={`${cat.name}'s avatar`}
                                    />
                                </div>
                                <div className="text-xl font-semibold text-center text-gray-900 dark:text-gray-50">
                                    {cat.name}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 overflow-hidden rounded">
                        {collage.map(({ cats }, i) => {
                            return (
                                <div key={i} className="flex">
                                    {cats.map(({ cat, url }) => (
                                        <div
                                            key={cat}
                                            className="w-32 h-32 bg-white"
                                        >
                                            <img
                                                src={url}
                                                className="w-32 h-32"
                                                alt={`${cat}'s avatar`}
                                            />
                                        </div>
                                    ))}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="flex justify-center my-8">
                <ActionButton onClick={downloadWallpaper}>
                    Download
                </ActionButton>
            </div>
        </div>
    );
};

export default WallpaperPage;

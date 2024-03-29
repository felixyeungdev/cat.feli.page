import Image from "next/image";
import Link from "next/link";
import { FaPaw } from "react-icons/fa";
import { Cat } from "~/lib/cms/types";

interface Props {
    cat: Pick<Cat, "name" | "avatar" | "slug">;
}

const SimpleCatCard: React.FC<Props> = ({ cat }) => {
    const { name, avatar, slug } = cat;
    return (
        <div
            className="relative z-10 flex justify-around flex-grow transition-shadow bg-white shadow-xl md:mt-12 group rounded-xl md:block even:flex-row-reverse hover:shadow-2xl"
            style={{
                backgroundColor: avatar.metadata.palette.lightMuted.background,
            }}
        >
            <div className="flex items-center justify-center md:w-full md:absolute md:-top-12">
                <div className="w-32 h-32 my-6 overflow-hidden rounded-full shadow-md md:my-0">
                    <Image
                        className="w-32 h-32 transition-transform group-hover:scale-110"
                        src={avatar.url}
                        alt={`Picture of ${name}`}
                        blurDataURL={avatar.metadata.lqip}
                        placeholder="blur"
                        width={avatar.metadata.dimensions.width}
                        height={avatar.metadata.dimensions.height}
                        style={{
                            backgroundColor:
                                avatar.metadata.palette.lightMuted.background,
                        }}
                    />
                </div>
            </div>
            <div className="py-6 md:mt-20">
                <div
                    className="mb-3 text-center"
                    style={{
                        color: avatar.metadata.palette.lightVibrant.foreground,
                    }}
                >
                    <div className="font-light">Meet</div>
                    <div className="text-2xl font-semibold font-display">
                        {name}
                    </div>
                </div>
                <div className="flex justify-center md:mb-3">
                    <Link
                        href={`/about/${slug}`}
                        className="px-4 py-2 rounded-md text-gray-50 flex items-center space-x-2 hover:scale-105 active:scale-95 transition-transform group hover:shadow"
                        style={{
                            backgroundColor:
                                avatar.metadata.palette.darkVibrant.background,
                            color: avatar.metadata.palette.darkVibrant
                                .foreground,
                        }}
                    >
                        <FaPaw className="transition-transform group-hover:-rotate-6 group-active:rotate-6" />
                        <span>About</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SimpleCatCard;

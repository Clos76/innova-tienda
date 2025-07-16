import { motion } from "framer-motion"

export default function ImageTextSection({
    imageSrc,
    imageAlt = "Image",
    title1,
    text1,
    title2,
    text2,
    title3,
    text3,
    titleClassName = "", //modify if want

}) {
    return (
        // Parent container with flex layout
        // - On small screens: column layout (flex-col)
        // - On medium+ screens: row layout (md:flex-row)
        // - gap-6 adds spacing between items
        // - bg-blue-50 gives a light blue background
        // - p-4 adds padding
        // - rounded makes corners rounded
        // - shadow adds a subtle box shadow

        //animated container 
        <motion.div
            className="flex flex-col md:flex-row gap-6 px-4 sm:px-6 md:px-10 py-4 "
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >

            {/**Text section-takes equal space due to flex-1 */}
            <motion.div className="flex-1 flex items-center justify-center" initial={{ x: -50 }} animate={{ x: 0 }} transition={{ duration: 1 }}>
                <div className="text-left max-w-xl px-4">
                    <h1 className={`text-4xl font-bold p-4  rounded text-[#023047] ${titleClassName}`}>{title1}</h1>

                    {/**Acerca de  */}
                    <div className="mt-4">
                        <p className="font-semibold"> {text1}
                        </p>
                    </div>

                    <h1 className="text-4xl font-bold p-4 pt-8 rounded text-[#023047]">
                       {title2}
                    </h1>
                    <div className="mt-4">
                        <p className="font-semibold">
                            {text2}
                                </p>
                    </div>

                    <h1 className="text-4xl font-bold p-2  pt-8 rounded text-[#023047]">
                        {title3}
                    </h1>
                    <div className="mt-4">
                        <p className="font-semibold">
                            {text3}


                        </p>
                    </div>
                </div>

            </motion.div>

            <motion.div
                className="flex-1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
            >
                <img
                    src={imageSrc}
                    alt={imageAlt}
                    className="w-full h-auto max-h-[500px] md:max-h-[700px]  object-cover rounded-lg"
                    loading="lazy"
                />
            </motion.div>
        </motion.div>


    );
}
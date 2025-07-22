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
        // - px/py for responsive padding
        // - items-center for vertical alignment

        //animated container 
        <motion.div
            className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 px-4 sm:px-6 md:px-10 lg:px-16 py-6 sm:py-8 lg:py-12 items-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
        >

            {/**Text section - responsive width */}
            <motion.div 
                className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center" 
                initial={{ x: -50 }} 
                animate={{ x: 0 }} 
                transition={{ duration: 1 }}
            >
                <div className="text-left max-w-xl px-2 sm:px-4">
                    <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold p-3 sm:p-4 rounded text-[#023047] ${titleClassName}`}>
                        {title1}
                    </h1>

                    {/**Text content */}
                    <div className="mt-3 sm:mt-4">
                        <p className="text-sm sm:text-base lg:text-lg leading-relaxed"> 
                            {text1}
                        </p>
                    </div>

                    <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold p-3 sm:p-4 rounded text-[#023047] ${titleClassName}`}>
                       {title2}
                    </h1>
                    <div className="mt-3 sm:mt-4">
                        <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                            {text2}
                        </p>
                    </div>

                    <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold p-3 sm:p-4 rounded text-[#023047] ${titleClassName}`}>
                        {title3}
                    </h1>
                    <div className="mt-3 sm:mt-4">
                        <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                            {text3}
                        </p>
                    </div>
                </div>
            </motion.div>

            {/**Image section - larger on bigger screens */}
            <motion.div
                className="w-full sm:w-4/5 md:w-3/4 lg:w-1/2 xl:w-3/5"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
            >
                <div className="relative bg-gray-50 rounded-lg shadow-lg overflow-hidden">
                    <img
                        src={imageSrc}
                        alt={imageAlt}
                        className="w-full h-86 sm:h-80 md:h-120 xl:h-[700px] object-cover"
                        loading="lazy"
                    />
                </div>
            </motion.div>
        </motion.div>
    );
}
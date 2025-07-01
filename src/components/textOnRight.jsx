import Eva from '../assets/EvaVilla.jpg';
import { motion } from "framer-motion";

export default function ImageTextOnRight({

    //create variables for items to be used in function
    imageSrc, 
    imageAlt = "Image", 
    title1, 
    text1,
    title2, 
    text2,

})

{
    return (
        <motion.div
            className="flex flex-col md:flex-row gap-6 px-4 sm:px-6 md:px-10 py-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.11 }}
        >
            {/* Image Section */}
            <motion.div
                className="flex-1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
            >
                <img
                    src={imageSrc}
                    alt={imageAlt}
                    className="w-full h-auto max-h-[500px] md:max-h-[700px] object-cover rounded-lg "
                    loading="lazy"
                />
            </motion.div>

            {/* Text Section */}
            <motion.div
                className="flex-1 flex items-center justify-center"
                initial={{ x: -50 }}
                animate={{ x: 0 }}
                transition={{ duration: 1 }}
            >
                <div className="text-left w-full max-w-2xl">
                    <h1 className="text-4xl font-extrabold mb-6 text-[#222]">
                       {title1}
                    </h1>

                    <p className="text-lg font-medium mb-10 leading-relaxed">
                    {text1}
                    </p>

                    <h1 className="text-4xl font-extrabold mb-6 text-[#023047]">
                        {title2}
                    </h1>

                    <p className="text-lg font-medium leading-relaxed">
                       {text2}
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );

}
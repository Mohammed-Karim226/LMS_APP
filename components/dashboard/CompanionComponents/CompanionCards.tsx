"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

interface CompanionCardsProps {
  id: string;
  title: string;
  name: string;
  topic: string;
  duration: number;
  color: string;
  rating?: number;
  numUsers?: number;
  isMarked?: boolean;
}

const cardVariants = {
  initial: { opacity: 0, scale: 0.95, y: 20 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
  hover: {
    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
    transition: { duration: 0.3, ease: "easeInOut" as const },
  },
};

const buttonVariants = {
  hover: { scale: 1.1, rotate: 5, transition: { duration: 0.2 } },
  tap: { scale: 0.9, rotate: -5, transition: { duration: 0.2 } },
};

const CompanionCards = ({
  id,
  title,
  name,
  topic,
  duration,
  color,
  rating = 4.5,
  numUsers = 1247,
  isMarked: initialMarked = false,
}: CompanionCardsProps) => {
  const [isMarked, setIsMarked] = useState(initialMarked);

  const toggleMark = () => setIsMarked((prev) => !prev);

  const gradientBackground = `linear-gradient(135deg, ${color} 0%, color-mix(in srgb, ${color} 70%, black) 100%)`;

  return (
    <motion.article
      id={id}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      style={{
        background: gradientBackground,
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
      }}
      className={cn(
        "flex flex-col justify-between items-start gap-6 px-4 py-4 w-[410px] h-[340px] rounded-3xl overflow-hidden border border-neutral-500 max-sm:w-[340px] max-sm:h-[360px] max-sm:px-6 max-sm:py-4 relative"
      )}
    >
      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-3xl pointer-events-none" />

      <div className="flex justify-between items-center w-full z-10">
        <motion.span
          className="bg-neutral-900/90 w-24 h-8 rounded-full text-center text-white text-sm font-medium flex justify-center items-center px-3 capitalize shadow-md"
          whileHover={{ scale: 1.05, backgroundColor: "#111827" }}
        >
          {title}
        </motion.span>
        <motion.button
          onClick={toggleMark}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className="flex justify-center items-center size-8 bg-black/90 rounded-full cursor-pointer shadow-lg"
        >
          <Image
            src={
              isMarked ? "/icons/bookmark-filled.svg" : "/icons/bookmark.svg"
            }
            alt="bookmark"
            width={16}
            height={16}
            className="transition-opacity duration-300"
          />
        </motion.button>
      </div>
      <div className="flex flex-col justify-center items-start gap-3 z-10">
        <motion.h2
          className="font-bold text-2xl max-sm:font-semibold max-sm:text-xl text-neutral-900 leading-tight"
          initial={{ opacity: 0, x: -20 }}
          animate={{
            opacity: 1,
            x: 0,
            transition: { delay: 0.2, duration: 0.4 },
          }}
        >
          {name}
        </motion.h2>
        <motion.p
          className="text-lg max-sm:text-base font-normal text-neutral-900/90"
          initial={{ opacity: 0, x: -20 }}
          animate={{
            opacity: 1,
            x: 0,
            transition: { delay: 0.3, duration: 0.4 },
          }}
        >
          Topic: {topic}
        </motion.p>
        <motion.div
          className="flex justify-center items-center gap-2 max-sm:gap-1 text-neutral-900/90"
          initial={{ opacity: 0, x: -20 }}
          animate={{
            opacity: 1,
            x: 0,
            transition: { delay: 0.4, duration: 0.4 },
          }}
        >
          <Image
            src="/icons/clock.svg"
            alt="duration"
            width={16}
            height={16}
            className="max-sm:size-4"
          />
          <span className="text-base max-sm:text-sm font-medium">
            {duration} mins
          </span>
        </motion.div>
        {/* Stats Section */}
        <motion.div
          className="flex justify-between items-center w-full gap-6 text-neutral-900/80 max-sm:flex-col max-sm:gap-2 max-sm:items-start"
          initial={{ opacity: 0, x: -20 }}
          animate={{
            opacity: 1,
            x: 0,
            transition: { delay: 0.5, duration: 0.4 },
          }}
        >
          {/* Rating */}
          <div className="flex items-center gap-1">
            <motion.div
              className="flex bg-gray-900/10 backdrop-blur-sm rounded-full px-2 py-[3px] gap-0.5"
              initial="unfilled"
              animate={{
                scale: 1,
              }}
              variants={{
                unfilled: { scale: 0.9 },
                filled: { scale: 1 },
              }}
            >
              {[...Array(5)].map((_, i) => (
                <motion.svg
                  key={i}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill={i < Math.floor(rating) ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-yellow-500"
                >
                  <motion.path
                    d="M12 2L15.09 8.26L22 9L17 14.74L18.18 21.5L12 17.77L5.82 21.5L7 14.74L2 9L8.91 8.26L12 2Z"
                    animate={{
                      fillOpacity: i < rating ? 1 : 0.3,
                      scale: i < rating ? [1, 1.1, 1] : 1,
                    }}
                    transition={{
                      duration: 0.3,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: i * 0.1,
                    }}
                  />
                </motion.svg>
              ))}
            </motion.div>
            <span className="text-sm font-medium text-neutral-700">
              ({rating})
            </span>
          </div>
          {/* Users will be a dynamic part using server tech for each view that each user open it */}
          <div className="flex items-center gap-1">
            <motion.svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1H23M4 5H20M8 15H16" />
            </motion.svg>
            <span className="text-sm font-medium text-neutral-700">
              {numUsers.toLocaleString()} users
            </span>
          </div>
        </motion.div>
      </div>
      <motion.div className="w-full z-10" whileHover={{ y: -2 }}>
        <Link
          href={`/companions/${id}`}
          className="w-full block bg-black/90 cursor-pointer transition-all duration-300 rounded-full text-white text-center py-3 font-semibold text-base shadow-md hover:bg-black hover:shadow-lg"
        >
          Launch Lesson
        </Link>
      </motion.div>
    </motion.article>
  );
};

export default CompanionCards;

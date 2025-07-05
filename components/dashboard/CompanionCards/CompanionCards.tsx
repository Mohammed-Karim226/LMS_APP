import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface CompanionCardsProps {
  id: string;
  title: string;
  name: string;
  topic: string;
  duration: number;
  color: string;
  isMarked?: boolean;
}
const CompanionCards = ({
  id,
  title,
  name,
  topic,
  duration,
  color,
  isMarked,
}: CompanionCardsProps) => {
  // This should be replaced with actual logic to determine if the subject is marked
  return (
    <article
      id={id}
      style={{ backgroundColor: `#${color}` }}
      className={cn(
        "flex flex-col justify-center items-start gap-[18px] px-6 w-[410px] h-[266px] rounded-3xl border border-black max-sm:w-[340px] max-sm:h-[250px]"
      )}
    >
      <div className="flex justify-between items-center w-full">
        <span className="bg-neutral-900 w-20 h-8 rounded-4xl text-center text-white text-sm flex justify-center items-center px-1">
          {title}
        </span>
        <button className="flex justify-center items-center size-8 bg-black rounded-full cursor-pointer">
          {isMarked ? (
            <Image
              src="/icons/bookmark.svg"
              alt="marked"
              width={14}
              height={14}
            />
          ) : (
            <Image
              src="/icons/bookmark-filled.svg"
              alt="marked"
              width={14}
              height={14}
            />
          )}
        </button>
      </div>
      <div className="flex flex-col justify-center items-start gap-4">
        <h2 className="font-bold text-2xl max-sm:font-semibold max-sm:text-xl">
          {name}
        </h2>
        <p className="text-lg max-sm:text-base font-normal text-neutral-900">
          Topic: {topic}
        </p>
        <div className="flex justify-center items-center gap-2 max-sm:gap-1 text-neutral-900">
          <Image
            src="/icons/clock.svg"
            alt="marked"
            width={14}
            height={14}
            className="max-sm:size-3"
          />
          <span className="text-base max-sm:text-xs text-neutral-900">
            {duration} mins duration
          </span>
        </div>
      </div>
      <Link
        href={`/companions/${`id-12`}`}
        className="w-full bg-black cursor-pointer transition-all duration-150 rounded-xl text-white text-center py-2"
      >
        Launch Lesson
      </Link>
    </article>
  );
};

export default CompanionCards;

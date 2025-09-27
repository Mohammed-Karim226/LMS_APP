"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  // TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getSubjectColor } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { TRootState } from "@/store/redux";

const CompletedLessonsTable = () => {
  const companions = useSelector((state: TRootState) => state?.companion);
  const TopicsIcons = {
    maths: "/icons/maths.svg",
    language: "/icons/language.svg",
    science: "/icons/science.svg",
    history: "/icons/history.svg",
    coding: "/icons/coding.svg",
    economics: "/icons/economics.svg",
  };

  // Skeleton row generator
  const skeletonRows = Array.from({ length: 5 }).map((_, index) => (
    <TableRow key={index} className="animate-pulse">
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="bg-gray-300 rounded-lg w-10 h-10 max-sm:w-6 max-sm:h-6" />
          <div className="flex flex-col gap-1">
            <div className="bg-gray-300 rounded h-5 w-32 max-sm:w-20"></div>
            <div className="bg-gray-200 rounded h-4 w-24 max-sm:w-16"></div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="bg-gray-300 rounded h-6 w-20 max-sm:w-16"></div>
      </TableCell>
      <TableCell>
        <div className="bg-gray-300 rounded h-6 w-12 max-sm:w-8"></div>
      </TableCell>
    </TableRow>
  ));

  return (
    <Table className="w-full mb-6">
      <TableCaption>A list of your completed lessons.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[448px] text-[20px] font-normal text-neutral-900 max-sm:text-base">
            Lessons
          </TableHead>
          <TableHead className="text-[20px] font-normal text-neutral-900 max-sm:text-base">
            Subject
          </TableHead>
          <TableHead className="text-[20px] font-normal text-neutral-900 max-sm:text-base">
            Duration
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {companions.length === 0
          ? skeletonRows
          : companions.map((companion) => (
              <TableRow key={companion.id} className="hover:bg-neutral-100/50">
                <TableCell className="flex justify-start items-center">
                  {/* we will replace the id with the actual id for each element */}
                  <Link href={`/companions/${companion.id}`}>
                    <div className="flex justify-center items-center gap-3">
                      {/* we will hide the icon in the small screen and the subject will make a definition of it */}
                      <div
                        style={{
                          backgroundColor: `${getSubjectColor(companion.name)}`,
                        }}
                        className="size-16 rounded-lg flex justify-center items-center max-sm:size-12 max-sm:rounded-md"
                      >
                        <Image
                          src={
                            TopicsIcons[
                              companion.name.toLowerCase() as keyof typeof TopicsIcons
                            ]
                          }
                          alt={companion.name}
                          width={32}
                          height={32}
                        />
                      </div>
                      <div className="flex flex-col justify-center items-start gap-1 max-sm:gap-0">
                        <span className="text-2xl font-bold text-neutral-900 max-sm:text-lg capitalize">
                          {companion.name}
                        </span>
                        <span className="text-lg font-normal text-neutral-600 max-sm:text-base text-ellipsis capitalize">
                          Topic: {companion.topic}
                        </span>
                      </div>
                    </div>
                  </Link>
                </TableCell>
                <TableCell>
                  <span className="bg-neutral-900 w-24 h-10 max-sm:w-16 capitalize max-sm:h-6 rounded-4xl text-center text-white text-sm flex justify-center items-center px-1">
                    {companion.name}
                  </span>
                </TableCell>
                {/* we will replace the mins with an icon in the small screen */}
                <TableCell className="font-normal text-2xl max-sm:text-lg flex items-center">
                  <span className="hidden max-sm:inline-block mr-1">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="#525252"
                        strokeWidth="2"
                      />
                      <path
                        d="M12 7v5l3 3"
                        stroke="#525252"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="max-sm:hidden">{`${companion.duration} mins`}</span>
                  <span className="max-sm:inline-block">
                    {companion.duration}
                  </span>
                </TableCell>
              </TableRow>
            ))}
      </TableBody>
      {/* <TableFooter className="w-full flex justify-center items-center">Pagination</TableFooter> */}
    </Table>
  );
};

export default CompletedLessonsTable;

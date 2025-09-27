"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, getSubjectColor } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { TRootState } from "@/store/redux";
import { Clock } from "lucide-react";
import { CompanionStats } from "./CompanionStats";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = companions.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(companions.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  const skeletonRows = Array.from({ length: 5 }).map((_, i) => (
    <TableRow key={i} className="animate-pulse hover:bg-transparent">
      <TableCell>
        <div className="flex items-center gap-4">
          <div className="bg-gray-300 w-12 h-12 rounded-lg shadow-md" />
          <div className="flex flex-col gap-2">
            <div className="bg-gray-300 h-5 w-32 rounded" />
            <div className="bg-gray-200 h-4 w-24 rounded" />
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="bg-gray-300 h-6 w-20 rounded-full" />
      </TableCell>
      <TableCell>
        <div className="bg-gray-300 h-6 w-12 rounded" />
      </TableCell>
      <TableCell>
        <div className="bg-gray-300 h-6 w-16 rounded-full" />
      </TableCell>
    </TableRow>
  ));

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Table className="min-w-[800px]">
        <TableHeader className="bg-white/80 backdrop-blur-md sticky top-0 z-10 shadow-sm rounded-t-2xl">
          <TableRow>
            <TableHead className="text-lg font-semibold text-neutral-900">
              Lesson
            </TableHead>
            <TableHead className="text-lg font-semibold text-neutral-900">
              Subject
            </TableHead>
            <TableHead className="text-lg font-semibold text-neutral-900">
              Duration
            </TableHead>
            <TableHead className="text-lg font-semibold text-neutral-900">
              Stats
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companions.length === 0
            ? skeletonRows
            : currentItems.map((companion) => {
                // trial data for enhanced stats
                // const completion = Math.floor(Math.random() * 100) + 1; // example
                // const score = Math.floor(Math.random() * 100) + 1;
                // const lessonsDone = Math.floor(Math.random() * 10) + 1;

                return (
                  <TableRow
                    key={companion.id}
                    className="hover:bg-gray-50 transition-all rounded-lg cursor-pointer"
                  >
                    {/* Lesson Info */}
                    <TableCell>
                      <Link href={`/companions/${companion.id}`}>
                        <div className="flex items-center gap-4">
                          <div
                            style={{
                              backgroundColor: getSubjectColor(companion.name),
                            }}
                            className="w-12 h-12 rounded-lg flex justify-center items-center shadow-md"
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
                          <div className="flex flex-col gap-1">
                            <span className="text-lg font-bold text-neutral-900 capitalize">
                              {companion.name}
                            </span>
                            <span className="text-sm font-normal text-neutral-500 capitalize">
                              Topic: {companion.topic}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </TableCell>

                    {/* Subject Badge */}
                    <TableCell>
                      <span
                        style={{
                          background: `linear-gradient(135deg, ${getSubjectColor(
                            companion.name
                          )}33, ${getSubjectColor(companion.name)}55)`, // translucent gradient
                          boxShadow: `0 0 12px ${getSubjectColor(
                            companion.name
                          )}55, 
                  inset 0 0 8px ${getSubjectColor(companion.name)}22`,
                          backdropFilter: "blur(12px)",
                          WebkitBackdropFilter: "blur(12px)",
                        }}
                        className="relative text-black font-semibold text-sm px-4 py-1.5 rounded-full 
               capitalize tracking-wide overflow-hidden
               transition-all duration-500 
               hover:scale-105 hover:shadow-[0_0_18px_rgba(255,255,255,0.4)]
               before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent 
               before:via-white/30 before:to-transparent 
               before:translate-x-[-100%] hover:before:translate-x-[100%] 
               before:transition-transform before:duration-1000 before:rounded-full"
                      >
                        {companion.name}
                      </span>
                    </TableCell>

                    {/* Duration */}
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                        <Clock className="w-4 h-4 text-neutral-500" />
                        <span>{companion.duration} mins</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {/* pass a real data */}
                      <CompanionStats />
                    </TableCell>
                  </TableRow>
                );
              })}
        </TableBody>
      </Table>
      {companions.length > 0 && (
        <div className="flex justify-between items-center mt-6 px-2 gap-2">
          <Button
            variant="outline"
            className={cn("cursor-pointer rounded-full")}
            size="sm"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          <span className="text-sm font-medium text-neutral-600">
            Page {currentPage} of {totalPages}
          </span>

          <Button
            variant="outline"
            className={cn("cursor-pointer rounded-full")}
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default CompletedLessonsTable;

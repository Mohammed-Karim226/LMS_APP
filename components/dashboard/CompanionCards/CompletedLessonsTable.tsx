"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

const CompletedLessonsTable = () => {
  return (
    <Table className="w-full max-w-4xl">
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
        <TableRow>
          <TableCell className="flex justify-start items-center">
            {/* we will replace the id with the actual id for each element */}
            <Link href={`/companions/${`id-1`}`}>
              <div className="flex justify-center items-center gap-1">
                {/* we will hide the icon in the small screen and the subject will make a definition of it */}
                <div
                  style={{ backgroundColor: "#E5D0FF" }}
                  className="size-16 rounded-lg flex justify-center items-center max-sm:size-12 max-sm:rounded-md"
                >
                  icon
                </div>
                <div className="flex flex-col justify-center items-start gap-1 max-sm:gap-0">
                  <span className="text-2xl font-bold text-neutral-900 max-sm:text-lg">
                    Neura the Brainy Explorer
                  </span>
                  <span className="text-lg font-normal text-neutral-600 max-sm:text-base">
                    Topic: Neural Networks of the Brain
                  </span>
                </div>
              </div>
            </Link>
          </TableCell>
          <TableCell>
            {/* we will replace the title with an icon in the small screen */}
            <span className="bg-neutral-900 w-24 h-10 max-sm:w-16 max-sm:h-6 rounded-4xl text-center text-white text-sm flex justify-center items-center px-1">
              {`title`}
            </span>
          </TableCell>
          {/* we will replace the mins with an icon in the small screen */}
          <TableCell className="font-normal text-2xl max-sm:text-lg">
            {`45`} mins
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default CompletedLessonsTable;

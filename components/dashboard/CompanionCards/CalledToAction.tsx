"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
const CalledToAction = () => {
  return (
    <div className="flex max-sm:mb-2 flex-col justify-center items-center w-[410px] max-sm:w-full max-xl:w-full h-[579px] rounded-4xl bg-neutral-800 shadow-lg p-6">
      <h2 className="bg-amber-300 text-black px-2 py-1 rounded-3xl text-sm font-medium capitalize">
        Start learning your way.
      </h2>
      <h1 className="text-3xl font-bold text-white text-center mt-3 mb-4 capitalize">
        Build a Personalize Learning Companion
      </h1>
      <p className="text-base font-normal text-stone-50 mb-6 text-center capitalize">
        Create a unique learning experience tailored to your needs. Pick a name,
        subject, voice, & personality — and start learning through voice
        conversations that feel natural and fun.
      </p>
      <Image
        src="/images/cta.svg"
        alt="banner"
        width={362}
        height={232}
        className="mb-3"
      />
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="flex justify-center items-center max-xl:w-full gap-1 bg-orange-600 cursor-pointer hover:text-slate-50 text-white border-none hover:bg-orange-700 rounded-lg px-4 py-2"
          >
            <Image
              src="/icons/plus.svg"
              alt="plus icon"
              width={16}
              height={16}
            />
            Build New Companion{" "}
          </Button>
        </SheetTrigger>
        <SheetContent className="max-sm:w-full">
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </SheetDescription>
          </SheetHeader>
          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <div className="grid gap-3">
              <Label htmlFor="sheet-demo-name">Name</Label>
              <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="sheet-demo-username">Username</Label>
              <Input id="sheet-demo-username" defaultValue="@peduarte" />
            </div>
          </div>
          <SheetFooter>
            <Button type="submit">Save changes</Button>
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CalledToAction;

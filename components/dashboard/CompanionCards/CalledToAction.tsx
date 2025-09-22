"use client";
import Image from "next/image";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createCompanion } from "@/lib/companion.actions";

// import { useDispatch } from "react-redux";
// import { createCompanionThunk } from "@/features/actions/companion.actions";
// import { TAppDispatch } from "@/store/redux";

const formSchema = z.object({
  companionIcon: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.type.startsWith("image/"), {
      message: "File must be an image.",
    }),
  companionName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." }),
  subject: z.string().min(1, { message: "Subject is required." }),
  topic: z.string().min(1, { message: "Topic is required." }),
  voiceType: z.enum(["male", "female"], {
    required_error: "Voice type is required.",
  }),
  speakingStyle: z.enum(["formal", "casual"], {
    required_error: "Speaking style is required.",
  }),
  language: z.string().min(1, { message: "Language is required." }),
  duration: z.coerce
    .number()
    .min(1)
    .max(120, { message: "Max duration is 120 mins." }),
});

const CalledToAction = () => {
  // const dispatch = useDispatch<TAppDispatch>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companionIcon: undefined,
      companionName: "",
      subject: "",
      topic: "",
      voiceType: "male",
      speakingStyle: "casual",
      language: "",
      duration: 15,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const mappedValues = {
        icon: values.companionIcon,
        name: values.companionName,
        subject: values.subject,
        topic: values.topic,
        voiceType: values.voiceType,
        speakingStyle: values.speakingStyle,
        language: values.language,
        duration: values.duration,
      };
      const response = await createCompanion(mappedValues);
      if (!response.data) {
        throw new Error("User not authonticated.");
      }
      form.reset();
    } catch (error) {
      const err = error as { message: string };
      console.log("error from form: ", err);
    }
  }

  return (
    <div className="flex max-sm:mb-2 flex-col justify-center items-center w-[410px] max-sm:w-full max-xl:w-full h-[579px] rounded-4xl bg-neutral-800 shadow-lg p-6">
      <h2 className="bg-amber-300 text-black px-2 py-1 rounded-3xl text-sm font-medium capitalize">
        Start learning your way.
      </h2>
      <h1 className="text-3xl font-bold text-white text-center mt-3 mb-4 capitalize max-sm:text-xl">
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
            <SheetTitle>Build Your Companion</SheetTitle>
            <SheetDescription>
              Make changes here. Click save when you&apos;re done.
            </SheetDescription>
          </SheetHeader>

          <div className="px-4 overflow-auto">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="companionIcon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Companion icon</FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4">
                          <Label
                            htmlFor="companion-icon"
                            className="cursor-pointer inline-flex items-center justify-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-sm font-medium border rounded-md w-full"
                          >
                            📤 Upload image
                          </Label>

                          <Input
                            id="companion-icon"
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              field.onChange(e.target.files?.[0] || null)
                            }
                            className="hidden" // hide native input
                            ref={field.ref}
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Upload a representative image for your companion.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="companionName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Companion Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter companion name" {...field} />
                      </FormControl>
                      <FormDescription>
                        Choose a name that reflects your companion&apos;s
                        personality.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter subject" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is the subject your companion will help you with.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="topic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Topic</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter topic" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is the topic your companion will help you with.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="voiceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Voice Type</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a voice type" />
                          </SelectTrigger>
                          <SelectContent className="w-full">
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>
                        Choose a voice type that suits your companion&apos;s
                        personality.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="speakingStyle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Speaking Style</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a speaking style" />
                          </SelectTrigger>
                          <SelectContent className="w-full">
                            <SelectItem value="formal">Formal</SelectItem>
                            <SelectItem value="casual">Casual</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>
                        Choose a speaking style that suits your companion&apos;s
                        personality.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>language</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a language" />
                          </SelectTrigger>
                          <SelectContent className="w-full">
                            <SelectItem value="en">EN</SelectItem>
                            <SelectItem value="ar">Ar</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>
                        Choose a language style that suits your
                        companion&apos;s.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Session Duration in Minutes</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter duration"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This is the duration of the session in minutes.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <SheetFooter className="px-0">
                  <Button type="submit" className="cursor-pointer">
                    Save changes
                  </Button>
                  <SheetClose asChild>
                    <Button variant="outline">Close</Button>
                  </SheetClose>
                </SheetFooter>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CalledToAction;

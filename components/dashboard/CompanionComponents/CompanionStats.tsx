"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { CheckCircle, Star, BarChart2 } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function CompanionStats() {
  // Example stats data (replace with props or state)
  const [completion, setCompletion] = useState(0);
  const [score, setScore] = useState(0);
  const [lessonsDone, setLessonsDone] = useState(0);

  // Animate counters on mount
  useEffect(() => {
    const animateValue = (
      setter: React.Dispatch<React.SetStateAction<number>>,
      target: number,
      duration = 1000
    ) => {
      const step = (timestamp: number) => {
        const progress = Math.min((timestamp / duration) * target, target);
        setter(Math.floor(progress));
        if (progress < target) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    animateValue(setCompletion, 75, 1500);
    animateValue(setScore, 88, 2000);
    animateValue(setLessonsDone, 12, 1200);
  }, []);

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" className="cursor-pointer rounded-full">
            Stats Info
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[480px] rounded-2xl backdrop-blur-md bg-white/80 shadow-xl border border-white/40">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Companion Stats
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Dive into your companion&apos;s magical progress ✨
            </DialogDescription>
          </DialogHeader>

          {/* Stats Section */}
          <div className="grid gap-6 mt-6">
            {/* Completion */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-green-100 to-green-200 shadow-md hover:shadow-lg transition"
            >
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div className="flex-1">
                <span className="text-sm font-medium text-green-800">
                  Completion
                </span>
                <div className="relative w-full h-3 bg-green-300 rounded-full mt-2 overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: `${completion}%` }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="absolute h-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"
                  />
                </div>
              </div>
              <motion.span
                key={completion}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-sm font-bold text-green-700"
              >
                {completion}%
              </motion.span>
            </motion.div>

            {/* Score */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-yellow-100 to-yellow-200 shadow-md hover:shadow-lg transition"
            >
              <Star className="w-8 h-8 text-yellow-500" />
              <span className="text-sm font-semibold text-yellow-800">
                Score: {score}
              </span>
            </motion.div>

            {/* Lessons Done */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-blue-100 to-blue-200 shadow-md hover:shadow-lg transition"
            >
              <BarChart2 className="w-8 h-8 text-blue-500" />
              <span className="text-sm font-semibold text-blue-800">
                Lessons Completed: {lessonsDone}
              </span>
            </motion.div>
          </div>

          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow hover:opacity-90 transition cursor-pointer"
              >
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import type { ReactNode } from "react"

// Animation variants for consistent use across components
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
}

export const slideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export const slideRight = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export const scale = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
}

// Animated components
export function AnimatedCard({
  children,
  className,
  delay = 0,
}: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ delay }} className={cn(className)}>
      {children}
    </motion.div>
  )
}

export function AnimatedContainer({
  children,
  className,
  stagger = false,
}: { children: ReactNode; className?: string; stagger?: boolean }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger ? staggerContainer : fadeIn}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

export function AnimatedItem({
  children,
  className,
  index = 0,
}: { children: ReactNode; className?: string; index?: number }) {
  return (
    <motion.div variants={slideUp} custom={index} className={cn(className)}>
      {children}
    </motion.div>
  )
}

export function AnimatedValue({ value, className }: { value: string | number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className={cn(className)}
    >
      {value}
    </motion.div>
  )
}

export function AnimatedProgress({ value, className }: { value: number; className?: string }) {
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${value}%` }}
      transition={{ duration: 1, ease: "easeOut" }}
      className={cn("h-full bg-primary rounded-full", className)}
    />
  )
}

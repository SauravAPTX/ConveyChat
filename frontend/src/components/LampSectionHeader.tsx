"use client";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "./ui/lamp";
import { TextGenerateEffectDemo } from "./TextGenerateEffect";

export function LampSectionHeader() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-6 sm:mt-8 md:mt-16 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        Secure Connections, <br /> Confident Conversations
      </motion.h1>
      <div className="mt-4 sm:mt-6 md:mt-10">
        <TextGenerateEffectDemo />
      </div>
    </LampContainer>
  );
}

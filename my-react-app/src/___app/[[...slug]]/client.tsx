"use client";

import React from "react";
import dynamic, { DynamicOptions } from "next/dynamic";


const App = dynamic(import("../../App") as DynamicOptions<Record<string, never>>, { ssr: false });

// const App = dynamic(() => import('../../App').then(mod => mod.App), { ssr: false });

export function ClientOnly() {
  return <App />;
}

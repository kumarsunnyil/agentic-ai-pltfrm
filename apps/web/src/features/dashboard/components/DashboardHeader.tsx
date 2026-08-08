/**
 * ------------------------------------------------------------
 * @file: src\features\dashboard\components\DashboardHeader.tsx
 * @description: Reusable Enterprise Dashboard Container.
 * @author: Sunil.S.Kumar
 * @date: 07-08-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

"use client";

import SectionHeader from "@/ui/common/SectionHeader";

export default function DashboardHeader() {
  return (
    <SectionHeader
      title="Dashboard"
      subtitle="Welcome back, Sunil 👋  Here's what's happening across your Enterprise AI Platform today."
    />
  );
}
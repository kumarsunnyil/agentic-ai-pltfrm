/**
 * ------------------------------------------------------------
 * @file: src\features\dashboard\constants\chart.constants.ts
 * @description: Reusable Enterprise Dashboard Container.
 * @author: Sunil.S.Kumar
 * @date: 07-08-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

import { AiUsageData } from "../types/chart.types";

export const AI_USAGE_DATA: AiUsageData[] = [
    { day: "Mon", requests: 120, tokens: 1800 },
    { day: "Tue", requests: 180, tokens: 2500 },
    { day: "Wed", requests: 150, tokens: 2200 },
    { day: "Thu", requests: 260, tokens: 3600 },
    { day: "Fri", requests: 320, tokens: 4700 },
    { day: "Sat", requests: 290, tokens: 4300 },
    { day: "Sun", requests: 360, tokens: 5400 },
];
/**
 * ------------------------------------------------------------
 * @file: src\theme\dashboard.ts
 * @description: Reusable Enterprise Dashboard Container.
 * @author: Sunil.S.Kumar
 * @date: 07-08-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

export const dashboardTheme = {
  layout: {
    maxWidth: 1600,
    pagePadding: 4,
    sectionSpacing: 4,
    gridSpacing: 3,
  },

  radius: {
    sm: 2,
    md: 3,
    lg: 4,
    xl: 6,
  },

  widget: {
    padding: 3,
    minHeight: 160,
  },

  banner: {
    minHeight: 220,
    padding: 4,
  },

  shadows: {
    default: 1,
    hover: 6,
  },

  transition: {
    default: "all .25s ease",
  },

  button: {
    height: 44,
  },
};

export default dashboardTheme;
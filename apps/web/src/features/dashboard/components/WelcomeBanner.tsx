/**
 * ------------------------------------------------------------
 * @file: src/features/dashboard/components/WelcomeBanner.tsx
 * @description: Responsive Enterprise Dashboard welcome banner.
 * @author: Sunil.S.Kumar
 * @date: 08-08-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

"use client";

import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

import {
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";

export default function WelcomeBanner() {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",

        p: {
          xs: 2.5,
          sm: 3,
          md: 4,
        },

        minHeight: {
          xs: 220,
          sm: 230,
          md: 250,
        },

        display: "flex",
        alignItems: "center",

        borderRadius: {
          xs: 3,
          md: 4,
        },

        background:
          "linear-gradient(135deg, #2563eb 0%, #4f46e5 55%, #7c3aed 100%)",

        color: "common.white",
      }}
    >
      {/* ---------------------------------------------------
          Decorative Circle
          --------------------------------------------------- */}

      <Box
        sx={{
          position: "absolute",

          width: {
            xs: 140,
            md: 220,
          },

          height: {
            xs: 140,
            md: 220,
          },

          borderRadius: "50%",

          right: {
            xs: -50,
            md: -30,
          },

          top: {
            xs: -40,
            md: -70,
          },

          background:
            "radial-gradient(circle, #ffffff22, #ffffff05)",

          pointerEvents: "none",
        }}
      />

      {/* ---------------------------------------------------
          Banner Content
          --------------------------------------------------- */}

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 900,
        }}
      >
        <Stack
          direction="row"
          spacing={{
            xs: 2,
            sm: 3,
          }}
          sx={{
            width: "100%",

            flexDirection: {
              xs: "column",
              sm: "row",
            },

            alignItems: {
              xs: "flex-start",
              sm: "center",
            },
          }}
        >
          {/* -------------------------------------------------
              Icon
              ------------------------------------------------- */}

          <Box
            sx={{
              width: {
                xs: 48,
                sm: 56,
              },

              height: {
                xs: 48,
                sm: 56,
              },

              borderRadius: 3,

              display: "flex",

              alignItems: "center",

              justifyContent: "center",

              flexShrink: 0,

              backgroundColor:
                "rgba(255,255,255,0.15)",
            }}
          >
            <AutoAwesomeRoundedIcon
              sx={{
                fontSize: {
                  xs: 28,
                  sm: 34,
                },
              }}
            />
          </Box>

          {/* -------------------------------------------------
              Text Content
              ------------------------------------------------- */}

          <Box
            sx={{
              minWidth: 0,
              flex: 1,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,

                fontSize: {
                  xs: 24,
                  sm: 30,
                  md: 34,
                },

                lineHeight: 1.2,
              }}
            >
              Enterprise Command Center
            </Typography>

            <Typography
              sx={{
                mt: 1,

                color:
                  "rgba(255,255,255,0.82)",

                fontSize: {
                  xs: 13,
                  sm: 14,
                  md: 15,
                },

                lineHeight: 1.6,

                maxWidth: 700,
              }}
            >
              Monitor your AI agents, enterprise
              knowledge, workflows, and platform
              activity from one place.
            </Typography>

            {/* ---------------------------------------------
                Action Buttons
                --------------------------------------------- */}

            <Stack
              direction="row"
              spacing={1.5}
              sx={{
                mt: 2.5,

                flexDirection: {
                  xs: "column",
                  sm: "row",
                },

                width: {
                  xs: "100%",
                  sm: "auto",
                },

                "& .MuiButton-root": {
                  width: {
                    xs: "100%",
                    sm: "auto",
                  },
                },
              }}
            >
              <Button
                variant="contained"
                sx={{
                  minHeight: 42,

                  px: 2.5,

                  backgroundColor:
                    "common.white",

                  color: "primary.main",

                  "&:hover": {
                    backgroundColor:
                      "grey.100",
                  },
                }}
              >
                Open AI Workspace
              </Button>

              <Button
                variant="outlined"
                sx={{
                  minHeight: 42,

                  px: 2.5,

                  color: "common.white",

                  borderColor:
                    "rgba(255,255,255,0.45)",

                  "&:hover": {
                    borderColor:
                      "common.white",

                    backgroundColor:
                      "rgba(255,255,255,0.08)",
                  },
                }}
              >
                Explore Knowledge
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
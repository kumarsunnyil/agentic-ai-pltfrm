/**
 * ------------------------------------------------------------
 * @file: src/features/dashboard/components/WelcomeBanner.tsx
 * @description: Enterprise AI Platform dashboard welcome banner.
 * @author: Sunil.S.Kumar
 * @date: 08-08-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

"use client";

import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";

import {
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

export default function WelcomeBanner() {
  return (
    <Paper
      elevation={0}
      sx={{
        position: "relative",
        overflow: "hidden",

        width: "100%",

        minHeight: {
          xs: 420,
          sm: 390,
          md: 350,
        },

        borderRadius: {
          xs: 3,
          md: 4,
        },

        border: "1px solid",
        borderColor: "rgba(147,197,253,0.25)",

        background:
          "linear-gradient(135deg, #2563eb 0%, #3b82f6 48%, #6366f1 100%)",

        boxShadow:
          "0 18px 50px rgba(37,99,235,0.20)",

        color: "common.white",

        /*
         * Decorative background glow
         */
        "&::before": {
          content: '""',

          position: "absolute",

          width: {
            xs: 260,
            md: 420,
          },

          height: {
            xs: 260,
            md: 420,
          },

          right: {
            xs: -120,
            md: -140,
          },

          bottom: {
            xs: -150,
            md: -210,
          },

          borderRadius: "50%",

          background:
            "radial-gradient(circle, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 70%)",

          pointerEvents: "none",
        },

        /*
         * Secondary decorative glow
         */
        "&::after": {
          content: '""',

          position: "absolute",

          width: 240,
          height: 240,

          left: "38%",
          top: -170,

          borderRadius: "50%",

          background:
            "radial-gradient(circle, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 70%)",

          pointerEvents: "none",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          zIndex: 1,

          width: "100%",

          height: "100%",

          minHeight: {
            xs: 420,
            sm: 390,
            md: 350,
          },

          p: {
            xs: 2.5,
            sm: 3,
            md: 4,
          },

          display: "flex",

          alignItems: "center",
        }}
      >
        <Stack
          direction={{
            xs: "column",
            md: "row",
          }}
          spacing={{
            xs: 3,
            md: 4,
          }}
          sx={{
            width: "100%",
          }}
        >
          {/* ==================================================
              LEFT CONTENT
              ================================================== */}

          <Box
            sx={{
              flex: 1,

              minWidth: 0,

              display: "flex",

              flexDirection: "column",

              justifyContent: "center",

              alignItems: {
                xs: "flex-start",
                md: "flex-start",
              },
            }}
          >
            {/* Platform badge */}

            <Chip
              icon={
                <AutoAwesomeRoundedIcon
                  sx={{
                    fontSize: 16,
                  }}
                />
              }
              label="Enterprise AI Platform"
              size="small"
              sx={{
                mb: 2,

                height: {
                  xs: 30,
                  sm: 32,
                },

                px: 0.75,

                color: "common.white",

                backgroundColor:
                  "rgba(255,255,255,0.14)",

                border:
                  "1px solid rgba(255,255,255,0.18)",

                backdropFilter: "blur(8px)",

                "& .MuiChip-icon": {
                  color: "common.white",
                },

                "& .MuiChip-label": {
                  fontSize: {
                    xs: 11,
                    sm: 12,
                  },

                  fontWeight: 600,
                },
              }}
            />

            {/* Title */}

            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,

                fontSize: {
                  xs: 27,
                  sm: 32,
                  md: 36,
                },

                lineHeight: 1.15,

                letterSpacing: -0.5,

                maxWidth: {
                  xs: "100%",
                  md: 620,
                },
              }}
            >
              Enterprise Command Center
            </Typography>

            {/* Description */}

            <Typography
              sx={{
                mt: 1.5,

                maxWidth: {
                  xs: "100%",
                  sm: 650,
                  md: 700,
                },

                color:
                  "rgba(255,255,255,0.86)",

                fontSize: {
                  xs: 13,
                  sm: 14,
                  md: 15,
                },

                lineHeight: 1.7,
              }}
            >
              Monitor AI agents, enterprise knowledge,
              intelligent workflows, document processing,
              analytics, and real-time platform health from
              a single command center.
            </Typography>

            {/* Actions */}

            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}
              spacing={{
                xs: 1.25,
                sm: 1.5,
              }}
              sx={{
                mt: 3,

                width: {
                  xs: "100%",
                  sm: "auto",
                },
              }}
            >
              <Button
                variant="contained"
                startIcon={
                  <CloudUploadOutlinedIcon />
                }
                sx={{
                  minHeight: 42,

                  px: {
                    xs: 2,
                    sm: 2.5,
                  },

                  width: {
                    xs: "100%",
                    sm: "auto",
                  },

                  color: "primary.main",

                  backgroundColor:
                    "common.white",

                  fontWeight: 600,

                  boxShadow:
                    "0 6px 18px rgba(0,0,0,0.15)",

                  "&:hover": {
                    backgroundColor: "grey.100",

                    boxShadow:
                      "0 8px 22px rgba(0,0,0,0.20)",
                  },
                }}
              >
                Upload Document
              </Button>

              <Button
                variant="outlined"
                startIcon={
                  <SmartToyOutlinedIcon />
                }
                sx={{
                  minHeight: 42,

                  px: {
                    xs: 2,
                    sm: 2.5,
                  },

                  width: {
                    xs: "100%",
                    sm: "auto",
                  },

                  color: "common.white",

                  borderColor:
                    "rgba(255,255,255,0.50)",

                  fontWeight: 600,

                  "&:hover": {
                    borderColor:
                      "common.white",

                    backgroundColor:
                      "rgba(255,255,255,0.08)",
                  },
                }}
              >
                AI Chat
              </Button>

              <Button
                variant="outlined"
                startIcon={
                  <TimelineOutlinedIcon />
                }
                sx={{
                  minHeight: 42,

                  px: {
                    xs: 2,
                    sm: 2.5,
                  },

                  width: {
                    xs: "100%",
                    sm: "auto",
                  },

                  color: "common.white",

                  borderColor:
                    "rgba(255,255,255,0.50)",

                  fontWeight: 600,

                  "&:hover": {
                    borderColor:
                      "common.white",

                    backgroundColor:
                      "rgba(255,255,255,0.08)",
                  },
                }}
              >
                Workflow Studio
              </Button>
            </Stack>
          </Box>

          {/* ==================================================
              RIGHT PLATFORM STATUS
              ================================================== */}

          <Box
            sx={{
              width: {
                xs: "100%",
                md: 300,
                lg: 330,
              },

              flexShrink: 0,

              display: "flex",

              alignItems: "center",

              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",

                p: {
                  xs: 2,
                  sm: 2.5,
                  md: 3,
                },

                borderRadius: 3,

                border:
                  "1px solid rgba(255,255,255,0.20)",

                backgroundColor:
                  "rgba(255,255,255,0.10)",

                backdropFilter: "blur(14px)",

                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
            >
              {/* Status heading */}

              <Typography
                sx={{
                  fontSize: {
                    xs: 15,
                    sm: 16,
                  },

                  fontWeight: 700,

                  mb: 2,
                }}
              >
                AI Platform Status
              </Typography>

              {/* Status metrics */}

              <Stack
                direction="row"
                spacing={1.5}
                sx={{
                  width: "100%",
                }}
              >
                {/* Agents */}

                <Box
                  sx={{
                    flex: 1,

                    minWidth: 0,

                    p: 1.25,

                    borderRadius: 2,

                    textAlign: "center",

                    backgroundColor:
                      "rgba(255,255,255,0.07)",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: {
                        xs: 11,
                        sm: 12,
                      },

                      color:
                        "rgba(255,255,255,0.78)",
                    }}
                  >
                    AI Agents
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",

                      alignItems: "center",

                      justifyContent: "center",

                      gap: 0.75,

                      mt: 0.5,
                    }}
                  >
                    <Box
                      sx={{
                        width: 7,
                        height: 7,

                        borderRadius: "50%",

                        backgroundColor:
                          "success.main",

                        boxShadow:
                          "0 0 8px rgba(34,197,94,0.7)",
                      }}
                    />

                    <Typography
                      sx={{
                        fontWeight: 700,

                        fontSize: {
                          xs: 16,
                          sm: 18,
                        },
                      }}
                    >
                      24
                    </Typography>
                  </Box>
                </Box>

                {/* Documents */}

                <Box
                  sx={{
                    flex: 1,

                    minWidth: 0,

                    p: 1.25,

                    borderRadius: 2,

                    textAlign: "center",

                    backgroundColor:
                      "rgba(255,255,255,0.07)",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: {
                        xs: 11,
                        sm: 12,
                      },

                      color:
                        "rgba(255,255,255,0.78)",
                    }}
                  >
                    Documents
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",

                      alignItems: "center",

                      justifyContent: "center",

                      gap: 0.75,

                      mt: 0.5,
                    }}
                  >
                    <Box
                      sx={{
                        width: 7,
                        height: 7,

                        borderRadius: "50%",

                        backgroundColor:
                          "success.main",

                        boxShadow:
                          "0 0 8px rgba(34,197,94,0.7)",
                      }}
                    />

                    <Typography
                      sx={{
                        fontWeight: 700,

                        fontSize: {
                          xs: 16,
                          sm: 18,
                        },
                      }}
                    >
                      1,248
                    </Typography>
                  </Box>
                </Box>
              </Stack>

              <Stack
                direction="row"
                spacing={1.5}
                sx={{
                  width: "100%",

                  mt: 1.5,
                }}
              >
                {/* Models */}

                <Box
                  sx={{
                    flex: 1,

                    minWidth: 0,

                    p: 1.25,

                    borderRadius: 2,

                    textAlign: "center",

                    backgroundColor:
                      "rgba(255,255,255,0.07)",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: {
                        xs: 11,
                        sm: 12,
                      },

                      color:
                        "rgba(255,255,255,0.78)",
                    }}
                  >
                    Models
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",

                      alignItems: "center",

                      justifyContent: "center",

                      gap: 0.75,

                      mt: 0.5,
                    }}
                  >
                    <Box
                      sx={{
                        width: 7,
                        height: 7,

                        borderRadius: "50%",

                        backgroundColor:
                          "success.main",

                        boxShadow:
                          "0 0 8px rgba(34,197,94,0.7)",
                      }}
                    />

                    <Typography
                      sx={{
                        fontWeight: 700,

                        fontSize: {
                          xs: 16,
                          sm: 18,
                        },
                      }}
                    >
                      3
                    </Typography>
                  </Box>
                </Box>

                {/* Workflows */}

                <Box
                  sx={{
                    flex: 1,

                    minWidth: 0,

                    p: 1.25,

                    borderRadius: 2,

                    textAlign: "center",

                    backgroundColor:
                      "rgba(255,255,255,0.07)",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: {
                        xs: 11,
                        sm: 12,
                      },

                      color:
                        "rgba(255,255,255,0.78)",
                    }}
                  >
                    Workflows
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",

                      alignItems: "center",

                      justifyContent: "center",

                      gap: 0.75,

                      mt: 0.5,
                    }}
                  >
                    <Box
                      sx={{
                        width: 7,
                        height: 7,

                        borderRadius: "50%",

                        backgroundColor:
                          "success.main",

                        boxShadow:
                          "0 0 8px rgba(34,197,94,0.7)",
                      }}
                    />

                    <Typography
                      sx={{
                        fontWeight: 700,

                        fontSize: {
                          xs: 16,
                          sm: 18,
                        },
                      }}
                    >
                      16
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Stack>
      </Box>
    </Paper>
  );
}
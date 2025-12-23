import React from "react";
import { Box, Typography, Button, Container, Stack } from "@mui/material";
import Lion from "../images/home_page/lion.jpg";

const Hero = () => {
    return (
        <Box
            sx={{
                position: "relative",
                minHeight: "100vh",                 // ✅ full screen height
                backgroundImage: `url(${Lion})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",

                display: "flex",                    // ✅ flex center
                alignItems: "center",
                pt: '8rem'
                // justifyContent: "center",
            }}
        >
            {/* 🔹 GRADIENT OVERLAY */}
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "linear-gradient(to bottom, rgba(0,0,0,0.12), rgba(0,0,0,0.55))",
                }}
            />

            {/* 🔹 CONTENT */}
            <Container
                maxWidth="lg"
                sx={{
                    position: "relative",
                    zIndex: 1,
                    pb: { xs: 6, md: 10 },    // ✅ distance from bottom
                    textAlign: "left",
                }}
            >
                <Typography
                    sx={{
                        color: "#fff",
                        fontWeight: 900,
                        textTransform: "uppercase",
                        lineHeight: 1,
                        fontSize: {
                            xs: "2.5rem",
                            sm: "3.5rem",
                            md: "5rem",
                            lg: "6rem"
                        },
                        m: 0,
                        mb: 2,
                    }}
                >
                    One Ticket.
                    <br />
                    Two Visits.
                </Typography>

                <Typography
                    sx={{
                        color: "#f1f1f1",
                        maxWidth: "520px",
                        ml: 2,
                        mb: 4,
                        fontSize: {
                            xs: "14px",
                            sm: "16px",
                        },
                        textAlign: 'left'
                    }}
                >
                    Our Christmas gift to you – visit in December and you can come back
                    again for free between 5 Jan – 12 Feb 2026.
                </Typography>

                {/* 🔹 BUTTONS */}
                <Stack
                    direction="row"
                    spacing={2}
                    // justifyContent="center"           // ✅ center buttons
                    flexWrap="wrap"
                >
                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: "#f3ff00",
                            color: "#000",
                            fontWeight: 700,
                            px: 3,
                            py: 1.2,
                            borderRadius: "999px",
                            "&:hover": { bgcolor: "#e6f000" },
                        }}
                    >
                        Book Tickets
                    </Button>

                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: "#f3ff00",
                            color: "#000",
                            fontWeight: 700,
                            px: 3,
                            py: 1.2,
                            borderRadius: "999px",
                            "&:hover": { bgcolor: "#e6f000" },
                        }}
                    >
                        Explore Our Zoo
                    </Button>
                </Stack>
            </Container>
        </Box>
    );
};

export default Hero;

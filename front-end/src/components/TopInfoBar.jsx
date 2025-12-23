import React, { useState, useRef, useEffect } from "react";
import { AppBar, Box, Button, Container, Link, Toolbar, Paper, Typography } from "@mui/material";
import logo from '../icon/mainlogo.png'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Lion from '../images/home_page/lion.jpeg';
import Support from '../images/home_page/support.jpeg';
import Conservation from '../images/home_page/science-at-chester.jpeg';
import Accommodation from '../images/home_page/accommodation.jpeg';
import visit from '../images/home_page/visit.jpg'

const TopInfoBar = () => {
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const hideTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  const menuItems = [
    {
      label: "Visit",
      hoverContent: {
        leftPanel: {
          title: "Tickets, membership & experiences",
          description: "Book tickets online, explore incredible animal experiences or get unlimited entry with membership.",
          image: visit,
          link: "/bookings"
        },
        rightLinks: [
          { label: "Day tickets", href: "/bookings" },
          { label: "Membership", href: "/membership" },
          { label: "Zoo experiences", href: "/experiences" },
          { label: "Education visits", href: "/education" },
          { label: "Group visits", href: "/groups" },
          { label: "Plan your visit", href: "/plan-visit" }
        ]
      }
    },
    {
      label: " What's Here",
      hoverContent: {
        leftPanel: {
          title: "Explore our attractions",
          description: "Discover what makes WildTrails special. From animal exhibits to interactive experiences, there's something for everyone.",
          image: Lion,
          link: "/attractions"
        },
        rightLinks: [
          { label: "Animals", href: "/animals" },
          { label: "Plants & Gardens", href: "/trees" },
          { label: "Play areas & family activities", href: "/interactive" },
          { label: "Weddings & special events", href: "/facilities" },
          { label: "TV & Filming locations", href: "/dining" },
          { label: "Upcoming events", href: "/events" },
          { label: "Food, Drink & Retail", href: "/interactive" },
          { label: "Conservation Education Hub", href: "/facilities" },
          { label: "Conferences, corporate events and meetings", href: "/dining" }
        ]
      }
    },
    {
      label: "Support us",
      hoverContent: {
        leftPanel: {
          title: "Help conserve wildlife",
          description: "Your support helps us protect endangered species and their habitats. Join our conservation efforts today.",
          image: Support,
          link: "/support"
        },
        rightLinks: [
          { label: "Donate", href: "/donate" },
          { label: "Membership", href: "/membership" },
          { label: "Adopt a animal", href: "/adopt" },
          { label: "Volunteer", href: "/volunteer" },
          { label: "Shop", href: "/partnerships" },
          { label: "Fundraise", href: "/legacy" },
          { label: "Partner with us", href: "/adopt" },
          { label: "Support our appeals", href: "/volunteer" },
          { label: "Leave a gift in your will", href: "/partnerships" },
          { label: "Become a Patron", href: "/legacy" }

        ]
      }
    },
    {
      label: " Conservation, Science and Education",
      hoverContent: {
        leftPanel: {
          title: "Conservation & education",
          description: "Learn about our research programs, educational initiatives, and how we're working to protect wildlife worldwide.",
          image: Conservation,
          link: "/conservation"
        },
        rightLinks: [
          { label: "International Centre for Zoo Science", href: "/conservation" },
          { label: "International Conservation Academy", href: "/research" },
          { label: "Global Conservation Programmes", href: "/education" },
          { label: "conservation campaigns", href: "/schools" }
        ]
      }
    },
    {
      label: "Accommodation",
      hoverContent: {
        leftPanel: {
          title: "Stay with us",
          description: "Experience the magic of WildTrails with our unique accommodation options. Wake up to the sounds of nature.",
          image: Accommodation,
          link: "/accommodation"
        },
        rightLinks: [
          { label: "Explore the lodges", href: "/lodges" },
          { label: "Plan your stay", href: "/camping" },
          { label: "Dine. Drink. Relax.", href: "/packages" },
          { label: "Explore the packages", href: "/group-accommodation" },
          { label: "The difference your stay makes", href: "/vouchers" },
          { label: "Weddings, Events & Corporate stays", href: "/availability" },
          { label: "Christmas at The Reserve", href: "/vouchers" }
        ]
      }
    }
  ];

  const handleMouseEnter = (menuLabel) => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    setHoveredMenu(menuLabel);
  };

  const handleMouseLeave = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    hideTimeoutRef.current = setTimeout(() => {
      setHoveredMenu(null);
      hideTimeoutRef.current = null;
    }, 200); // small delay so user can move into the hover box
  };

  const linkStyles = {
    color: "#0f2a2a",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: 500,
    lineHeight: 1.6,
    py: 1.5,
    px: 2,                 // ⬅ needed for background space
    cursor: "pointer",

    display: "inline-flex",
    alignItems: "center",
    borderRadius: "8px",   // soft rounded hover

    transition: "color 0.2s ease, background-color 0.2s ease, text-decoration 0.2s ease",

    "&:hover": {
      color: "#0f766e",
      backgroundColor: "#e6f4ef",   // 🌿 subtle green tint
    },
  };

  return (
    <AppBar
      sx={{
        position: 'absolute',
        backgroundColor: "transparent", // ✅ invisible background
        boxShadow: "none",
        mt: '4.5rem',
        width: '100%'
      }}>
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            justifyContent: 'center'
          }}
        >
          <Box
            sx={{
              display: "flex",            // ✅ FLEX
              alignItems: "center",        // ✅ Vertical align
              gap: 2,
              backgroundColor: "#fff",
              borderRadius: "8px",
              px: 2,
              py: 1,
              position: "relative",
            }}
          >
            <Link to="/">
              <img
                src={logo}
                alt="Logo"
                style={{
                  height: "40px",
                  cursor: "pointer",
                }}
              />
            </Link>
            {
              menuItems.map((item, index) => {

                const links = item.hoverContent.rightLinks || [];
                const half = Math.ceil(links.length / 2);
                const leftLinks = links.slice(0, half);
                const rightLinks = links.slice(half);

                return (
                  <Box
                    key={index}
                    // sx={{ position: "relative" }}
                    onMouseEnter={() => item.hoverContent && handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Button
                      sx={{
                        color: "#000",
                        textTransform: "none",
                        fontSize: "14px",
                        fontWeight: 'bold',
                        borderRadius: hoveredMenu === item.label ? "8px 8px 0 0" : "8px",
                        bgcolor: hoveredMenu === item.label ? "#E5F6DF" : "transparent",
                        transition: "all 0.2s ease",
                        ":hover": {
                          backgroundColor: '#E5F6DF'
                        }
                      }}
                    >
                      {item.label}
                    </Button>

                    {/* Hover Menu */}
                    {item.hoverContent && hoveredMenu === item.label && (
                      <Paper
                        elevation={8}
                        sx={{
                          position: "absolute",
                          top: "100%",
                          left: 0,
                          mt: "5px",
                          minWidth: { xs: "300px", sm: "500px", md: "1150px" },
                          maxWidth: { xs: "90vw", md: "800px" },
                          bgcolor: "#faf9f6",
                          borderRadius: "8px",
                          overflow: "hidden",
                          zIndex: 1001,
                          display: { xs: "none", md: "flex" },
                          flexDirection: { xs: "column", md: "row" },
                          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                        }}
                        onMouseEnter={() => handleMouseEnter(item.label)}
                        onMouseLeave={handleMouseLeave}
                      >
                        {/* Left Panel */}
                        <Box
                          component="a"
                          href={item.hoverContent.leftPanel.link}
                          sx={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            gap: 3,
                            flex: { xs: "1 1 100%", md: "0 0 50%" },
                            p: { xs: 2, md: 5 },
                            textDecoration: "none",
                            color: "inherit",
                            cursor: "pointer",
                            transition: "background-color 0.2s ease",
                            "&:hover": {
                              bgcolor: "#f5f4f1",
                            },
                          }}
                        >
                          {/* Image */}
                          <Box
                            sx={{
                              width: "220px",
                              height: "220px",
                              flexShrink: 0,          // 🔥 IMPORTANT
                              borderRadius: "8px",
                              overflow: "hidden",
                              bgcolor: "#e0e0e0",
                            }}
                          >
                            <Box
                              component="img"
                              src={item.hoverContent.leftPanel.image}
                              alt={item.hoverContent.leftPanel.title}
                              sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </Box>

                          {/* Text */}
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              variant="h2"
                              sx={{
                                fontWeight: 700,
                                color: "#1a1a1a",
                                mb: 1.5,
                                fontSize: { xs: "18px", md: "22px" },
                              }}
                            >
                              {item.hoverContent.leftPanel.title}
                            </Typography>

                            <Typography
                              sx={{
                                color: "#555",
                                mb: 2,
                                fontSize: { xs: "13px", md: "14px" },
                                lineHeight: 1.6,
                              }}
                            >
                              {item.hoverContent.leftPanel.description}
                            </Typography>
                          </Box>
                        </Box>

                        {/* Right Panel - Links */}
                        <Box
                          sx={{
                            flex: { xs: "1 1 100%", md: "0 0 50%" },
                            p: { xs: 2, md: 5 },
                            display: "grid",
                            gridTemplateColumns: "2fr 2fr",
                            columnGap: 6,
                            rowGap: 1,
                            borderLeft: { xs: "none", md: "1px solid #e0e0e0" },
                            borderTop: { xs: "1px solid #e0e0e0", md: "none" },
                          }}
                        >
                          {/* LEFT COLUMN */}
                          <Box display="flex" flexDirection="column">
                            {leftLinks.map((link, index) => (
                              <Link
                                key={index}
                                href={link.href}
                                sx={linkStyles}
                              >
                                {link.label}
                              </Link>
                            ))}
                          </Box>

                          {/* RIGHT COLUMN */}
                          <Box display="flex" flexDirection="column">
                            {rightLinks.map((link, index) => (
                              <Link
                                key={index}
                                href={link.href}
                                sx={linkStyles}
                              >
                                {link.label}
                              </Link>
                            ))}
                          </Box>
                        </Box>
                      </Paper>
                    )}
                  </Box>
                );
              })
            }

            <Link
              href="#"
              underline="hover"
              fontWeight="bold"
              fontSize="1.2rem"
              color="#0f2a2a"
            >
              {'Join'}
            </Link>
            <Button
              sx={{
                backgroundColor: "#eCe75f",
                color: "#000",
                textTransform: "none",
                fontSize: "14px",
                fontWeight: "bold",
                borderRadius: "2rem",
                px: "13px",
                py: "12px",
                display: "flex",
                alignItems: "center",
                gap: "4px",

                "& .arrow": {
                  opacity: 0,
                  transform: "translateX(-4px)",
                  transition: "all 0.25s ease",
                },

                "&:hover .arrow": {
                  opacity: 1,
                  transform: "translateX(4px)",
                },
              }}
            >
              BOOK TICKETS
              <ArrowForwardIosIcon
                className="arrow"
                sx={{ fontSize: "14px" }}
              />
            </Button>

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default TopInfoBar;

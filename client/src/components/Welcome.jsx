// Importing necessary modules and components
import React from "react";
import Carousel from 'react-material-ui-carousel';
import { Typography, Box, Container, Paper, Button } from "@mui/material";

const Welcome = () => {
    // Sample images for the banner (replace with actual URLs or local images)
    const bannerImages = [
        { id: 1, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLB92CjdTD_k-mEdtXi2JlaVk1fFyDsML-rQ&s" },
        { id: 2, url: "https://d1l92n9kqjbmnl.cloudfront.net/assets/images/blog-images/reasons_why_you_banner.jpg" },
        { id: 3, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlqV_L5h978sBvL2LwcYQT4f3NhR-6sHp1Vg&s" },
    ];

    return (
        <Container maxWidth="lg" sx={{ textAlign: 'center', mt: 4 }}>
            {/* Scrolling banner */}
            <Carousel
                animation="slide"
                interval={4000}
                indicators={false}
                navButtonsAlwaysVisible
            >
                {bannerImages.map((image) => (
                    <Paper key={image.id} elevation={3}>
                        <Box
                            component="img"
                            src={image.url}
                            alt={`Banner ${image.id}`}
                            sx={{
                                width: '100%',
                                height: 'auto',
                                maxHeight: '300px',
                                objectFit: 'cover'
                            }}
                        />
                    </Paper>
                ))}
            </Carousel>

            {/* Welcome message */}
            <Box mt={4} className="welcome">
                <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Welcome to the <span style={{ color: '#1976d2' }}>Orion Employee</span> Management
                </Typography>
                <Typography variant="h6" component="p" color="textSecondary" sx={{ mb: 3 }}>
                    Efficiently manage your organization's employees, track progress, and enhance productivity.
                </Typography>

                {/* Additional details or calls to action */}
                <Box>
                    <Button variant="contained" color="primary" sx={{ mx: 1 }}  >
                        Get Started
                    </Button>
                    <Button variant="outlined" color="primary" sx={{ mx: 1 }}>
                        Learn More
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Welcome;

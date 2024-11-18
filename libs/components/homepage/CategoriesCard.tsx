import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { NextPage } from "next";

interface CategoriesCardProps {
    category: {
        name: string; 
        image: string;
    };
    onClick: () => void;
}

const CategoriesCard:NextPage<CategoriesCardProps> = ({ category, onClick }) => {
    return (
        <Stack onClick={onClick} className="category-card" style={{ cursor: 'pointer' }}>
            <Stack className="top-card-box">
                <Box 
                    className="card-img"
                    style={{ backgroundImage: `url(${category.image})` }} 
                />
            </Stack>
            <Box className='title'>
                <Typography variant="h2">{category.name}</Typography>
            </Box>
        </Stack>
    );
};

export default CategoriesCard;
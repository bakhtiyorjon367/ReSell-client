import React from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const WomenFashionCard = () =>{
    return (
        <Stack className="top-card-box" style={{backgroundImage:`url("/img/banner/types/house.webp")`}} >
            
            <Box className={"info"}>
                 <div className="view-like-box">
                        <div>
                            <IconButton color={"default"}>
                            <RemoveRedEyeIcon/>
                            </IconButton>
                            <Typography className="view-cnt">120</Typography>
                        </div>
                        <div>
                            <IconButton color="error">
                                <FavoriteIcon/>
                            </IconButton>
                            <Typography className="view-cnt">200</Typography>
                        </div>
                        
                    </div>
                {/* </div> */}
            </Box>
        </Stack>
    );
};
export default WomenFashionCard; 
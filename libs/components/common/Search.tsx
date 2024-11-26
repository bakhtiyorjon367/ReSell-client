import { OutlinedInput, Stack, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { useRouter } from 'next/router'; 
import { ProductLocation } from '../../enums/product.enum'; 
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

export const Search = () => {
    const [searchText, setSearchText] = useState<string>('');
    const [selectedLocation, setSelectedLocation] = useState<ProductLocation | null>(null); 
    const router = useRouter(); 

    const handleKeyDown = (event:any) => {
        if (event.key === 'Enter' ) {
            if(!searchText.trim()){
                return;
            }
            const input = {
                page: 1,
                limit: 12,
                sort: 'createdAt',
                direction: 'DESC',
                search: {
                    locationList: selectedLocation ? [selectedLocation] : [ProductLocation.SEOUL],
                    text: searchText ? searchText : ''
                },
            };
            router.push(`/product?input=${(JSON.stringify(input))}`);
        }
    };

    const handleLocationChange = (event: SelectChangeEvent<ProductLocation>) => {
        const value = event.target.value as ProductLocation;
        setSelectedLocation(value);
    };

    return (
        <Stack direction="row" alignItems="center" className="search-box">
            <FormControl className="location-form" >
                <Select
                    className="location-label"
                    labelId="location-select-label"
                    multiple={false} 
                    value={selectedLocation || ProductLocation.SEOUL} 
                    onChange={handleLocationChange}
                    sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'transparent', 
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'transparent',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'transparent', 
                        },
                    }}
                >
                    {Object.values(ProductLocation).map((location) => (
                        <MenuItem key={location} value={location}>
                            {location}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <OutlinedInput
                value={searchText}
                type={'text'}
                className={'searchInput'}
                placeholder={'What are you looking for?'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)} 
                onKeyDown={handleKeyDown} 
                endAdornment={
                    <CancelRoundedIcon sx={{cursor:'pointer', width:'90px'}}
                        onClick={() => {
                            setSearchText('');
                            setSelectedLocation(null); 
                        }}
                    />
                }
                sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'transparent',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'transparent',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'transparent', 
                    },
                }}
            />
        </Stack>
    );
};
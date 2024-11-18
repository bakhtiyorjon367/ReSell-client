import { Box, Stack } from "@mui/material";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import { Swiper, SwiperSlide } from "swiper/react";
import CategoriesCard from "./CategoriesCard";
import { useRouter } from 'next/router'; 
import { ProductCategory } from '../../enums/product.enum'; 
import { useTranslation } from "react-i18next";


const categoryMapping = {
    [ProductCategory.ELECTRONICS]: { id: 1, name: "Electronics", image: "/img/categories/electronic.png" },
    [ProductCategory.FURNITURE]: { id: 2, name: "Furniture", image: "/img/categories/furniture.png" },
    [ProductCategory.HOMEandGARDEN]: { id: 3, name: "Home & Garden", image: "/img/categories/home.png" },
    [ProductCategory.BABYandKIDS]: { id: 4, name: "Baby & Kids", image: "/img/categories/baby.png" },
    [ProductCategory.WOMEN]: { id: 5, name: "Women's Fashion", image: "/img/categories/women.png" },
    [ProductCategory.MEN]: { id: 6, name: "Men's Fashion", image: "/img/categories/men.png" },
    [ProductCategory.HEALTHandBEAUTY]: { id: 7, name: "Health & Beauty", image: "/img/categories/beauty.png" },
    [ProductCategory.SPORTandOUTDOOR]: { id: 8, name: "Sports & Outdoors", image: "/img/categories/sportOutdoor.png" },
    [ProductCategory.GAMEandHOBBY]: { id: 9, name: "Game & Hobbies", image: "/img/categories/games.PNG" },
    [ProductCategory.BOOKandMUSIC]: { id: 10, name: "Books & Music", image: "/img/categories/books.png" },
    [ProductCategory.ANIMAL]: { id: 11, name: "Pet Supplies", image: "/img/categories/pet.PNG" },
    [ProductCategory.ART]: { id: 12, name: "Art & Collectibles", image: "/img/categories/art.png" },
    [ProductCategory.OTHER]: { id: 13, name: "Other", image: "/img/categories/other.png" },
    [ProductCategory.WANTED]: { id: 14, name: "Wanted", image: "/img/categories/wanted.png" },
};

const Categories = () => {
    const router = useRouter(); 
    const { t, i18n } = useTranslation('common');
    
    const handleCategoryClick = (category: ProductCategory) => {
        const input = {
            page: 1,
            limit: 12,
            sort: "createdAt",
            direction: "DESC",
            search: {
                pricesRange: { start: 0, end: 200000 },
                typeList: [category],
            }
        };
        const queryString = encodeURIComponent(JSON.stringify(input));

        router.push(`/product?input=${queryString}`);
    };

    return (
        <Stack className={"categories"}>
            <Stack className={"container"}>
                <Stack className={"info-box"}>
                    <Box className={"left"}>
                        <span>{t('Categories')}</span>
                    </Box>
                    <Box className={"right"}>
                        <div className={"pagination-box"}>
                            <WestIcon className={"swiper-trend-prev"} />
                            <div className={"swiper-trend-pagination"}></div>
                            <EastIcon className={'swiper-trend-next'} />
                        </div>
                    </Box>
                </Stack>
                <Stack className={"card-box"}>
                    <Swiper
                        className={"categories-swiper"}
                        slidesPerView={"auto"}
                        spaceBetween={15}
                        navigation={{
                            nextEl: ".swiper-trend-next",
                            prevEl: ".swiper-trend-prev",
                        }}
                        pagination={{
                            el: ".swiper-trend-pagination",
                        }}
                    >
                        {Object.entries(categoryMapping).map(([categoryEnum, category]) => (
                            <SwiperSlide key={categoryEnum} className={"categories-slide"}>
                                <CategoriesCard 
                                    category={category} 
                                    onClick={() => handleCategoryClick(categoryEnum as ProductCategory)} // Pass click handler with enum
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default Categories;
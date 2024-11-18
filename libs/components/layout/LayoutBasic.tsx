import { Stack } from "@mui/material"
import  Head  from "next/head"
import Footer from "../Footer";
import Top from "../Top";
import { Search } from "../common/Search";

const withLayoutBasic =(Component:any)=>{
    return (props:any)=>{
        return (
            <>
                <Head>
                    <title>ReSell</title>
                </Head>
                <Stack id="pc-wrap">
                      <Stack id={"top"}><Top/></Stack>
                    <Stack 
                        className={"header-basic"}
                        style={{
                            boxShadow: "inset 10px 40px 150px 40px rgba(24 22 36)",
                        }}
                    >
                        <Stack className="container">
                            <Search/>
                        </Stack>
                        <Stack></Stack>
                    </Stack>
                    <Stack id={"main"}>
                        <Component {...props} />
                    </Stack>

                    <Stack id={"footer"}><Footer/></Stack>
                </Stack>
            </>
        );
    };
};
export default withLayoutBasic;
import Head from "next/head";
import { Box } from "@chakra-ui/react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

interface LayoutProps {
  title?: string;
  children: React.ReactNode;
}

export default function AppLayout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>ProductGPT</title>
      </Head>
      <Box
        minHeight={"100vh"}
        height="auto"
        backgroundImage={"#EFEFEF"}
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundAttachment="fixed"
      >
        <Navbar />
        <Box pt="10vh" pb="0vh">
          {children}
        </Box>
        <Footer/>
      </Box>
    </>
  );
}

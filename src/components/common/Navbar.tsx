import Link from "next/link";

import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Box
      position="fixed"
      top={0}
      width="100%"
      pl={{ base: 0, md: 0 }}
      style={{ background: "rgba(43, 114, 219, 0)" }}
      backdropFilter="blur(20px)"
      zIndex={1000}
    >
      <Flex
        color={"black"}
        h="65px"
        py={{ base: 4 }}
        px={{ base: 5 }}
        align={"center"}
        justify={{ base: "space-between", md: "space-between" }}
      >
        <Flex justify={{ base: "center", md: "start" }}>
          <Text fontSize={"28px"} fontWeight="bold">
            ProductGPT
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;

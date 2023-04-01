import { FaTwitter, FaFacebook } from "react-icons/fa";
import { Text, Flex, HStack } from "@chakra-ui/react";

const Footer = ({textColor = "black"} : {textColor?: string}) => {
  return (
    <Flex
      justifyContent={"space-between"}
      py={{ base: 4 }}
      px={{ base: 5 }}
      mt={{sm: 10, base: 10}}
      alignItems={"center"}
      color={textColor}
      flexDirection={{md: 'row', sm: 'column-reverse', base: 'column-reverse'}}
    >
      <Text my={{md: 0, sm: 5, base: 5}} textAlign={{sm: 'center', base: 'center'}}>© Copyright ProductGPT 2023 All rights reserved.</Text>
      <HStack spacing={4} pl={5}>
        {/* <FaDiscord /> */}
        {/* <FaTwitter
          size={"1.5rem"}
          cursor={"pointer"}
          onClick={(e) => {
            e.preventDefault();
            window.open("#", "_blank", "noopener,noreferrer");
          }}
        /> */}
        {/* <FaTelegram /> */}
        {/* <FaFacebook
          size={"1.5rem"}
          cursor={"pointer"}
          onClick={(e) => {
            e.preventDefault();
            window.open("#", "_blank", "noopener,noreferrer");
          }}
        /> */}
      </HStack>
    </Flex>
  );
};

export default Footer;

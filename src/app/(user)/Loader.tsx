import React from "react";
import { Spinner, Image, Flex, VStack, Heading } from "@chakra-ui/react";
const Loader: React.FC<Record<string, never>> = () => {
  return (
    <Flex justify="center"  align="center" style={{ height: "100%", width:"100%" }}>
      <VStack>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="gray.600"
          size="xl"
        />
        <Heading fontSize="md">Loading...</Heading>
      </VStack>
    </Flex>
  );
};
export default Loader;

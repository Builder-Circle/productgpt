import GeneratorInput from "@/components/GeneratorInput";
import GeneratorOutput from "@/components/GeneratorOutput";
import { GeneratorProvider } from "@/contexts/GeneratorContext";
import { Button, Grid, GridItem, Text, VStack } from "@chakra-ui/react";
import AppLayout from "../layouts/AppLayout";

export function MainPage() {
  return (
    <AppLayout>
      <GeneratorProvider>
        <VStack textAlign={"center"}>
          <Text fontSize={"24px"} fontWeight={"bold"}>
            An open-source product commercial photo generator
          </Text>
          <Button colorScheme={"spaceblue"}>
            View Code
          </Button>
          <Grid
            templateColumns="repeat(10, 1fr)"
            gap={4}
            p={8}
            w="100%"
            minH={"80vh"}
          >
            <GridItem colSpan={{ base: 10, md: 4 }}>
              <GeneratorInput />
            </GridItem>
            <GridItem colSpan={{ base: 10, md: 6 }}>
              <GeneratorOutput />
            </GridItem>
          </Grid>
        </VStack>
      </GeneratorProvider>
    </AppLayout>
  );
}

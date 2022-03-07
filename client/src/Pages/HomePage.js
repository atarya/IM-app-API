import React from "react";
import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

const Homepage = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="3px"
        borderColor="gray"
      >
        <Text fontSize="2xl" fontFamily="work sans" color="black">
          S.L.A.C.K
        </Text>
      </Box>
      <Box
        background="white"
        w="100%"
        p={4}
        color="black"
        borderRadius="lg"
        borderWidth="3px"
        borderColor="gray"
      >
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">SignUp</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>{/* <Login /> */}</TabPanel>
            <TabPanel>{/* <Signup /> */}</TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Homepage;

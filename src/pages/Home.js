import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout>
      <Box>
        <Heading as="h2" size="md" mb={4}>
          Welcome to the Home Page
        </Heading>
        <Text>This is the home page content.</Text>
      </Box>
    </Layout>
  );
}
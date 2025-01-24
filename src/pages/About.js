import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import Layout from "../components/Layout";

export default function About() {
  return (
    <Layout>
      <Box>
        <Heading as="h2" size="md" mb={4}>
          About Us
        </Heading>
        <Text>This is the about page content.</Text>
      </Box>
    </Layout>
  );
}
import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import Layout from "../components/Layout";

export default function Contact() {
  return (
    <Layout>
      <Box>
        <Heading as="h2" size="md" mb={4}>
          Contact Us
        </Heading>
        <Text>This is the contact page content.</Text>
      </Box>
    </Layout>
  );
}
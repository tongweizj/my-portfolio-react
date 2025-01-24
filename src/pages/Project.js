import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import Layout from "../components/Layout";

export default function Project() {
  return (
    <Layout>
      <Box>
        <Heading as="h2" size="md" mb={4}>
          Projects
        </Heading>
        <Text>This is the project page content.</Text>
      </Box>
    </Layout>
  );
}
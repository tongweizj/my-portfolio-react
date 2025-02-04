import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
//import Heading from "./components/Header";
function Layout({ children }) {
  return (
    <Box>
      {/* Header */}
      <Box bg="teal.500" color="white" p={4}>
        <Heading as="h1" size="lg">
          My Blog
        </Heading>
      </Box>

      {/* Nav */}
      <Box bg="gray.100" p={4}>
      <Flex as="nav" gap={4}>
  <RouterLink to="/">Home</RouterLink>
  <RouterLink to="/project">Project</RouterLink>
  <RouterLink to="/services">Services</RouterLink>
  <RouterLink to="/about">About</RouterLink>
  <RouterLink to="/contact">Contact</RouterLink>
</Flex>
      </Box>

      {/* Content */}
      <Box p={4}>{children}</Box>

      {/* Footer */}
      <Box bg="gray.800" color="white" p={4} textAlign="center">
        <Text>&copy; 2023 My Blog. All rights reserved.</Text>
      </Box>
    </Box>
  );
}

export default Layout;
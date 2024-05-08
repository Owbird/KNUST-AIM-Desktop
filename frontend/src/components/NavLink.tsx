import { Box, useColorModeValue } from "@chakra-ui/react";

interface NavLinkProps {
  href: string;
  label: string;
}

const NavLink = ({ href, label }: NavLinkProps) => {
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700")
      }}
      href={href}
    >
      {label}
    </Box>
  );
};

export default NavLink;

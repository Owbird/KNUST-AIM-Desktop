import AIMLogo from "@/assets/images/aim.png";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  useColorModeValue
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { FaSignInAlt } from "react-icons/fa";
import NavLink from "./NavLink";

const links = ["News", "Results", "Profile"];

interface NavBarProps {
  children: ReactNode;
}

const NavBar = ({ children }: NavBarProps) => {
  return (
    <Box>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <Avatar src={AIMLogo} />
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>

          <Flex alignItems={"center"}>
            <Button
              variant={"solid"}
              colorScheme={"teal"}
              size={"sm"}
              mr={4}
              leftIcon={<FaSignInAlt />}
            >
              Sign In
            </Button>
          </Flex>
        </Flex>
      </Box>

      <Box p={4}>{children}</Box>
    </Box>
  );
};

export default NavBar;

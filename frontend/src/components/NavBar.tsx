import AIMLogo from "@/assets/images/aim.png";
import useAuth from "@/hooks/auth/useAuth";
import { SignInFormData } from "@/types/forms";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Menu,
  MenuButton,
  MenuList,
  Stack,
  useColorModeValue
} from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import Loading from "./Loading";
import NavLink from "./NavLink";

const links = ["News", "Results", "Profile"];

interface NavBarProps {
  children: ReactNode;
}

const NavBar = ({ children }: NavBarProps) => {
  const [formData, setFormData] = useState<SignInFormData>({
    username: "",
    studentId: "",
    password: ""
  });

  const { signIn, isLoading } = useAuth();

  const handleFormInput = (key: keyof typeof formData, value: string) => {
    setFormData((formData) => ({
      ...formData,
      [key]: value
    }));
  };

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
            <Menu>
              <MenuButton
                variant={"solid"}
                colorScheme={"teal"}
                size={"sm"}
                mr={4}
                leftIcon={<FaSignInAlt />}
                as={Button}
                rightIcon={<ChevronDownIcon />}
              >
                Sign In
              </MenuButton>
              <MenuList>
                <Flex>
                  <Stack>
                    <Box rounded={"lg"} p={12}>
                      {isLoading ? (
                        <Loading />
                      ) : (
                        <Stack spacing={4}>
                          <FormControl id="studentID">
                            <FormLabel>Student ID</FormLabel>
                            <Input
                              onChange={(event) =>
                                handleFormInput("studentId", event.target.value)
                              }
                              type="number"
                              placeholder="20665584"
                            />
                          </FormControl>
                          <FormControl id="username">
                            <FormLabel>Username</FormLabel>
                            <Input
                              onChange={(event) =>
                                handleFormInput("username", event.target.value)
                              }
                              placeholder="username"
                            />
                          </FormControl>
                          <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input
                              onChange={(event) =>
                                handleFormInput("password", event.target.value)
                              }
                              type="password"
                              placeholder="*******"
                            />
                          </FormControl>
                          <Stack spacing={10}>
                            <Button
                              bg={"blue.400"}
                              color={"white"}
                              _hover={{
                                bg: "blue.500"
                              }}
                              onClick={async () => {
                                await signIn.mutateAsync(formData);
                              }}
                            >
                              Sign in
                            </Button>
                          </Stack>
                        </Stack>
                      )}
                    </Box>
                  </Stack>
                </Flex>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>

      <Box p={4}>{children}</Box>
    </Box>
  );
};

export default NavBar;

import { Box, Heading, HStack, Text } from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";
import { FaCircle } from "react-icons/fa";
import { GetVersion } from "../../wailsjs/go/main/App";
import { BrowserOpenURL } from "../../wailsjs/runtime/runtime";

const Link = ({ label, href }: { label: string; href: string }) => {
  return (
    <span
      onClick={() => BrowserOpenURL(href)}
      className="text-blue-500 hover:cursor-pointer hover:underline"
    >
      {" "}
      {label}{" "}
    </span>
  );
};

const About = () => {
  const [version, setVersion] = useState("");

  useEffect(() => {
    const getVersion = async () => {
      const version = await GetVersion();
      setVersion(version);
    };

    getVersion()
  }, []);

  const links = [
    {
      label: "View releases",
      href: "https://github.com/Owbird/KNUST-AIM-Desktop/releases"
    },
    {
      label: "Submit a bug",
      href: "https://github.com/Owbird/KNUST-AIM-Desktop/issues/new"
    },
    {
      label: "License",
      href: "https://raw.githubusercontent.com/Owbird/KNUST-AIM-Desktop/main/LICENSE"
    }
  ];

  return (
    <Box
      className="flex flex-col justify-center items-center"
      padding="4"
      bg="gray.50"
      borderRadius="md"
      shadow="md"
    >
      <Heading as="h1" size="xl" color="teal.500">
        KNUST AIM Desktop
      </Heading>

      <Text color={"gray.500"}>{version}</Text>

      <Text fontSize="lg" textAlign="center" mb="2" mt={"4"}>
        KNUST AIM Desktop is an{" "}
        <Link
          href="https://github.com/Owbird/KNUST-AIM-Desktop"
          label="open source"
        />
        unofficial AIM client designed to bring the functionality of the
        Academic Information Manager (AIM) to your desktop. This application
        leverages the
        <Link href="https://github.com/Owbird/KNUST-AIM-API" label="AIM API" />
        to provide seamless access to essential academic information for
        students of Kwame Nkrumah University of Science and Technology (KNUST).
      </Text>

      <HStack>
        {links.map(({ label, href }) => (
          <Fragment>
            <FaCircle size={10} />

            <Link label={label} href={href} />
          </Fragment>
        ))}
      </HStack>
    </Box>
  );
};

export default About;

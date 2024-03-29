import { type NewsItem } from "@/types/news";
import {
  Box,
  Heading,
  Text,
  Image,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Fragment } from "react";
import NewsDetails from "./NewsDetails";

interface NewsItemProps {
  news: NewsItem;
}

const NewsItem = ({ news }: NewsItemProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Fragment>
      {isOpen && <NewsDetails news={news} onClose={onClose} />}

      <Box
        className="hover:border-8 hover:border-red-200"
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"md"}
        h={"100%"}
        p={6}
        onClick={onOpen}
      >
        <Box bg={"gray.100"} mt={-6} mx={-6} mb={6} pos={"relative"}>
          <Image src={news.featured_image} w={"100%"} alt="News Image" />
        </Box>
        <Box>
          <Text
            color={"green.500"}
            textTransform={"uppercase"}
            fontWeight={800}
            fontSize={"sm"}
            letterSpacing={1.1}
          >
            {news.category}
          </Text>
          <Text color={"gray.500"} mt={3} mb={3}>
            {news.date}
          </Text>
          <Heading
            color={useColorModeValue("gray.700", "white")}
            fontSize={"2xl"}
            fontFamily={"body"}
          >
            {news.title}
          </Heading>
          <Text color={"gray.500"}>{news.description}</Text>
        </Box>
      </Box>
    </Fragment>
  );
};

export default NewsItem;

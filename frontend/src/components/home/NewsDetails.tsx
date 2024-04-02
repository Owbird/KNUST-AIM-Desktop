import { type NewsDetails, type NewsItem } from "@/types/news";
import {
	Box,
	Text,
	Image,
	useColorModeValue,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	Stack,
} from "@chakra-ui/react";
import useGetNewsDetails from "@/hooks/news/useGetNewsDetails";
import Loading from "@/components/Loading";
import { Fragment } from "react";

interface NewsDetailsProps {
	news: NewsItem;
	onClose: () => void;
}

const NewsDetails = ({ news, onClose }: NewsDetailsProps) => {
	const { error, isLoading, data } = useGetNewsDetails(news.slug);

	const renderNewsContent = ({
		type,
		value,
	}: NewsDetails["content"][number]) => {
		switch (type) {
			case "text":
				return <Text color={"gray.500"}>{value}</Text>;

			case "media":
				return <Image src={value} alt="media image" />;

			default:
				return <Fragment />;
		}
	};

	const renderBody = () => {
		if (isLoading) return <Loading />;

		if (error) return "Couldn't load";

		return (
			<Box
				w={"full"}
				bg={useColorModeValue("white", "gray.900")}
				rounded={"md"}
				p={6}
				maxH={500}
				overflow={"scroll"}
			>
				<Box bg={"gray.100"} mt={-6} mx={-6} mb={6} pos={"relative"}>
					<Image
						src={news.featured_image}
						alt="featured image"
						w={"100%"}
					/>
				</Box>
				<Stack>
					<Text
						color={"green.500"}
						fontWeight={800}
						fontSize={"sm"}
						letterSpacing={1.1}
					>
						{news.date} . {data?.news.read_time}min read
					</Text>
					{data?.news.content.map(renderNewsContent)}
				</Stack>
			</Box>
		);
	};

	return (
		<Modal isOpen={true} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{news.title}</ModalHeader>
				<ModalCloseButton />
				<ModalBody>{renderBody()}</ModalBody>

				<ModalFooter>
					<Button
						_hover={{
							backgroundColor: "red.300",
						}}
						backgroundColor={"red.400"}
						color="white"
						mr={3}
						onClick={onClose}
					>
						Close
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default NewsDetails;

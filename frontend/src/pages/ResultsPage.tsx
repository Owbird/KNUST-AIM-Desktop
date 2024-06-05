import Loading from "@/components/Loading";
import useGetResults from "@/hooks/results/useGetResults";
import useGetResultsSelection from "@/hooks/results/useGetResultsSelection";
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  GridItem,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import clsx from "clsx";
import { useState } from "react";

const ResultsPage = () => {
  const { data, isLoading, error } = useGetResultsSelection();
  const {
    data: results,
    isLoading: resultsLoading,
    checkResult,
    clearResults,
  } = useGetResults();

  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSem, setSelectedSem] = useState("");

  const btnDisabled =
    resultsLoading || selectedYear === "" || selectedSem === "";

  const handleCheckResult = async () => {
    await checkResult.mutateAsync({ sem: selectedSem, year: selectedYear });
  };

  if (isLoading) return <Loading />;

  if (error) return <h1>Couldn't load</h1>;

  return (
    <Box>
      <pre>{JSON.stringify(results, null, 4)}</pre>
      <Modal
        isOpen={results !== undefined}
        onClose={clearResults}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Results for {results?.personal_data.year} semester{" "}
            {results?.personal_data.sem}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {results?.results.map((result) => (
              <Box
                id={result.course_code}
                border="solid"
                borderColor={"red.300"}
                borderRadius={25}
                p={4}
                m={2}
              >
                <Text>{result.course_code}</Text>
                <Text>{result.course_name}</Text>

                <Flex gap={3} justifyContent="space-between" mt={3}>
                  <Text>{result.grade}</Text>
                  <Text>{result.total_mark}</Text>
                </Flex>
              </Box>
            ))}

            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th></Th>
                    <Th>Sem</Th>
                    <Th>Cumulative</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Credits Registered</Td>
                    <Td>{results?.summary.credits_registered.semester}</Td>
                    <Td>{results?.summary.credits_registered.cumulative}</Td>
                  </Tr>

                  <Tr>
                    <Td>Credits Obtained</Td>
                    <Td>{results?.summary.credits_obtained.semester}</Td>
                    <Td>{results?.summary.credits_obtained.cumulative}</Td>
                  </Tr>

                  <Tr>
                    <Td>Credits Calculated</Td>
                    <Td>{results?.summary.credits_calculated.semester}</Td>
                    <Td>{results?.summary.credits_calculated.cumulative}</Td>
                  </Tr>

                  <Tr>
                    <Td>Weighted Marks</Td>
                    <Td>{results?.summary.weighted_marks.semester}</Td>
                    <Td>{results?.summary.weighted_marks.cumulative}</Td>
                  </Tr>

                  <Tr>
                    <Td>CWA</Td>
                    <Td>{results?.summary.cwa.semester}</Td>
                    <Td>{results?.summary.cwa.cumulative}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Box>
        <Heading>Years</Heading>
        <Text className="text-gray-500">Select a year</Text>
        <Grid templateColumns="repeat(3, 1fr)" gap={2}>
          {data?.results.years.map((year) => (
            <GridItem
              key={year}
              onClick={() => setSelectedYear(year)}
              className={clsx(
                "hover:border-red-200 border-8",
                year === selectedYear && "border-red-200"
              )}
            >
              <Card className="p-4 text-center">{year}</Card>
            </GridItem>
          ))}
        </Grid>
      </Box>

      <Box className="mt-4">
        <Heading>Sems</Heading>
        <Text className="text-gray-500">Select a sem</Text>
        <Grid templateColumns="repeat(3, 1fr)" gap={2}>
          {data?.results.sems.map((sem) => (
            <GridItem
              key={sem}
              onClick={() => setSelectedSem(sem)}
              className={clsx(
                "hover:border-red-200 border-8",
                sem === selectedSem && "border-red-200"
              )}
            >
              <Card className="p-4 text-center">{sem}</Card>
            </GridItem>
          ))}
        </Grid>
      </Box>

      <Box className="mt-4 flex justify-center">
        <Button
          onClick={handleCheckResult}
          className={clsx(btnDisabled && "cursor-not-allowed")}
          colorScheme={btnDisabled ? undefined : "green"}
        >
          {resultsLoading ? "Loading..." : "Get Results"}
        </Button>
      </Box>
    </Box>
  );
};

export default ResultsPage;

import Loading from "@/components/Loading";
import useGetResultsSelection from "@/hooks/results/useGetResultsSelection";
import {
  Box,
  Button,
  Card,
  Grid,
  GridItem,
  Heading,
  Text
} from "@chakra-ui/react";
import clsx from "clsx";
import { useState } from "react";

const ResultsPage = () => {
  const { data, isLoading, error } = useGetResultsSelection();

  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSem, setSelectedSem] = useState("");

  const btnDisabled = selectedYear === "" || selectedSem === "";

  if (isLoading) return <Loading />;

  if (error) return  "Error"

  return (
    <Box>
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
          className={clsx(btnDisabled && "cursor-not-allowed")}
          colorScheme={btnDisabled ? undefined : "green"}
        >
          Get Results
        </Button>
      </Box>
    </Box>
  );
};

export default ResultsPage;

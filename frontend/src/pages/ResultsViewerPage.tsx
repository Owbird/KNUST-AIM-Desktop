import { models } from "@go/models";
import { GetResults } from "@go/results/ResultsFunctions";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@src/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@src/components/ui/table";
import { useEffect, useState } from "react";

const InfoPane = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col">
    <p className="text-sm text-muted-foreground">{label}</p>
    <p className="font-semibold">{value}</p>
  </div>
);

interface ResultsViewerPageProps {
  year: string;
  semester: string;
}

export function ResultsViewerPage({ year, semester }: ResultsViewerPageProps) {
  const [results, setResults] = useState<models.GetResultsResponse | null>(
    null,
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    GetResults(token, { year, sem: semester }).then(setResults);
  }, [year, semester]);

  if (!results) return <></>;

  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold">Examination Results</h1>

      <Card>
        <CardHeader>
          <CardTitle>Student Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <InfoPane label="Name" value={results.personal_data.name} />
          <InfoPane
            label="Student ID"
            value={results.personal_data.studentId}
          />
          <InfoPane label="Programme" value={results.personal_data.programme} />
          <InfoPane label="Academic Year" value={`${year} (${semester})`} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Results</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course Code</TableHead>
                <TableHead>Course Name</TableHead>
                <TableHead className="text-center">Credits</TableHead>
                <TableHead className="text-center">Grade</TableHead>
                <TableHead className="text-right">Total Mark</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.results.map((row) => (
                <TableRow
                  key={row.course_code}
                  className={row.grade === "F" ? "bg-red-100/50" : ""}
                >
                  <TableCell>{row.course_code}</TableCell>
                  <TableCell className="font-medium">
                    {row.course_name}
                  </TableCell>
                  <TableCell className="text-center">{row.credits}</TableCell>
                  <TableCell className="text-center font-bold">
                    {row.grade}
                  </TableCell>
                  <TableCell className="text-right">{row.total_mark}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <InfoPane
              label="Credits Registered"
              value={results.summary.credits_registered.toString()}
            />
            <InfoPane
              label="Credits Obtained"
              value={results.summary.credits_registered.toString()}
            />
            <InfoPane
              label="Credits Calculated"
              value={results.summary.credits_calculated.toString()}
            />
            <InfoPane
              label="Total Weighted Marks"
              value={results.summary.credits_obtained.toString()}
            />
            <InfoPane label="CWA" value={results.summary.cwa.cumulative} />
            <InfoPane label="Semester" value={results.summary.cwa.semester} />
          </CardContent>
        </Card>
        {results.trails.length > 0 && (
          <Card className="border-red-500">
            <CardHeader>
              <CardTitle className="text-red-700">Trails</CardTitle>
            </CardHeader>
            <CardContent>
              {results.trails.map((trail) => (
                <div
                  key={trail}
                  className="flex justify-between items-center py-2 border-b"
                >
                  <p>{trail}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

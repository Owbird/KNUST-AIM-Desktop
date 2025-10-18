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
import { useAuth } from "@src/context/AuthContext";
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

  const { getToken } = useAuth();

  useEffect(() => {
    const token = getToken();
    if (!token) return;
    GetResults(token, { year, sem: semester }).then(setResults);
  }, [year, semester]);

  if (!results) return <></>;

  function scoreToGPA(score: number): number {
    if (score >= 80) return 4.0; // A
    if (score >= 75) return 3.7; // A-
    if (score >= 70) return 3.3; // B+
    if (score >= 65) return 3.0; // B
    if (score >= 60) return 2.7; // B-
    if (score >= 55) return 2.3; // C+
    if (score >= 50) return 2.0; // C
    if (score >= 45) return 1.7; // C-
    if (score >= 40) return 1.3; // D+
    if (score >= 35) return 1.0; // D
    return 0.0; // F
  }

  const gpa = scoreToGPA(parseInt(results.summary.cwa.cumulative));

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
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Metric</TableHead>
                  <TableHead className="text-right font-semibold">
                    Semester
                  </TableHead>
                  <TableHead className="text-right font-semibold">
                    Cumulative
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">
                    Credits Calculated
                  </TableCell>
                  <TableCell className="text-right">
                    {results.summary.credits_calculated.semester}
                  </TableCell>
                  <TableCell className="text-right">
                    {results.summary.credits_calculated.cumulative}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Total Weighted Marks
                  </TableCell>
                  <TableCell className="text-right">
                    {results.summary.weighted_marks.semester}
                  </TableCell>
                  <TableCell className="text-right">
                    {results.summary.weighted_marks.cumulative}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">CWA</TableCell>
                  <TableCell className="text-right font-bold">
                    {results.summary.cwa.semester}
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    {results.summary.cwa.cumulative}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">GPA</TableCell>
                  <TableCell className="text-right font-bold">-</TableCell>
                  <TableCell className="text-right font-bold">{gpa}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
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

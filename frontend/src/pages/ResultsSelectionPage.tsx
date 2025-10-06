import { useEffect, useState } from "react";
import { Button } from "@src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@src/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@src/components/ui/select";
import { Label } from "@src/components/ui/label";
import { GetResults, SelectResult } from "@go/results/ResultsFunctions";
import { models } from "@go/models";
import { Dialog, DialogContent } from "@src/components/ui/dialog";
import { ResultsViewerPage } from "./ResultsViewerPage";
import Loader from "@src/components/Loader";

export function ResultsSelectionPage() {
  const [availablePeriods, setAvailablePeriods] = useState<
    models.ResultsSelection | null
  >(null);

  const [year, setYear] = useState<string>();
  const [semester, setSemester] = useState<string>();
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      SelectResult(token)
        .then(setAvailablePeriods)
        .finally(() => setLoading(false));
    }
  }, []);

  const handleViewResults = async () => {
    if (year && semester) {
      setIsViewerOpen(true);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!availablePeriods) return <></>;

  const { years, sems } = availablePeriods;

  return (
    <>
      <div className="flex items-center justify-center h-full">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">
              View Examination Results
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-2">
              <Label>Academic Year</Label>
              <Select onValueChange={setYear} value={year}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((y) => (
                    <SelectItem key={y} value={y}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Semester</Label>
              <Select onValueChange={setSemester} value={semester}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a semester" />
                </SelectTrigger>
                <SelectContent>
                  {sems.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleViewResults} disabled={!year || !semester}>
              View Results
            </Button>
          </CardContent>
        </Card>
      </div>
      <Dialog open={isViewerOpen} onOpenChange={setIsViewerOpen}>
        <DialogContent className="sm:max-w-xl md:max-w-4xl lg:max-w-6xl max-h-[90vh] overflow-y-auto">
          {year && semester && (
            <ResultsViewerPage year={year} semester={semester} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}


import { ViewLink } from "@go/main/App";
import { Button } from "@src/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@src/components/ui/card";

export function AboutPage() {
  return (
    <div className="container mx-auto py-10 max-w-3xl space-y-8">
      <Card className="border-l-4 border-red-500 bg-red-50 dark:bg-red-950/30">
        <CardContent className="py-4">
          <p className="font-medium text-red-600 dark:text-red-400">
            Disclaimer: This is a community-driven project and is not an official
            application from Kwame Nkrumah University of Science and Technology (KNUST).
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-blue-950 dark:text-blue-200">
            About KNUST-AIM
          </CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none space-y-4">
          <p>
            <strong>KNUST-AIM</strong> is a desktop application designed to help students of
            Kwame Nkrumah University of Science and Technology (KNUST) access their
            academic information with ease.
          </p>

          <p>
            Built with <strong>Go</strong> and <strong>React</strong>, it offers a modern and
            intuitive interface for students to view their results, campus news, and other
            relevant updates.
          </p>

          <p>
            The project’s source code is open and available on{" "}
            <Button
              variant="link"
              className="text-blue-600 px-1"
              onClick={() =>
                ViewLink("https://github.com/owbird/knust-aim-desktop")
              }
            >
              GitHub
            </Button>
            .
          </p>

          <p>
            The official KNUST AIM website can be found{" "}
            <Button
              variant="link"
              className="text-blue-600 px-1"
              onClick={() => ViewLink("https://apps.knust.edu.gh/knustaim/")}
            >
              here
            </Button>
            .
          </p>

          <p className="pt-2">
            Built with ❤️ by{" "}
            <Button
              variant="link"
              className="text-blue-600 px-1"
              onClick={() => ViewLink("https://owbird.site")}
            >
              Owbird
            </Button>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  );
}


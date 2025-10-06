import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@src/components/ui/card";
import { Input } from "@src/components/ui/input";
import { Label } from "@src/components/ui/label";
import { AuthenticateUser } from "@go/auth/AuthFunctions";
import Loader from "@src/components/Loader";

export function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    studentId: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    const { username, password, studentId } = form;

    try {
      if (!username || !password || !studentId) {
        setError("Please fill in all required fields to continue.");
        return;
      }

      const res = await AuthenticateUser({ username, password, studentId });
      localStorage.setItem("token", res);
      navigate("/")
    } catch (err) {
      console.error(err);
      setError("Login failed. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-sm shadow-md border border-gray-200 dark:border-gray-700">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto bg-red-500 h-16 w-16 rounded-full mb-3 flex items-center justify-center">
            <span className="text-white font-bold text-xl">AIM</span>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            KNUST AIM Desktop
          </CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400">
            Sign in with your student credentials to access your academic dashboard.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="e.g. jdoe21"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your portal password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="studentId">Student ID</Label>
              <Input
                id="studentId"
                type="password"
                placeholder="e.g. 21234567"
                value={form.studentId}
                onChange={handleChange}
                required
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 text-center bg-red-50 py-1 rounded">
                {error}
              </p>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button onClick={handleLogin} className="w-full">
            Sign In
          </Button>
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            This is a community-built desktop client for KNUST AIM.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}


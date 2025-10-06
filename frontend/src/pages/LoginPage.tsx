import { useState } from "react";
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
import { GetVersion } from "@go/main/App";
import Loader from "@src/components/Loader";

export function LoginPage() {
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
      console.log(await GetVersion());
      console.log("Attempting login with:", form);

      if (username && password && studentId) {
        const res = await AuthenticateUser({ username, password, studentId });
        localStorage.setItem("token", res);

        window.location.href = "/";
      } else {
        setError("All fields are required.");
      }
    } catch (err) {
      setError(err.toString() as string);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mx-auto bg-gray-200 h-16 w-16 rounded-full mb-4"></div>
          <CardTitle className="text-2xl">KNUST AIM</CardTitle>
          <CardDescription>Desktop Client Login</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Your username"
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
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="studentId">Student ID</Label>
              <Input
                id="studentId"
                type="text"
                placeholder="Your student ID"
                value={form.studentId}
                onChange={handleChange}
                required
              />
            </div>
            {error && (
              <p className="text-sm text-red-600 text-center">{error}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button onClick={handleLogin} className="w-full">
            Login
          </Button>
          <p className="text-xs text-gray-500">Powered by KNUST AIM</p>
        </CardFooter>
      </Card>
    </div>
  );
}

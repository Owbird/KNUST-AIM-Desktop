import { models } from "@go/models";
import { GetUserData } from "@go/user/UserFunctions";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@src/components/ui/card";
import { useEffect, useState } from "react";

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: string | string[];
}) => (
  <div className="grid grid-cols-2 gap-4 py-2 border-b">
    <p className="text-sm font-medium text-muted-foreground">{label}</p>
    <div className="text-sm">
      {Array.isArray(value) ? (
        value.map((v, i) => <p key={i}>{v}</p>)
      ) : (
        <p>{value}</p>
      )}
    </div>
  </div>
);

export function ProfilePage() {
  const [userData, setUserData] = useState<models.UserData | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      GetUserData(token).then(setUserData).catch(console.error);
    }
  }, []);

  if (!userData) return <></>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Student Profile</h1>
      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <InfoRow label="Surname" value={userData.personal.surname} />
            <InfoRow
              label="Other Names"
              value={userData.personal.other_names}
            />
            <InfoRow label="Gender" value={userData.personal.gender} />
            <InfoRow
              label="Date of Birth"
              value={new Date(
                userData.personal.date_of_birth,
              ).toLocaleDateString()}
            />
            <InfoRow label="Country" value={userData.personal.country} />
            <InfoRow label="Region" value={userData.personal.region} />
            <InfoRow label="Religion" value={userData.personal.religion} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Programme Information</CardTitle>
          </CardHeader>
          <CardContent>
            <InfoRow label="Student ID" value={userData.programme.studentId} />
            <InfoRow label="Index No." value={userData.programme.indexNo} />
            <InfoRow
              label="Programme Stream"
              value={userData.programme.programme_stream}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <InfoRow
              label="E mail (s)"
              value={`${userData.contact.personal_email}, ${userData.contact.school_email}`}
            />
            <InfoRow
              label="Mobile Number(s)"
              value={`${userData.contact.knust_mobile}, ${userData.contact.personal_mobile}, ${userData.contact.alt_personal_mobile}`}
            />
            <InfoRow
              label="Postal Address"
              value={userData.contact.postal_address}
            />
            <InfoRow
              label="Residential Address"
              value={userData.contact.residential_address}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


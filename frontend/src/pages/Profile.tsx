import Loading from "@/components/Loading";
import useGetProfile from "@/hooks/profile/useGetProfile";
import {
  Card,
  Grid,
  GridItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text
} from "@chakra-ui/react";

const Profile = () => {
  const { isLoading, data, error } = useGetProfile();

  if (isLoading) return <Loading />;

  if (error) return <h1>Couldn't load</h1>;

  const { personal, programme, contact } = data?.user_data!;

  return (
    <Tabs>
      <TabList>
        <Tab>Personal</Tab>
        <Tab>Contact</Tab>
        <Tab>Programme</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Grid templateColumns="repeat(2, 1fr)" gap={2}>
            <DataCard
              title={"Name"}
              subtitle={`${personal.surname}, ${personal.other_names}`}
            />
            <DataCard title={"Username"} subtitle={`${personal.username}`} />
          </Grid>

          <Grid templateColumns="repeat(2, 1fr)" gap={2}>
            <DataCard title={"Gender"} subtitle={`${personal.gender}`} />
            <DataCard
              title={"Date of Birth"}
              subtitle={`${personal.date_of_birth}`}
            />
          </Grid>

          <Grid templateColumns="repeat(3, 1fr)" gap={2}>
            <DataCard title={"Region"} subtitle={`${personal.region}`} />
            <DataCard title={"Religion"} subtitle={`${personal.religion}`} />
            <DataCard title={"Country"} subtitle={`${personal.country}`} />
          </Grid>
        </TabPanel>
        <TabPanel>
          <Grid templateColumns="repeat(2, 1fr)" gap={2}>
            <DataCard
              title={"School Email"}
              subtitle={`${contact.school_email}`}
            />
            <DataCard
              title={"Personal Email"}
              subtitle={`${contact.personal_email}`}
            />
          </Grid>

          <Grid templateColumns="repeat(2, 1fr)" gap={2}>
            <DataCard
              title={"KNUST Number"}
              subtitle={`${contact.knust_mobile}`}
            />
            <DataCard
              title={"Personal Number"}
              subtitle={`${contact.personal_mobile}`}
            />
          </Grid>

          <Grid templateColumns="repeat(2, 1fr)" gap={2}>
            <DataCard
              title={"Postal Address"}
              subtitle={`${contact.postal_address}`}
            />
            <DataCard
              title={"Residential Address"}
              subtitle={`${contact.residential_address}`}
            />
          </Grid>
        </TabPanel>
        <TabPanel>
          <Grid templateColumns="repeat(3, 1fr)" gap={2}>
            <DataCard
              title={"Index Number"}
              subtitle={`${programme.indexNo}`}
            />
            <DataCard
              title={"Programme"}
              subtitle={`${programme.programme_stream}`}
            />
            <DataCard
              title={"Student ID"}
              subtitle={`${programme.studentId}`}
            />
          </Grid>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
export default Profile;

const DataCard = ({ title, subtitle }: { title: string; subtitle: string }) => {
  return (
    <GridItem className="shadow-md m-4">
      <Card className="p-4">
        <Text className="text-gray-500">{title}</Text>
        <Text className="font-bold">{subtitle}</Text>
      </Card>
    </GridItem>
  );
};

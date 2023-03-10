import CustomModal from "@/pages/modal";
import { Button, Grid, Link, Spacer, Text } from "@nextui-org/react";
import { useState } from "react";
import Categories from "./categories";
import ProfileMenu from "./profileMenu";

export default function Sidebar({ session, feeds }) {
  const [visible, setVisible] = useState(false);

  return (
    <Grid.Container xs={12} gap={1} alignItems="flex-start" justify="center">
      <ProfileMenu session={session} />
      <Grid>
        <Button rounded onPress={() => setVisible(true)}>
          <Text b>Add feed +</Text>
        </Button>
      </Grid>
      <CustomModal visible={visible} closeHandler={() => setVisible(false)} />
      <Categories />
      <Grid css={{ alignSelf: "flex-end" }}>
        <Text>
          Made by <Link href="http://hasan.one/">Hasan</Link>
        </Text>
      </Grid>
    </Grid.Container>
  );
}

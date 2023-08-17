import { Cash, CashGame } from "@src/utils";
import { Grid, Card, Metric, Flex, BadgeDelta, Text } from "@tremor/react";
import { FC } from "react";

interface OverviewProps {
  games: Cash[];
}

const Overview: FC<OverviewProps> = ({ games }) => {
  const length = games.length !== 0 ? games.length : 1;
  return (
    <Grid numItemsMd={2} numItemsLg={4} className="gap-6 mt-6">
      <Card className="">
        <Text className="text-3xl">Net Total</Text>
        <Metric className="truncate">
          $ {games.reduce((a, b) => a + b.net, 0).toLocaleString()}
        </Metric>
      </Card>
      <Card>
        <Text className="text-3xl">{"BBs/100hand"}</Text>
        <Metric className="truncate">
          {((games.reduce((a, b) => a + b.bbIn100, 0) * 100) / length).toFixed(
            2
          )}
          BB
        </Metric>
      </Card>
      <Card>
        <Text className="text-3xl">{"Hand Player/ Hand Count"}</Text>
        <Metric className="truncate">
          {games.reduce((a, b) => a + b.handPlayed, 0).toLocaleString()}/
          {games.reduce((a, b) => a + b.handCount, 0).toLocaleString()}
        </Metric>
      </Card>
      <Card>
        <Text className="text-3xl">VPIP</Text>
        <Metric className="truncate">
          {((games.reduce((a, b) => a + b.vpip, 0) * 100) / length).toFixed(2)}%
        </Metric>
      </Card>
    </Grid>
  );
};

export default Overview;

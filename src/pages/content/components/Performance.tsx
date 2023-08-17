import { Cash } from "@src/utils";
import {
  Card,
  Flex,
  Title,
  Icon,
  Text,
  Tab,
  TabGroup,
  TabList,
  TabPanels,
  TabPanel,
  LineChart,
  AreaChart,
  BarChart,
} from "@tremor/react";
import { FC, useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/solid";

interface PerformanceProps {
  games: Cash[];
}

const Metrics = {
  NetTotal: "net",
  vpip: "vpip",
  bbIn100: "bbIn100",
};

const metricsList = [Metrics.NetTotal, Metrics.vpip];

function netCumSum(games: Cash[]): {
  date: Date;
  net: number;
}[] {
  let result = [];
  if (games.length !== 0) {
    for (let i = 0; i <= games.length; i++) {
      let previousNet = i === 0 ? 0 : result[i - 1].net;
      let currentNet = games[i]?.net ? games[i].net : 0;
      let res = previousNet + currentNet;
      result.push({
        date: new Date(games[i]?.date).toLocaleDateString(),
        net: res,
        zero: 0,
      });
    }
  }
  return result;
}

const formatGamesDate = (games) => {
  return games.map((game) => ({
    ...game,
    date: new Date(game.date).toLocaleDateString(),
  }));
};

const Performance: FC<PerformanceProps> = ({ games }) => {
  return (
    <Card>
      <>
        <div className="md:flex justify-between">
          <div>
            <Flex
              className="space-x-0.5"
              justifyContent="start"
              alignItems="center"
            >
              <Title> Performance History </Title>
            </Flex>
          </div>
        </div>
        <div>
          <TabGroup>
            <TabList color="gray" variant="solid">
              <Tab>$</Tab>
              <Tab>vpip</Tab>
              <Tab>bb</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Card>
                  <Title>Total Net</Title>
                  <LineChart
                    data={netCumSum(games)}
                    index="date"
                    categories={["net", "zero"]}
                    colors={["blue", "red"]}
                    showTooltip={false}
                  />
                </Card>
              </TabPanel>
              <TabPanel>
                {" "}
                <Card>
                  <Title>VPIP detail</Title>
                  <AreaChart
                    data={formatGamesDate(games)}
                    index="date"
                    categories={["vpip", "bbIn100"]}
                    colors={["blue", "red"]}
                    valueFormatter={(number: number) =>
                      `${(number * 100).toFixed(2)}`
                    }
                  />
                </Card>
              </TabPanel>
              <TabPanel>
                {" "}
                <Card>
                  <Title>VPIP detail</Title>
                  <BarChart
                    data={formatGamesDate(games)}
                    index="date"
                    categories={["net"]}
                    colors={["blue", "red"]}
                    valueFormatter={(number: number) =>
                      `${number.toLocaleString()}`
                    }
                    yAxisWidth={28}
                  />
                </Card>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </>
    </Card>
  );
};

export default Performance;

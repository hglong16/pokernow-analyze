import {
  Card,
  Grid,
  Title,
  Text,
  Tab,
  TabList,
  TabGroup,
  TabPanel,
  TabPanels,
  LineChart,
  BarChart,
} from "@tremor/react";
import { DashboardHeader, Net } from "../DashboardHeader";
import {
  calculateBBIn100,
  calculateNet,
  calculateVPIP,
  formatData,
  getNetByMonth,
} from "@src/utils";

export default function App() {
  const data = JSON.parse(window.localStorage.getItem("/games"))?.games;
  const cashGame = data?.filter((game) => game.gameType !== "mtt");
  const dataByMonth = getNetByMonth(cashGame);
  const dataByDay = formatData(cashGame);
  const net = calculateNet(dataByMonth);
  const vpip = calculateVPIP(dataByMonth);
  const bbIn100 = calculateBBIn100(dataByMonth);
  return (
    <main className="px-2 py-2">
      <Title>Poker Now Dashboard</Title>

      <TabGroup className="mt-6">
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Detail</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <DashboardHeader net={net} vpip={vpip} bbIn100={bbIn100} />
            <div className="mt-6">
              <Card>
                <LineChart
                  data={dataByDay}
                  categories={["net" ]}
                  colors={["blue", "gray", "slate"]}
                  index={"dayString"}
                  
                />
              </Card>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="mt-6">
              <Card>
                <div className="h-96" />
              </Card>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </main>
  );
}

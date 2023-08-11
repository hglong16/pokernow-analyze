import {
  BadgeDelta,
  Card,
  DeltaType,
  Flex,
  Grid,
  Metric,
  Text,
} from "@tremor/react";

export type Net = {
  title: string;
  metric: string;
  delta: string;
  deltaType: DeltaType;
};

export type VPIP = {
  title: string;
  metric: string;
  delta: string;
  handPlayed: number,
  handCount: number,
  deltaType: DeltaType;
}

export type BbIn100 = {
  title: string,
  metric: string,
  handCount: number,
  delta: string,
  deltaType: DeltaType
}
type DashboardHeaderProps = {
  net: Net;
  vpip: VPIP;
  bbIn100: BbIn100;
};
export function DashboardHeader({ net, vpip, bbIn100 }: DashboardHeaderProps) {
  return (
    <Grid numItemsMd={3} numItemsLg={3} className="gap-6 mt-6">
      <Card className="">
        <Text className="text-3xl">
          {net.title}
        </Text>
        <Metric className="truncate">{net.metric}</Metric>
        <Flex alignItems="center" justifyContent="start" className="gap-1">
          <BadgeDelta deltaType={net.deltaType} size="xs"></BadgeDelta>
          <Text className="mb-0 text-2xl ">{net.delta}</Text>
        </Flex>
      </Card>
      <Card>
        <Text className="text-3xl">
          {vpip.title}
        </Text>
        <Metric className="truncate">{vpip.metric}</Metric>
        <Flex alignItems="center" justifyContent="start" className="gap-1">
          <BadgeDelta deltaType={vpip.deltaType} size="xs"></BadgeDelta>
          <Text className="mb-0 text-2xl ">{vpip.delta}</Text>
        </Flex>
      </Card>
      <Card>
        <Text className="text-3xl">
          {bbIn100.title}
        </Text>
        <Metric className="truncate">{bbIn100.metric}</Metric>
        <Flex alignItems="center" justifyContent="start" className="gap-1">
          <BadgeDelta deltaType={bbIn100.deltaType} size="xs"></BadgeDelta>
          <Text className="mb-0 text-2xl ">{bbIn100.delta}</Text>
        </Flex>
      </Card>
    </Grid>
  );
}

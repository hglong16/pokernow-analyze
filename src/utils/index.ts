import { Net } from "@src/pages/content/components/DashboardHeader";
import { DeltaType } from "@tremor/react";

const cashGameSample = {
  netLow: -237362,
  netHigh: 21691,
  gameId: "pgl7taxhIipUT6LetNVZ5Gj5W/game",
  handsPlayed: 152,
  net: 21691,
  game: {
    handCount: 220,
    lastUpdateTs: 1690831352850,
    players: [
      "-G2HY4hGgz",
      "3gPDjs5JsR",
      "ARj5uuVDHl",
      "M5pYioIUAP",
      "OeSjkd85_S",
      "S9UrMUmXDh",
      "T_dc1V_E-f",
      "Uo6pFr238T",
      "chh6wDucC6",
      "e3qRwayJ-c",
      "i4leAelSqE",
      "o4eQUcZdZs",
      "qtoA_h5ELp",
      "s9xuHz8P0x",
    ],
    firstHandTs: 1690802756180,
    names:
      "Linh Le, Én, LonLon, SONIK B, longlanh, Mr B, véttơ, UWU, Luke Đặng, Tobicontinue, alfred, Toniqhz, VAT, HieuNe, Long",
    playerCount: 14,
    lastHandTs: 1690827330541,
    gameType: "ring",
    cents: 0,
    gameId: "pgl7taxhIipUT6LetNVZ5Gj5W/game",
  },
};
export type CashGame = typeof cashGameSample;
export type DataCashMonth = {
  month: number;
  year: number;
  net: number;
  vpip: number;
  bbIn100: number;
  handPlayed: number;
  handCount: number;
};
export function getNetByMonth(games: CashGame[]) {
  const res: DataCashMonth[] = [];
  games.map((game) => {
    const date = ( new Date(game.game.lastHandTs) );
    const month = date.getMonth();
    const year = date.getFullYear();
    const net = game.net;
    const handPlayed = game.handsPlayed;
    const handCount = game.game.handCount;
    const data = res.find((d) => d.month === month && d.year === year);
    const vpip = handPlayed / handCount;
    const bbIn100 = net / 1000 / handCount;
    if (data) {
      data.net += net;
      data.handPlayed += handPlayed;
      data.handCount += handCount;
    } else {
      res.push({
        month,
        year,
        net,
        handPlayed,
        handCount,
        vpip,
        bbIn100,
      });
    }
  });

  res.sort((a, b) => (a.year - b.year) * 12 + (a.month - b.month));
  return res;
}

export function formatData(games: CashGame[]) {
  const res = games.map((data) => {
  const date = new Date(data.game.lastHandTs);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const dayString = `${day}/${month}`
  const net = data.net;
  const handPlayed = data.handsPlayed;
  const handCount = data.game.handCount;
  const vpip = handPlayed / handCount;
  const bbIn100 = net / 1000 / handCount;
  const firstHandTs = data.game.firstHandTs;
  return {
    month,
    year,
    date,
    dayString,
    net,
    handPlayed,
    handCount,
    vpip,
    bbIn100,
    firstHandTs
  };

}) 
  // sort res by date
  res.sort((a,b ) => a.firstHandTs - b.firstHandTs)
  return res;
}
export function calculateNet(games: DataCashMonth[]): Net {
  const net = games.reduce((pre, cur) => pre + cur.net, 0);
  const currentMonth = games[0];
  const lastMonth = games[games.length - 1]
    ? games[games.length - 1]
    : currentMonth;
  const delta = (
    ((currentMonth.net - lastMonth.net) / lastMonth.net) *
    100
  ).toFixed(2);

  return {
    title: "Net",
    metric: `$ ${net}`,
    delta: `${delta}%`,
    deltaType:
      currentMonth.net - lastMonth.net > 0
        ? "moderateIncrease"
        : "moderateDecrease",
  };
}

export function calculateVPIP(games: DataCashMonth[]) {
  const handPlayed = games.reduce((pre, cur) => pre + cur.handPlayed, 0);
  const handCount = games.reduce((pre, cur) => pre + cur.handCount, 0);
  const metric = ((handPlayed / handCount) * 100).toFixed(2);
  const currentMonth = games[0];
  const lastMonth = games[games.length - 1]
  const vpipLastMonth = lastMonth.vpip
  const vpipCurrentMonth = currentMonth.vpip
  const delta = ((vpipCurrentMonth - vpipLastMonth) / vpipLastMonth * 100).toFixed(2);
  const deltaType = vpipCurrentMonth - vpipLastMonth > 0 ? "moderateIncrease" : "moderateDecrease";
  console.log(vpipCurrentMonth, vpipLastMonth, delta)
  return {
    title: "VPIP",
    metric: `${metric}%`,
    delta: `${delta}%`,
    deltaType: deltaType as DeltaType,
    handCount,
    handPlayed
  }
}

export function calculateBBIn100(games: DataCashMonth[]) {
  const net = games.reduce((pre, cur) => pre + cur.net, 0);
  const handCount = games.reduce((pre, cur) => pre + cur.handCount, 0);
  const metric = ((net / 1000 / handCount) * 100).toFixed(2);
  const currentMonth = games[0];
  const lastMonth = games[games.length - 1]
  const bbLastMonth = lastMonth.bbIn100
  const bbCurrentMonth = currentMonth.bbIn100
  const delta = ((bbCurrentMonth - bbLastMonth) / bbLastMonth * 100).toFixed(2);
  const deltaType = bbCurrentMonth - bbLastMonth > 0 ? "moderateIncrease" : "moderateDecrease";
  return {
    title: "BB/100",
    metric: `${metric}bb/100hands`,
    delta: `${delta}%`,
    deltaType: deltaType as DeltaType,
    handCount
  }
}

import { formatData } from "@src/utils";
import { Flex, Title } from "@tremor/react";
import {
  DateRangePicker,
  DateRangePickerItem,
  DateRangePickerValue,
} from "@tremor/react";
import { useEffect, useState } from "react";
import Overview from "../Overview";
import Performance from "../Performance";

export default function App() {
  const [dateRange, setDateRange] = useState<DateRangePickerValue>({
    from: new Date(2023, 1, 1),
    to: new Date(),
  });

  console.log({dateRange})
  let cashGameRaw = cashGamesFilter();

  const [cashGames, setCashGames] = useState(cashGameRaw);

  useEffect(() => {
    setCashGames(
      cashGameRaw.filter(
        (game) => { 
          const from = dateRange.from ? dateRange.from : new Date();
          const to = dateRange.to ? dateRange.to : dateRange.from;
          
          return game.date >= from && game.date <= new Date(to.setUTCHours(23,59,59,999)) 
        
        }
      )
    );
  }, [dateRange]);


  return (
    <main className="px-2 py-2">
      <Flex alignItems="center" justifyContent="between">
        <Title className="!text-3xl !font-black !tracking-tighter !text-slate-900">
          Dashboard
        </Title>
        <DateRangePicker
          className=""
          value={dateRange}
          onValueChange={setDateRange}
          color="slate"
        />
      </Flex>
      {cashGames.length} {cashGames.length > 1 ? "games" : "game"} found.
      <div className="mt-6">
        <Overview games={cashGames}/>
        <div className="mt-6">
          <Performance games={cashGames}/>
        </div>
      </div>
    </main>
  );
}

const cashGamesFilter = () => {
  const allGame = JSON.parse(window.localStorage.getItem("/games"));
  const cashGameRaw = allGame['games']?.filter((game) => game.gameType !== "mtt");
  let cashGame = formatData(cashGameRaw);

  return cashGame;
};

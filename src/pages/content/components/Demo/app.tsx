import { Flex, Title } from "@tremor/react";
import {  DateRangePicker,DateRangePickerItem, DateRangePickerValue } from "@tremor/react";
import { useState } from "react";

export default function App() {
  const [dateRange, setDateRange] = useState<DateRangePickerValue>({
    from: new Date(2023,1,1),
    to: new Date()
  })
  return (
    <main className="px-2 py-2">
      <Flex alignItems="center" justifyContent="between">
        <Title className="text-3xl text-slate-900">Dashboard</Title>
        <DateRangePicker
        className=""
        value={dateRange}
        onValueChange={setDateRange}
        color="slate"
         />
      </Flex>
    </main>
  );
}

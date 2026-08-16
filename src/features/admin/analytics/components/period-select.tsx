import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnalyticsPeriod } from "../type/analytics-types";


type PeriodSelectProps = {
  value: AnalyticsPeriod;
  onChange: (value: AnalyticsPeriod) => void;
};

function isAnalyticsPeriod(value: string): value is AnalyticsPeriod {
  return value === "day" || value === "month" || value === "year";
}

export default function PeriodSelect({
  value,
  onChange,
}: PeriodSelectProps) {
  const handleValueChange = (selectedValue: string) => {
    if (isAnalyticsPeriod(selectedValue)) {
      onChange(selectedValue);
    }
  };

  return (
    <Select value={value} onValueChange={handleValueChange}>
      <SelectTrigger
        aria-label="Select analytics period"
        className="w-32"
      >
        <SelectValue placeholder="Select period" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="day">Day</SelectItem>
        <SelectItem value="month">Month</SelectItem>
        <SelectItem value="year">Year</SelectItem>
      </SelectContent>
    </Select>
  );
}
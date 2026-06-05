import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

interface WasteSummaryCardProps {
  totalWaste: number;
}

export const WasteSummaryCard = ({ totalWaste }: WasteSummaryCardProps) => {
  return (
    <Card>
      <CardHeader>Waste Summary</CardHeader>
      <CardContent className="flex flex-col gap-2 text-sm">
        <p className="text-text-main">Total Waste: {totalWaste} units</p>
      </CardContent>
      <CardFooter>
        <p className="text-muted-foreground text-xs">Updated live</p>
      </CardFooter>
    </Card>
  );
};
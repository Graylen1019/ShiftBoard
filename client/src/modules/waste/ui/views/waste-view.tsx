import { useEffect, useState } from 'react';
import { useShiftStore } from '@/store/shift-store';
import { getWasteEntriesByShift } from '@/services/api';
import { WasteEntryForm } from '../components/waste-entry-form';
import { WasteEntryItem } from '../components/waste-entry-item';
import { WasteSkeleton } from '../components/waste-skeleton';
import { Card, CardContent } from '@/components/ui/card';

const CATEGORIES = ['food', 'beverage', 'packaging', 'other'];

export const WasteView = () => {
  const { currentShift, wasteEntries, setWasteEntries } = useShiftStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (currentShift) {
      getWasteEntriesByShift(currentShift._id)
        .then((res) => setWasteEntries(res.data.entries))
        .finally(() => setIsLoading(false));
    }
  }, [currentShift, setWasteEntries]);

  if (isLoading) return <WasteSkeleton />;

  const totalByCategory = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = wasteEntries
      .filter((e) => e.category === cat)
      .reduce((sum, e) => sum + e.quantity, 0);
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="px-6 py-10 max-w-4xl mx-auto flex flex-col gap-y-8">
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl font-bold text-text-main tracking-tight">Waste Log</h1>
        <p className="text-xs text-muted-foreground mt-1">
          Log and track waste entries for the current shift.
        </p>
      </div>

      <WasteEntryForm shiftId={currentShift!._id} />

      <div className="grid grid-cols-4 gap-4">
        {CATEGORIES.map((cat) => (
          <Card key={cat}>
            <CardContent className="pt-4">
              <p className="text-xs text-muted-foreground uppercase tracking-widest">{cat}</p>
              <p className="text-2xl font-bold text-text-main mt-1">{totalByCategory[cat]}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col gap-y-2">
        {wasteEntries.length === 0 ? (
          <p className="text-muted-foreground text-sm">No waste entries yet.</p>
        ) : (
          wasteEntries.map((entry) => (
            <WasteEntryItem key={entry._id} entry={entry} />
          ))
        )}
      </div>
    </div>
  );
};
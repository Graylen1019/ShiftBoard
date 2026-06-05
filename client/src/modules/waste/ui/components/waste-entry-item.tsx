import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { deleteWasteEntry } from '@/services/api';
import { useShiftStore } from '@/store/shift-store';

interface WasteEntry {
  _id: string;
  item: string;
  quantity: number;
  unit: string;
  category: string;
  note?: string;
}

interface WasteEntryItemProps {
  entry: WasteEntry;
}

export const WasteEntryItem = ({ entry }: WasteEntryItemProps) => {
  const { removeWasteEntry } = useShiftStore();

  const handleDelete = async () => {
    try {
      await deleteWasteEntry(entry._id);
      removeWasteEntry(entry._id);
    } catch {
      console.error('Failed to delete entry');
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-panel-bg border border-border-color rounded-xl">
      <div className="flex flex-col gap-y-1">
        <p className="text-sm font-medium text-text-main">{entry.item}</p>
        <p className="text-xs text-muted-foreground">
          {entry.quantity} {entry.unit} · {entry.category}
          {entry.note ? ` · ${entry.note}` : ''}
        </p>
      </div>
      <Button
        size="sm"
        variant="ghost"
        onClick={handleDelete}
        className="text-destructive hover:text-destructive rounded-xl"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};
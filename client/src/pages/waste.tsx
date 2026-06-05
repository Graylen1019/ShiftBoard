import { useEffect, useState } from 'react';
import { useShiftStore } from '@/store/shift-store';
import { getWasteEntriesByShift, addWasteEntry, deleteWasteEntry } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2 } from 'lucide-react';

const CATEGORIES = ['food', 'condiments', 'paper', 'other'];
const UNITS = ['cases', 'sleeves', 'bags', 'oz', 'lbs'];

export const Waste = () => {
  const { currentShift, wasteEntries, setWasteEntries, addWasteEntry: addToStore, removeWasteEntry } = useShiftStore();

  const [category, setCategory] = useState('food');
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('portions');
  const [note, setNote] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentShift) {
      getWasteEntriesByShift(currentShift._id).then((res) => {
        setWasteEntries(res.data.entries);
      });
    }
  }, [currentShift, setWasteEntries]);

  const handleAddEntry = async () => {
    if (!item.trim()) { setError('Item name is required'); return; }
    if (!quantity || Number(quantity) <= 0) { setError('Quantity must be greater than zero'); return; }

    try {
      setIsLoading(true);
      setError(null);
      const res = await addWasteEntry(currentShift!._id, {
        category,
        item,
        quantity: Number(quantity),
        unit,
        note,
      });
      addToStore(res.data.entry);
      setItem('');
      setQuantity('');
      setNote('');
    } catch {
      setError('Failed to add waste entry.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (entryId: string) => {
    try {
      await deleteWasteEntry(entryId);
      removeWasteEntry(entryId);
    } catch {
      console.error('Failed to delete entry');
    }
  };

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

      <Card>
        <CardHeader>Log Waste Entry</CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Category</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Unit</label>
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Unit" />
                </SelectTrigger>
                <SelectContent>
                  {UNITS.map((u) => (
                    <SelectItem key={u} value={u}>{u}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Input
            placeholder="Item name (e.g. burger patties)"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />

          <Input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <Input
            placeholder="Note (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          {error && <p className="text-destructive text-sm">{error}</p>}

          <Button
            onClick={handleAddEntry}
            disabled={isLoading}
            className="rounded-xl"
          >
            {isLoading ? 'Adding...' : 'Add Entry'}
          </Button>
        </CardContent>
      </Card>

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
            <div
              key={entry._id}
              className="flex items-center justify-between p-4 bg-panel-bg border border-border-color rounded-xl"
            >
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
                onClick={() => handleDelete(entry._id)}
                className="text-destructive hover:text-destructive rounded-xl"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
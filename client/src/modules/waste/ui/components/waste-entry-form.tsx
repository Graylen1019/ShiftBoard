import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { addWasteEntry } from '@/services/api';
import { useShiftStore } from '@/store/shift-store';

const CATEGORIES = ['food', 'condiments', 'paper', 'other'];
const UNITS = ['lbs', 'oz', 'each', 'bag', 'sleeve', 'case'];

interface WasteEntryFormProps {
  shiftId: string;
}

export const WasteEntryForm = ({ shiftId }: WasteEntryFormProps) => {
  const { addWasteEntry: addToStore } = useShiftStore();
  const [category, setCategory] = useState('food');
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('lbs');
  const [note, setNote] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!item.trim()) { setError('Item name is required'); return; }
    if (!quantity || Number(quantity) <= 0) { setError('Quantity must be greater than zero'); return; }

    try {
      setIsLoading(true);
      setError(null);
      const res = await addWasteEntry(shiftId, {
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

  return (
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

        <Button onClick={handleSubmit} disabled={isLoading} className="rounded-xl">
          {isLoading ? 'Adding...' : 'Add Entry'}
        </Button>
      </CardContent>
    </Card>
  );
};
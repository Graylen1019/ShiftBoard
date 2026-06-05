import { useState } from 'react';
import { useShiftStore } from '@/store/shift-store';
import { closeShift, summarizeShift } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { CheckCircle2, Flag, SkipForward, Clipboard } from 'lucide-react';

export const Report = () => {
  const { currentShift, tasks, wasteEntries, setCurrentShift, clearShift } = useShiftStore();

  const [foodCostVariance, setFoodCostVariance] = useState('');
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const completedTasks = tasks.filter((t) => t.status === 'complete').length;
  const skippedTasks = tasks.filter((t) => t.status === 'skipped').length;
  const flaggedTasks = tasks.filter((t) => t.status === 'flagged');
  const completionRate = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;
  const totalWaste = wasteEntries.reduce((sum, e) => sum + e.quantity, 0);

  const wasteTotalsByCategory = wasteEntries.reduce((acc, entry) => {
    acc[entry.category] = (acc[entry.category] || 0) + entry.quantity;
    return acc;
  }, {} as Record<string, number>);

  const handleGetSummary = async () => {
    try {
      setIsLoadingSummary(true);
      const res = await summarizeShift(currentShift!._id);
      setAiSummary(res.data.summary);
    } catch {
      setError('Failed to get AI summary.');
    } finally {
      setIsLoadingSummary(false);
    }
  };

  const handleCloseShift = async () => {
    try {
      setIsClosing(true);
      const res = await closeShift(currentShift!._id, Number(foodCostVariance) || 0);
      setCurrentShift(res.data.shift);
      setIsClosed(true);
    } catch {
      setError('Failed to close shift.');
    } finally {
      setIsClosing(false);
    }
  };

  const handleCopyReport = () => {
    const report = `
SHIFT REPORT
Manager: ${currentShift?.managerName}
Date: ${currentShift?.date ? new Date(currentShift.date).toLocaleDateString() : ''}
Duration: ${currentShift?.startTime ? new Date(currentShift.startTime).toLocaleTimeString() : ''} - ${currentShift?.endTime ? new Date(currentShift.endTime).toLocaleTimeString() : ''}

TASKS
Completion Rate: ${completionRate}%
Completed: ${completedTasks} | Skipped: ${skippedTasks} | Flagged: ${flaggedTasks.length}

WASTE
Total: ${totalWaste}
${Object.entries(wasteTotalsByCategory).map(([cat, total]) => `${cat}: ${total}`).join('\n')}

FOOD COST VARIANCE: ${currentShift?.foodCostVariance ?? 'N/A'}

${aiSummary ? `AI SUMMARY:\n${aiSummary}` : ''}
    `.trim();

    navigator.clipboard.writeText(report);
  };

  return (
    <div className="px-6 py-10 max-w-4xl mx-auto flex flex-col gap-y-8">
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl font-bold text-text-main tracking-tight">Shift Report</h1>
        <p className="text-xs text-muted-foreground mt-1">
          Review and close the current shift.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground uppercase tracking-widest">Completion Rate</p>
            <p className="text-3xl font-bold text-text-main mt-1">{completionRate}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground uppercase tracking-widest">Total Waste</p>
            <p className="text-3xl font-bold text-text-main mt-1">{totalWaste}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground uppercase tracking-widest">Flagged Tasks</p>
            <p className="text-3xl font-bold text-destructive mt-1">{flaggedTasks.length}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>Task Summary</CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm text-text-main">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            <span>{completedTasks} completed</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-text-main">
            <SkipForward className="h-4 w-4 text-muted-foreground" />
            <span>{skippedTasks} skipped</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-text-main">
            <Flag className="h-4 w-4 text-destructive" />
            <span>{flaggedTasks.length} flagged</span>
          </div>
          {flaggedTasks.length > 0 && (
            <div className="mt-2 flex flex-col gap-1">
              {flaggedTasks.map((t) => (
                <p key={t._id} className="text-xs text-destructive border border-destructive/30 rounded-lg px-3 py-1">
                  {t.description}
                </p>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>Waste by Category</CardHeader>
        <CardContent className="flex flex-col gap-2">
          {Object.entries(wasteTotalsByCategory).length === 0 ? (
            <p className="text-muted-foreground text-sm">No waste entries logged.</p>
          ) : (
            Object.entries(wasteTotalsByCategory).map(([cat, total]) => (
              <div key={cat} className="flex justify-between text-sm">
                <span className="text-muted-foreground capitalize">{cat}</span>
                <span className="text-text-main font-medium">{total}</span>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>AI Shift Summary</CardHeader>
        <CardContent className="flex flex-col gap-4">
          {aiSummary ? (
            <p className="text-sm text-text-main leading-relaxed">{aiSummary}</p>
          ) : (
            <p className="text-sm text-muted-foreground">No summary generated yet.</p>
          )}
          <Button
            onClick={handleGetSummary}
            disabled={isLoadingSummary}
            variant="outline"
            className="rounded-xl"
          >
            {isLoadingSummary ? 'Generating...' : 'Generate AI Summary'}
          </Button>
        </CardContent>
      </Card>

      {!isClosed ? (
        <Card>
          <CardHeader>Close Shift</CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Food Cost Variance</label>
              <Input
                type="number"
                placeholder="Enter food cost variance"
                value={foodCostVariance}
                onChange={(e) => setFoodCostVariance(e.target.value)}
              />
            </div>
            {error && <p className="text-destructive text-sm">{error}</p>}
            <Button
              onClick={handleCloseShift}
              disabled={isClosing}
              variant="destructive"
              className="rounded-xl"
            >
              {isClosing ? 'Closing Shift...' : 'Close Shift'}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="pt-4 flex flex-col gap-4">
            <p className="text-text-main font-medium">Shift closed successfully.</p>
            <div className="flex gap-4">
              <Button
                onClick={handleCopyReport}
                variant="outline"
                className="rounded-xl gap-2"
              >
                <Clipboard className="h-4 w-4" /> Copy Report
              </Button>
              <Button
                onClick={clearShift}
                className="rounded-xl"
              >
                Start New Shift
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
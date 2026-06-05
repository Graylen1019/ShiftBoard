import { useState } from 'react';
import { useSettingsStore } from '@/store/settings-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Plus } from 'lucide-react';

const CATEGORIES = ['opening', 'mid-shift', 'temperature checks', 'closing'] as const;

export const SettingsView = () => {
  const {
    // theme, setTheme,
    managerName, setManagerName,
    location, setLocation,
    taskTemplates, addTaskTemplate, removeTaskTemplate,
  } = useSettingsStore();

  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState<typeof CATEGORIES[number]>('opening');
  const [profileSaved, setProfileSaved] = useState(false);

  const handleSaveProfile = () => {
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2000);
  };

  const handleAddTemplate = () => {
    if (!newTaskDescription.trim()) return;
    addTaskTemplate({
      id: Date.now().toString(),
      category: newTaskCategory,
      description: newTaskDescription,
    });
    setNewTaskDescription('');
  };

  return (
    <div className="px-6 py-10 max-w-4xl mx-auto flex flex-col gap-y-8">
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl font-bold text-text-main tracking-tight">Settings</h1>
        <p className="text-xs text-muted-foreground mt-1">
          Manage your preferences and shift templates.
        </p>
      </div>

      {/* <Card>
        <CardHeader>Appearance</CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Theme</label>
            <Select value={theme} onValueChange={(v) => setTheme(v as 'dark' | 'light')}>
              <SelectTrigger className="rounded-xl w-48">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="light">Light</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card> */}

      <Card>
        <CardHeader>Manager Profile</CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Name</label>
            <Input
              placeholder="Your name"
              value={managerName}
              onChange={(e) => setManagerName(e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Location / Restaurant</label>
            <Input
              placeholder="e.g. Downtown Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <Button onClick={handleSaveProfile} className="rounded-xl w-fit">
            {profileSaved ? 'Saved!' : 'Save Profile'}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>Task Templates</CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex gap-3">
            <Select value={newTaskCategory} onValueChange={(v) => setNewTaskCategory(v as typeof CATEGORIES[number])}>
              <SelectTrigger className="rounded-xl w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="Task description"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
            />
            <Button onClick={handleAddTemplate} className="rounded-xl shrink-0">
              <Plus className="h-4 w-4 mr-1" /> Add
            </Button>
          </div>

          <div className="flex flex-col gap-y-2">
            {CATEGORIES.map((category) => {
              const categoryTemplates = taskTemplates.filter((t) => t.category === category);
              if (categoryTemplates.length === 0) return null;
              return (
                <div key={category}>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">{category}</p>
                  {categoryTemplates.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-3 bg-panel-bg border border-border-color rounded-xl mb-1">
                      <p className="text-sm text-text-main">{task.description}</p>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeTaskTemplate(task.id)}
                        className="text-destructive hover:text-destructive rounded-xl"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
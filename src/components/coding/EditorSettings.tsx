import { Settings, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface EditorSettingsState {
  fontSize: number;
  tabSize: number;
  wordWrap: boolean;
  lineNumbers: boolean;
  minimap: boolean;
  fontFamily: string;
}

interface EditorSettingsProps {
  settings: EditorSettingsState;
  onChange: (settings: EditorSettingsState) => void;
}

const fontFamilies = [
  { value: 'JetBrains Mono, monospace', label: 'JetBrains Mono' },
  { value: 'Fira Code, monospace', label: 'Fira Code' },
  { value: 'Consolas, monospace', label: 'Consolas' },
  { value: 'Monaco, monospace', label: 'Monaco' },
  { value: 'Source Code Pro, monospace', label: 'Source Code Pro' },
];

export const defaultEditorSettings: EditorSettingsState = {
  fontSize: 14,
  tabSize: 2,
  wordWrap: true,
  lineNumbers: true,
  minimap: false,
  fontFamily: 'JetBrains Mono, monospace',
};

const EditorSettings = ({ settings, onChange }: EditorSettingsProps) => {
  const updateSetting = <K extends keyof EditorSettingsState>(
    key: K,
    value: EditorSettingsState[K]
  ) => {
    onChange({ ...settings, [key]: value });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Settings className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end">
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Editor Settings</h4>
          
          {/* Font Size */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs">Font Size</Label>
              <span className="text-xs text-muted-foreground">{settings.fontSize}px</span>
            </div>
            <Slider
              value={[settings.fontSize]}
              onValueChange={([value]) => updateSetting('fontSize', value)}
              min={10}
              max={24}
              step={1}
            />
          </div>

          {/* Tab Size */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs">Tab Size</Label>
              <span className="text-xs text-muted-foreground">{settings.tabSize} spaces</span>
            </div>
            <Slider
              value={[settings.tabSize]}
              onValueChange={([value]) => updateSetting('tabSize', value)}
              min={2}
              max={8}
              step={2}
            />
          </div>

          {/* Font Family */}
          <div className="space-y-2">
            <Label className="text-xs">Font Family</Label>
            <Select
              value={settings.fontFamily}
              onValueChange={(value) => updateSetting('fontFamily', value)}
            >
              <SelectTrigger className="h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {fontFamilies.map((font) => (
                  <SelectItem key={font.value} value={font.value}>
                    <span style={{ fontFamily: font.value }}>{font.label}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Toggles */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-xs">Word Wrap</Label>
              <Switch
                checked={settings.wordWrap}
                onCheckedChange={(checked) => updateSetting('wordWrap', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-xs">Line Numbers</Label>
              <Switch
                checked={settings.lineNumbers}
                onCheckedChange={(checked) => updateSetting('lineNumbers', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-xs">Minimap</Label>
              <Switch
                checked={settings.minimap}
                onCheckedChange={(checked) => updateSetting('minimap', checked)}
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default EditorSettings;

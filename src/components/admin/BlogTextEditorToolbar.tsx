
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Bold, 
  Italic, 
  Underline, 
  Link, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  List, 
  ListOrdered, 
  Heading1, 
  Heading2, 
  Heading3, 
  Quote,
  Table, 
  Palette, 
  Code, 
  Subscript, 
  Superscript, 
  Strikethrough
} from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface BlogTextEditorToolbarProps {
  onFormatText: (formatType: string, formatValue?: string) => void;
}

const TextColors = [
  { name: 'Default', color: 'currentColor' },
  { name: 'Gray', color: '#6b7280' },
  { name: 'Red', color: '#ef4444' },
  { name: 'Orange', color: '#f97316' },
  { name: 'Amber', color: '#f59e0b' },
  { name: 'Yellow', color: '#eab308' },
  { name: 'Lime', color: '#84cc16' },
  { name: 'Green', color: '#22c55e' },
  { name: 'Emerald', color: '#10b981' },
  { name: 'Teal', color: '#14b8a6' },
  { name: 'Cyan', color: '#06b6d4' },
  { name: 'Sky', color: '#0ea5e9' },
  { name: 'Blue', color: '#3b82f6' },
  { name: 'Indigo', color: '#6366f1' },
  { name: 'Violet', color: '#8b5cf6' },
  { name: 'Purple', color: '#a855f7' },
  { name: 'Fuchsia', color: '#d946ef' },
  { name: 'Pink', color: '#ec4899' },
  { name: 'Rose', color: '#f43f5e' },
];

const BackgroundColors = [
  { name: 'Default', color: 'transparent' },
  { name: 'Gray', color: '#f3f4f6' },
  { name: 'Red', color: '#fee2e2' },
  { name: 'Orange', color: '#ffedd5' },
  { name: 'Amber', color: '#fef3c7' },
  { name: 'Yellow', color: '#fef9c3' },
  { name: 'Lime', color: '#ecfccb' },
  { name: 'Green', color: '#dcfce7' },
  { name: 'Emerald', color: '#d1fae5' },
  { name: 'Teal', color: '#ccfbf1' },
  { name: 'Cyan', color: '#cffafe' },
  { name: 'Sky', color: '#e0f2fe' },
  { name: 'Blue', color: '#dbeafe' },
  { name: 'Indigo', color: '#e0e7ff' },
  { name: 'Violet', color: '#ede9fe' },
  { name: 'Purple', color: '#f3e8ff' },
  { name: 'Fuchsia', color: '#fae8ff' },
  { name: 'Pink', color: '#fce7f3' },
  { name: 'Rose', color: '#ffe4e6' },
];

const BlogTextEditorToolbar: React.FC<BlogTextEditorToolbarProps> = ({ onFormatText }) => {
  const [showTableDialog, setShowTableDialog] = useState(false);
  const [tableRows, setTableRows] = useState(3);
  const [tableColumns, setTableColumns] = useState(3);

  const handleInsertLink = () => {
    const url = prompt('Enter the URL:');
    const text = prompt('Enter the link text:');
    
    if (url && text) {
      onFormatText('link', `[${text}](${url})`);
    }
  };

  const handleInsertTable = () => {
    const rows = tableRows;
    const columns = tableColumns;
    
    // Create markdown table
    let tableMarkdown = '\n';
    
    // Header row
    tableMarkdown += '| ';
    for (let col = 0; col < columns; col++) {
      tableMarkdown += `Column ${col + 1} | `;
    }
    tableMarkdown += '\n';
    
    // Separator row
    tableMarkdown += '| ';
    for (let col = 0; col < columns; col++) {
      tableMarkdown += '--- | ';
    }
    tableMarkdown += '\n';
    
    // Data rows
    for (let row = 0; row < rows; row++) {
      tableMarkdown += '| ';
      for (let col = 0; col < columns; col++) {
        tableMarkdown += `Cell ${row + 1}-${col + 1} | `;
      }
      tableMarkdown += '\n';
    }
    
    onFormatText('table', tableMarkdown);
    setShowTableDialog(false);
  };

  const handleColorSelect = (color: string, isBackground: boolean) => {
    const type = isBackground ? 'background-color' : 'color';
    // Pass just the style template, the formatting will be handled in the parent component
    // to properly handle selected text
    onFormatText('color', `<span style="${type}: ${color}">$SELECTED_TEXT$</span>`);
  };

  return (
    <div className="flex flex-wrap gap-1 p-2 bg-gray-100 dark:bg-gray-800 rounded-md mb-2">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => onFormatText('bold')}
        title="Bold"
      >
        <Bold className="h-4 w-4" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => onFormatText('italic')}
        title="Italic"
      >
        <Italic className="h-4 w-4" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => onFormatText('underline')}
        title="Underline"
      >
        <Underline className="h-4 w-4" />
      </Button>

      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => onFormatText('strikethrough')}
        title="Strikethrough"
      >
        <Strikethrough className="h-4 w-4" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={handleInsertLink}
        title="Insert Link"
      >
        <Link className="h-4 w-4" />
      </Button>

      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => onFormatText('code')}
        title="Code"
      >
        <Code className="h-4 w-4" />
      </Button>

      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => onFormatText('superscript')}
        title="Superscript"
      >
        <Superscript className="h-4 w-4" />
      </Button>

      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => onFormatText('subscript')}
        title="Subscript"
      >
        <Subscript className="h-4 w-4" />
      </Button>
      
      <span className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-1"></span>
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => onFormatText('heading', '# ')}
        title="Heading 1"
      >
        <Heading1 className="h-4 w-4" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => onFormatText('heading', '## ')}
        title="Heading 2"
      >
        <Heading2 className="h-4 w-4" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => onFormatText('heading', '### ')}
        title="Heading 3"
      >
        <Heading3 className="h-4 w-4" />
      </Button>
      
      <span className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-1"></span>
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => onFormatText('list', '- ')}
        title="Bullet List"
      >
        <List className="h-4 w-4" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => onFormatText('list', '1. ')}
        title="Numbered List"
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => onFormatText('quote', '> ')}
        title="Blockquote"
      >
        <Quote className="h-4 w-4" />
      </Button>
      
      <span className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-1"></span>
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => onFormatText('align', 'left')}
        title="Align Left"
      >
        <AlignLeft className="h-4 w-4" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => onFormatText('align', 'center')}
        title="Align Center"
      >
        <AlignCenter className="h-4 w-4" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => onFormatText('align', 'right')}
        title="Align Right"
      >
        <AlignRight className="h-4 w-4" />
      </Button>

      <span className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-1"></span>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" title="Colors">
            <Palette className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <Tabs defaultValue="text">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="text">Text Color</TabsTrigger>
              <TabsTrigger value="background">Background</TabsTrigger>
            </TabsList>
            <TabsContent value="text" className="mt-2">
              <div className="grid grid-cols-5 gap-2">
                {TextColors.map((color) => (
                  <Button
                    key={color.name}
                    variant="outline"
                    className="w-10 h-10 p-0"
                    style={{ color: color.color }}
                    title={color.name}
                    onClick={() => handleColorSelect(color.color, false)}
                  >
                    <span className="block w-6 h-6 rounded-full border" style={{ backgroundColor: color.color }} />
                  </Button>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="background" className="mt-2">
              <div className="grid grid-cols-5 gap-2">
                {BackgroundColors.map((color) => (
                  <Button
                    key={color.name}
                    variant="outline"
                    className="w-10 h-10 p-0"
                    title={color.name}
                    onClick={() => handleColorSelect(color.color, true)}
                  >
                    <span className="block w-6 h-6 rounded-full border" style={{ backgroundColor: color.color }} />
                  </Button>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" title="Insert Table">
            <Table className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <div className="space-y-4">
            <h4 className="font-medium">Insert Table</h4>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-sm text-gray-500">Rows</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={tableRows}
                  onChange={(e) => setTableRows(Number(e.target.value))}
                  className="w-full p-1 border rounded"
                />
              </div>
              <div>
                <label className="text-sm text-gray-500">Columns</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={tableColumns}
                  onChange={(e) => setTableColumns(Number(e.target.value))}
                  className="w-full p-1 border rounded"
                />
              </div>
            </div>
            <Button onClick={handleInsertTable} className="w-full">Insert Table</Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default BlogTextEditorToolbar;

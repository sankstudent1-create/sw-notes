import { Editor } from "@tiptap/react";
import { 
  Bold, Italic, Underline, Strikethrough, 
  Heading1, Heading2, Heading3, 
  List, ListOrdered, Quote, Code, 
  Undo, Redo, Image as ImageIcon, Mic, Calculator 
} from "lucide-react";
import clsx from "clsx";

interface ToolbarProps {
  editor: Editor | null;
}

export function Toolbar({ editor }: ToolbarProps) {
  if (!editor) return null;

  const ToolbarButton = ({ 
    onClick, 
    isActive = false, 
    disabled = false, 
    children,
    title
  }: { 
    onClick: () => void; 
    isActive?: boolean; 
    disabled?: boolean; 
    children: React.ReactNode;
    title: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={clsx(
        "p-2 rounded-md transition-colors",
        isActive ? "bg-[var(--accent)] text-white" : "text-[var(--text-secondary)] hover:bg-[var(--paper)] hover:text-[var(--text-primary)]",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      {children}
    </button>
  );

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b border-[var(--paper)] bg-[var(--card)]/80 backdrop-blur sticky top-14 z-20 shadow-sm rounded-t-[var(--radius-card)]">
      <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive("bold")} title="Bold">
        <Bold className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive("italic")} title="Italic">
        <Italic className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive("strike")} title="Strikethrough">
        <Strikethrough className="w-4 h-4" />
      </ToolbarButton>
      
      <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1"></div>

      <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive("heading", { level: 1 })} title="Heading 1">
        <Heading1 className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive("heading", { level: 2 })} title="Heading 2">
        <Heading2 className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive("heading", { level: 3 })} title="Heading 3">
        <Heading3 className="w-4 h-4" />
      </ToolbarButton>

      <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1"></div>

      <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive("bulletList")} title="Bullet List">
        <List className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive("orderedList")} title="Numbered List">
        <ListOrdered className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive("blockquote")} title="Quote">
        <Quote className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} isActive={editor.isActive("codeBlock")} title="Code Block">
        <Code className="w-4 h-4" />
      </ToolbarButton>

      <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1"></div>

      <ToolbarButton onClick={() => {}} title="Insert Math Equation">
        <Calculator className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => {}} title="Insert Image">
        <ImageIcon className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => {}} title="Voice Typing">
        <Mic className="w-4 h-4 text-[var(--terracotta)]" />
      </ToolbarButton>

      <div className="flex-1"></div>

      <ToolbarButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Undo">
        <Undo className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Redo">
        <Redo className="w-4 h-4" />
      </ToolbarButton>
    </div>
  );
}

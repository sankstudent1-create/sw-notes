"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Toolbar } from "./Toolbar";
import { useEffect } from "react";

interface RichEditorProps {
  content: string;
  onChange: (content: string) => void;
  editable?: boolean;
}

export function RichEditor({ content, onChange, editable = true }: RichEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      // Add more extensions later: Math, CodeBlock, Image
    ],
    content,
    editable,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose-base dark:prose-invert max-w-none focus:outline-none min-h-[500px]",
      },
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div className="w-full h-full flex flex-col bg-[var(--card)] rounded-[var(--radius-card)] shadow-[var(--shadow-soft)] overflow-hidden">
      {editable && <Toolbar editor={editor} />}
      <div className="flex-1 overflow-y-auto p-6 md:p-10 notebook-paper relative">
        <div className="notebook-margin hidden sm:block absolute left-10 top-0 bottom-0 w-0.5 bg-[var(--terracotta)]/40"></div>
        <div className="ml-0 sm:ml-12">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}

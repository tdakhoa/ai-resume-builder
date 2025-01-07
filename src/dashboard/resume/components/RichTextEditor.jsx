import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  BtnUndo,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { AIChatSession } from "@service/AIModal";
import { toast } from "sonner";
import { Brain, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const PROMPT =
  "position title: {positionTitle}, depends on position title give me 5-7 bullet points in a single paragraph in HTML format with <ul></ul> <li></li> for my experience in that position to add in resume, the attribute must be bulletPoints";

function RichTextEditor({ onRichTextEditorChange, index, defaultValue }) {
  const [value, setValue] = useState(defaultValue);
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const GenerateSummeryFromAI = async () => {
    setLoading(true);
    if (!resumeInfo.experience[index].title) {
      toast("Please add position title!");
      setLoading(false);
      return;
    }

    const prompt = PROMPT.replace(
      "{positionTitle}",
      resumeInfo.experience[index].title
    );

    try {
      const result = await AIChatSession.sendMessage(prompt);
      const textResponse = await result.response.text();

      const resp = JSON.parse(textResponse);
      if (
        !resp ||
        !resp.bulletPoints ||
        typeof resp.bulletPoints !== "string"
      ) {
        throw new Error("Invalid response format");
      }

      setValue(resp.bulletPoints);

      onRichTextEditorChange(resp.bulletPoints);
    } catch (error) {
      console.error(error);
      toast("Failed to generate summary from AI");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between my-2">
        <label className="text-sm">Summery</label>
        <Button
          className="flex gap-2 border-primary text-primary"
          variant="outline"
          size="sm"
          onClick={GenerateSummeryFromAI}
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <Brain className="h-4 w-4" />
              Generate from AI
            </>
          )}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          className="text-sm"
          value={value || ""}
          onChange={(e) => {
            setValue(e.target.value || "");
            onRichTextEditorChange(e.target.value);
          }}
        >
          <Toolbar>
            <BtnUndo />
            <BtnRedo />
            <Separator />
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
            <BtnClearFormatting />
            <Separator />
            <BtnStyles />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;

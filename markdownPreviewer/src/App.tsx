import { useState, useReducer, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import gfm from "remark-gfm";
import remarkbreaks from "remark-breaks";
import raw from "./assets/firstload.txt";

interface windowStateType {
  editor: boolean;
  preview: boolean;
}
enum windows {
  editor = "EDITOR",
  preview = "PREVIEW",
}

function App() {
  const [md, setMd] = useState<string>("");

  const [windowVisible, toggleWindow] = useReducer(
    (state: windowStateType, window: windows): windowStateType => {
      switch (window) {
        case "EDITOR":
          return {
            ...state,
            editor: state.preview ? !state.editor : state.editor,
          };
        case "PREVIEW":
          return {
            ...state,
            preview: state.editor ? !state.preview : state.preview,
          };
        default:
          return state;
      }
    },
    { editor: true, preview: true }
  );

  useEffect(() => {
    fetch(raw)
      .then((res) => res.text())
      .then((r) => setMd(r));
  }, []);

  /*
  TODO: 
  1. ☑️️︎ preview & editor底線對齊螢幕底邊
  2. show table borders
  3. show line numbers on the editor
  4. ☑️ add buttons to toggle preview & editor
  5. dark mode
  */

  return (
    <>
      <div className="hidden md:block w-full bg-zinc-800">
        <h3 className="text-slate-100 text-center font-poppins font-bold my-0 drop-shadow-lg">
          📝 Markdown Previewer
        </h3>
      </div>
      <div className="flex flex-col justify-center md:flex-row items-center lg:w-[95%] gap-x-4 mx-auto md:my-4 px-4 h-screen md:h-[calc(100vh-60px)] max-w-[1800px]">
        <button
          className={`${
            (!windowVisible.editor && "rotate-180 text-zinc-500") ||
            "text-zinc-300"
          } ${
            windowVisible.preview || "hidden"
          } h-fit transition hover:scale-125`}
          onClick={() => toggleWindow(windows.editor)}
          title={windowVisible.editor ? "hide editor" : "show editor"}
        >
          <span className="hidden md:inline">◀︎</span>
          <span className="md:hidden">▲</span>
        </button>
        <textarea
          className={`${windowVisible.editor ? "w-full" : "hidden"} ${
            windowVisible.preview ? "md:w-1/2 h-1/3 md:h-full max-h-[50vh] min-h-[250px]" : "md:w-2/3 h-full mt-4 md:mt-0"
          } border md:resize-none focus:outline-none rounded-md  font-mono md:text-sm text-xs dark:bg-slate-800 dark:text-white px-3 py-1 resize-y md:max-h-full shadow-lg placeholder:italic placeholder:text-slate-400`}
          placeholder="Enter your markdown here..."
          id="editor"
          value={md}
          onChange={(e) => setMd(e.target.value)}
        />

        <div
          id="preview"
          className={`${windowVisible.preview ? "block" : "hidden"} ${
            windowVisible.editor ? "h-2/3 md:w-1/2 mt-2 md:mt-0 md:h-full" : "h-full md:w-2/3 mb-4 md:mb-0"
          } font-poppins w-full text-sm lg:text-base rounded-md border px-3 shadow-lg overflow-auto`}
        >
          <ReactMarkdown
            children={md}
            remarkPlugins={[gfm, remarkbreaks]}
            components={{
              code({ inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    {...props}
                    children={String(children).replace(/\n$/, "")}
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    showLineNumbers
                  />
                ) : (
                  <code {...props} className={className}>
                    {children}
                  </code>
                );
              },
            }}
          />
        </div>
        <button
          className={`${
            (!windowVisible.preview && "rotate-180 text-zinc-500") ||
            "text-zinc-300"
          } ${windowVisible.editor || "hidden"} transition hover:scale-125`}
          onClick={() => toggleWindow(windows.preview)}
          title={windowVisible.preview ? "hide preview" : "show preview"}
        >
          <span className="hidden md:inline">▶</span>
          <span className="md:hidden">▼</span>
        </button>
      </div>
    </>
  );
}

export default App;

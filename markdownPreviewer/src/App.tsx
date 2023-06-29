import { useState, useReducer, useLayoutEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import gfm from "remark-gfm";
import remarkbreaks from "remark-breaks";
import ThemeToggle from "./components/ToggleTheme";

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

  useLayoutEffect(() => {
    (async () => {
      try {
        const response = await fetch("/firstload.md");
        const text = await response.text();
        setMd(text);
      } catch (e) {
        localStorage.getItem("firstload");
        console.log(e);
      }
    })();
  }, []);

  /*
  TODO: 
  1. ☑️️︎ preview & editor底線對齊螢幕底邊
  2. show table borders
  3. show line numbers on the editor
  4. ☑️ add buttons to toggle preview & editor
  5. ☑️ dark mode
  6. Vim mode
  7. word / character counter
  8. download utility
  */

  return (
    <>
      <div id="wrapper" className="dark:bg-neutral-800 w-full h-screen">
        <header className=" w-full bg-zinc-700">
          <div className="flex justify-center items-center text-slate-200 text-lg font-poppins font-bold my-0 drop-shadow-lg">
            <svg viewBox="0 0 24 24" className="h-8 w-8 fill-slate-100 pr-3">
              <path d="M22.27 19.385H1.73A1.73 1.73 0 010 17.655V6.345a1.73 1.73 0 011.73-1.73h20.54A1.73 1.73 0 0124 6.345v11.308a1.73 1.73 0 01-1.73 1.731zM5.769 15.923v-4.5l2.308 2.885 2.307-2.885v4.5h2.308V8.078h-2.308l-2.307 2.885-2.308-2.885H3.46v7.847zM21.232 12h-2.309V8.077h-2.307V12h-2.308l3.461 4.039z" />
            </svg>
            <span>Markdown Previewer</span>
            <ThemeToggle/>
          </div>
        </header>

        <div className="flex flex-col justify-between items-center md:flex-row lg:w-[95%] mx-auto md:my-4 px-4 h-[calc(100%-82px)] md:h-[calc(100%-64px)] max-w-[1800px]">
          <button
            className={`${
              (!windowVisible.editor && "rotate-180 text-zinc-500") ||
              "text-zinc-300"
            } ${
              windowVisible.preview || "opacity-0"
            } transition hover:scale-125`}
            onClick={() => toggleWindow(windows.editor)}
            title={windowVisible.editor ? "hide editor" : "show editor"}
            disabled={!windowVisible.preview}
          >
            <span className="hidden md:inline">◀︎</span>
            <span className="md:hidden">▲</span>
          </button>
          <div className="flex basis-11/12 flex-col md:flex-row justify-center items-center gap-x-4 gap-y-2 h-full w-full">
            <textarea
              className={`${windowVisible.editor ? "w-full" : "hidden"} ${
                windowVisible.preview
                  ? "basis:w-1/3 md:basis-1/2 md:h-full max-h-[50%] min-h-[30%]"
                  : "md:basis-2/3 h-screen"
              } border dark:border-gray-600 md:resize-none focus:outline-none rounded-md font-mono md:text-sm text-xs dark:bg-slate-800 dark:text-white px-3 py-1 resize-y md:max-h-full shadow-lg placeholder:italic placeholder:text-slate-400`}
              placeholder="Enter your markdown here..."
              id="editor"
              value={md}
              onChange={(e) => setMd(e.target.value)}
            />

            <div
              id="preview"
              className={`${windowVisible.preview ? "w-full" : "hidden"} ${
                windowVisible.editor
                  ? "basis-2/3 md:basis-1/2 md:h-full"
                  : "md:basis-2/3 h-full"
              } font-poppins text-sm lg:text-base rounded-md border dark:border-gray-600 px-3 shadow-lg overflow-auto dark:bg-neutral-700 dark:text-white`}
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
          </div>

          <button
            className={`${
              (!windowVisible.preview && "rotate-180 text-zinc-500") ||
              "text-zinc-300"
            } ${
              windowVisible.editor || "opacity-0"
            } transition hover:scale-125`}
            onClick={() => toggleWindow(windows.preview)}
            title={windowVisible.preview ? "hide preview" : "show preview"}
            disabled={!windowVisible.editor}
          >
            <span className="hidden md:inline">▶</span>
            <span className="md:hidden">▼</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default App;

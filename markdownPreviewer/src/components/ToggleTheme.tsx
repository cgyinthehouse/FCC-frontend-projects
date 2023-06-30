import useTheme from "../hooks/useTheme";

const ThemeToggle:React.FC = () => {
  const [dark, toggle] = useTheme();

  return (
    <button
      className={`hover:ring-yellow-200/50 hover:ring-2 transition-colors overflow-hidden h-6 w-6 space-y-[6px] text-xs relative left-[15%] md:left-[30%] rounded-full ${dark ? 'bg-neutral-800' : 'bg-neutral-500'}`}
      onClick={toggle}
    >
      <span className={`${dark ? "" : "-translate-y-[22px]"}  h-4 w-4 left-[4px] top-[4px] absolute transition`}>🌙</span>
      <span className={`${dark ? 'translate-y-[16px]' : '-translate-y-[6px]'} h-4 w-4 left-[4px] top-[4px] absolute transition`}>🔆️</span>
    </button>
  );
};

export default ThemeToggle;

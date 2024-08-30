interface Props {}

const Sidebar: React.FC<Props> = () => {
  return (
    <nav className="fixed left-0 top-0 z-40 flex h-screen w-14 items-start border-r border-gray-500/20 bg-background px-4 pt-[calc(3rem+1rem)]">
      <div></div>
    </nav>
  );
};

export default Sidebar;

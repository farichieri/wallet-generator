import { SignOutButton } from '@/features/auth';

interface Props {}

const Nav: React.FC<Props> = () => {
  return (
    <nav className="fixed left-0 top-0 flex h-14 w-screen items-center justify-between border-b border-gray-500/20 px-4">
      <span title=":)" className="cursor-default text-sm">
        🚀
      </span>
      <SignOutButton />
    </nav>
  );
};

export default Nav;

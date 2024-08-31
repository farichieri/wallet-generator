import Link from 'next/link';

import { SignOutButton } from '@/features/auth';
import { BlockChainSelector } from '@/features/blockchains';

interface Props {}

const Nav: React.FC<Props> = () => {
  return (
    <nav className="fixed left-0 top-0 z-50 flex h-14 w-screen items-center justify-between border-b border-gray-500/20 bg-background/80 px-4 backdrop-blur-sm">
      <div className="flex basis-1/3 justify-start">
        <Link href="/dashboard" passHref>
          <span title=":)" className="cursor-pointer text-sm">
            🚀
          </span>
        </Link>
      </div>
      <div className="flex basis-1/3 justify-center">
        <BlockChainSelector />
      </div>
      <div className="flex basis-1/3 justify-end">
        <SignOutButton />
      </div>
    </nav>
  );
};

export default Nav;

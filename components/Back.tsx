import Link from 'next/link';

import { Icons } from './Icons';
import { Button } from './ui/button';

const Back = () => {
  return (
    <div>
      <Link href="/">
        <Button variant="link">
          <Icons.chevronLeft className="h-4" />
          Back
        </Button>
      </Link>
    </div>
  );
};

export default Back;

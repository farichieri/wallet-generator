import Link from 'next/link';

interface Props {}

const Footer: React.FC<Props> = () => {
  return (
    <footer className="flex items-center justify-center border-t border-gray-500/50 py-24">
      <Link
        href="https://github.com/farichieri"
        title="How's it going?"
        className="cursor-default text-sm"
      >
        All in or go home 🚀
      </Link>
    </footer>
  );
};

export default Footer;

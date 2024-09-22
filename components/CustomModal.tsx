import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface Props {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  className?: string;
  withBackdrop?: boolean;
}

const CustomModal = ({
  open,
  onClose,
  title,
  description,
  children,
  showCloseButton = true,
  className,
  withBackdrop = false,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      {withBackdrop && <DialogOverlay className="backdrop-blur-sm" />}
      <DialogContent
        className={cn('m:max-w-md', className)}
        showCloseButton={showCloseButton}
      >
        {(title || description) && (
          <DialogHeader className="w-full">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
        )}
        {children}
      </DialogContent>
    </Dialog>
  );
};

export { CustomModal };

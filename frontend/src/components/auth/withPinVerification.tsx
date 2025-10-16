import { ComponentType, useEffect, useState } from 'react';
import { useAuth } from '@src/context/AuthContext';
import { PinCodeDialog } from '@src/components/PinCodeDialog';
import { useNavigate } from 'react-router-dom';

export function withPinVerification<P extends object>(
  WrappedComponent: ComponentType<P>
) {
  const ComponentWithPin = (props: P) => {
    const {pinInput:pin, setPin } = useAuth();
    const [isPinReady, setIsPinReady] = useState(!!pin);
    const [isPinDialogOpen, setIsPinDialogOpen] = useState(!pin);
    const navigate = useNavigate();

    useEffect(() => {
      if (!pin) {
        setIsPinDialogOpen(true);
        setIsPinReady(false);
      } else {
        setIsPinReady(true);
        setIsPinDialogOpen(false);
      }
    }, [pin]);

    const handlePinSuccess = (newPin: string) => {
      setPin(newPin);
      setIsPinReady(true);
      setIsPinDialogOpen(false);
    };

    const handleDialogClose = (open: boolean) => {
        setIsPinDialogOpen(open);
        if(!open && !isPinReady) {
            navigate('/');
        }
    }

    if (!isPinReady) {
      return (
        <PinCodeDialog
          open={isPinDialogOpen}
          onOpenChange={handleDialogClose}
          onSuccess={handlePinSuccess}
        />
      );
    }

    return <WrappedComponent {...props} />;
  };

  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  ComponentWithPin.displayName = `withPinVerification(${displayName})`;

  return ComponentWithPin;
}

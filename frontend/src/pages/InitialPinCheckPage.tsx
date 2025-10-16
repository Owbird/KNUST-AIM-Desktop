import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PinCodeDialog } from "@src/components/PinCodeDialog";
import { useAuth } from "@src/context/AuthContext";

export function InitialPinCheckPage() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const { setPin } = useAuth();

  const handleSuccess = (pin: string) => {
    setPin(pin);
    setIsOpen(false);
    navigate("/");
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      navigate("/login");
    }
    setIsOpen(open);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <PinCodeDialog
        verify={false}
        open={isOpen}
        onOpenChange={handleClose}
        onSuccess={handleSuccess}
      />
    </div>
  );
}


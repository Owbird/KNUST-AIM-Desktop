import { useState, useRef, useEffect } from "react";
import { Button } from "@src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@src/components/ui/dialog";
import { Input } from "@src/components/ui/input";
import { Label } from "@src/components/ui/label";
import Loader from "@src/components/Loader";
import { useAuth } from "@src/context/AuthContext";

interface PinCodeDialogProps {
  open: boolean;
  verify?: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (pin: string) => void;
}

export function PinCodeDialog({
  open,
  verify = true,
  onOpenChange,
  onSuccess,
}: PinCodeDialogProps) {
  const [pinCode, setPinCode] = useState(new Array(6).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { verifyPin } = useAuth();

  useEffect(() => {
    if (open) {
      setPinCode(new Array(6).fill(""));
      setError("");
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }
  }, [open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      const newPin = [...pinCode];
      newPin[index] = value;
      setPinCode(newPin);

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !pinCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text");
    if (/^\d{6}$/.test(paste)) {
      const newPin = paste.split("");
      setPinCode(newPin);
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async () => {
    setError("");
    const pin = pinCode.join("");
    if (pin.length !== 6) {
      setError("Please enter a 6-digit PIN.");
      return;
    }

    setLoading(true);
    try {
      if (verify) {
        if (!verifyPin(pin)) {
          setError("Incorrect PIN");
          return
        }
      }


      onSuccess(pin);
    } catch (err) {
      console.error(err);
      setError("PIN verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Enter Your 6-Digit PIN
          </DialogTitle>
          <DialogDescription className="text-gray-500 dark:text-gray-400">
            Please enter the 6-digit PIN.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="pin-0" className="sr-only">
              PIN Code
            </Label>
            <div className="flex justify-center gap-2" onPaste={handlePaste}>
              {pinCode.map((digit, index) => (
                <Input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  id={`pin-${index}`}
                  type="password"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  maxLength={1}
                  required
                  className="w-12 h-12 text-center text-2xl"
                />
              ))}
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600 text-center bg-red-50 py-1 rounded">
              {error}
            </p>
          )}
        </div>

        <DialogFooter>
          {loading ? (
            <div className="w-full flex justify-center">
              <Loader />
            </div>
          ) : (
            <Button onClick={handleSubmit} className="w-full">
              Submit
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

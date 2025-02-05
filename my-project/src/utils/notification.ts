import { toast } from 'react-toastify';

export const notifyError = (message: string) => {
  toast.error(message, {
    position: "bottom-right",
    autoClose: 5000,
    ariaLabel: "Error notification",
  });
};
interface ErrorModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    errorMessage: string;
}
import { Dispatch, SetStateAction } from "react";

export type ModalProps = {
    isOpen: boolean;
    closeModal: () => void;
    setIsAuthorizationSuccessful?: Dispatch<SetStateAction<boolean>>;
    isAuthorizationSuccessful?: boolean;
    blogAddedSuccessfully?: boolean;
}
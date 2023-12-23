import { Dispatch, SetStateAction } from "react";

export type ModalProps = {
    isOpen: boolean;
    closeModal: () => void;
    setIsAuthorizationSuccessful?: Dispatch<SetStateAction<boolean>>;
    isAuthorizationSuccessful?: boolean;
    blogAddedSuccessfully?: boolean;
}

export type CategoryTypes = {
    id: number;
    title: string;
    text_color: string;
    background_color: string;
}

export type BlogsTypes = {
    id: number;
    title: string;
    description: string;
    image: string;
    publish_date: string;
    author: string;
    categories: CategoryTypes[];
}
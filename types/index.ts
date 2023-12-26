import { Dispatch, SetStateAction } from "react";

export type ModalProps = {
    isOpen: boolean;
    closeModal: () => void;
    setIsAuthorizationSuccessful?: Dispatch<SetStateAction<boolean>>;
    isAuthorizationSuccessful?: boolean;
    blogAddedSuccessfully?: boolean;
    setIsAuthorized?: Dispatch<SetStateAction<boolean>>;
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

export type FormikValues = {
    image: string;
    author: string;
    title: string;
    description: string;
    publish_date: string;
    categories: CategoryTypes[];
    email: string;
}

export type FormControlProps = {
  control: "input" | "textarea" | "select" | 'date';
  name: string;
  label: string;
  placeholder?: string;
  info?: string[] | string;
  minRows?: number;
  setFieldValue?: Function;
}

export type DatePickerProps =  {
  name: string;
  label: string;
  setFieldValue?: Function;
  info?: string | string[] | undefined;
}

export type InputProps = {
  name: string;
  label: string;
  placeholder?: string;
  info?: string[] | string;
  minRows?: number;
}

export type  SelectComponentProps = {
  name: string; 
  label: string;
  placeholder?: string;
  setFieldValue?: Function;
}

export type ImageComponentProps = {
  imageTouched: any;
  handleFileSelect: any;
  setFieldValue: any;
  handleImageRemove: any;
  name: any;
}
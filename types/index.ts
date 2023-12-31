import { CSSProperties, Dispatch, SetStateAction } from "react";

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

interface ImageType {
  name: string;
  url: string;
  size: string;
}

export type FormikValues = {
    image: ImageType;
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
  categories?: CategoryTypes[];
  isSelectTouched?: boolean;
  setIsSelectTouched?: Dispatch<SetStateAction<boolean>>;
  minTwoCharachters?: boolean;
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
  minTwoCharachters?: boolean
}

export type  SelectComponentProps = {
  name: string; 
  label: string;
  placeholder?: string;
  setFieldValue?: Function;
  categories?: CategoryTypes[];
  isSelectTouched?: boolean;
  setIsSelectTouched?: Dispatch<SetStateAction<boolean>>;
}

export type ImageComponentProps = {
  imageTouched: boolean;
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: Function) => void;
  setFieldValue: Function;
  handleImageRemove: (setFieldValue: Function) => void;
  name: string;
  hasError: any;
}

export interface UsePaginationOptions {
  totalCount: number;
  pageSize: number;
  siblingCount?: number;
  currentPage: number;
}

export interface ButtonProps {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  text: string;
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
  endDecorator?: React.ReactNode;
}
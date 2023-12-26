import { FormControlProps } from "@/types";
import DatePickerComponent from "./textfields/DatePickerComponent";
import InputComponent from "./textfields/InputComponent";
import SelectComponent from "./textfields/SelectComponent";
import TextareaComponent from "./textfields/TextareaComponent";

// TextFields
const FormControl = (props: FormControlProps) => {
  const { control, ...otherProps } = props;

  if (control === "input") {
    return <InputComponent {...otherProps} />;
  }

  if (control === "textarea") {
    return <TextareaComponent {...otherProps} />;
  }

  if (control === "date") {
    return <DatePickerComponent {...otherProps} />;
  }

  if (control === "select") {
    return <SelectComponent {...otherProps} />;
  }

  return null;
};

export default FormControl;

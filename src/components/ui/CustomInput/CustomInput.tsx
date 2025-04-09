import { Input, Form } from "antd";
import { FieldError } from "react-hook-form";
import { Rule } from "antd/es/form";

interface CustomInputProps {
  labelName: string;
  register: any;
  rules?: Rule[]; // Thay object thành Rule[]
  error?: FieldError | undefined;
  name: string;
  type?: string;
  placeholder?: string;
}

const CustomInput = ({
  name,
  labelName,
  type = "text",
  placeholder,
  register,
  error,
  rules = [],
  ...rest
}: CustomInputProps) => {
  return (
    <Form.Item
      label={labelName}
      validateStatus={error ? "error" : ""}
      help={error ? error.message : ""}
      rules={rules} // Truyền vào rules là mảng
      {...rest}>
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
      />
    </Form.Item>
  );
};

export default CustomInput;

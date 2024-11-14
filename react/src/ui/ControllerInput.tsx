import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
} from "react-hook-form";

import React from "react";

interface ControllerProps<T extends FieldValues> {
  name: Path<T>;
  defaultValue?: PathValue<T, Path<T>>;
  validationRules?: RegisterOptions<T, Path<T>>;
  render: (props: {
    field: ControllerRenderProps<T, Path<T>>;
  }) => React.ReactElement;
  control: Control<T>;
}

export default function ControllerInput<T extends FieldValues>({
  name,
  render,
  validationRules,
  defaultValue,
  control,
}: ControllerProps<T>) {
  return (
    <div className="flex flex-1 flex-col">
      <Controller
        name={name}
        rules={validationRules}
        control={control}
        defaultValue={defaultValue}
        render={render}
      />
    </div>
  );
}

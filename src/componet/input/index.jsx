import * as React from "react";

import { cn } from "../../utils/cn";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex w-full rounded-lg border-2 border-neutral-500 bg-transparent px-3 py-3 font-archivo text-sm shadow-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

const CurrencyInput = React.forwardRef(
  ({ className, onChange, ...props }, ref) => {
    const inputRef = React.useRef();

    const renderCurrency = (value) => {
      let number = Number(value);

      return number?.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      });
    };

    const handleChange = (event) => {
      const result = event.target.value.replace(/\D/g, "");
      onChange(Number(result));
    };
    return (
      <React.Fragment>
        <input
          ref={ref}
          type="text"
          className={cn(
            "flex w-full rounded-lg border-2 border-neutral-500 bg-transparent px-3 py-3 font-archivo text-sm shadow-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          value={`${props.value ? renderCurrency(props.value) : ""}`}
          onChange={handleChange}
          onClick={() => inputRef?.current?.click}
          onFocus={() => inputRef?.current?.focus}
        />
        <input hidden type="text" ref={inputRef} {...props} />
      </React.Fragment>
    );
  },
);
CurrencyInput.displayName = "Currency Input";

const NumericInput = React.forwardRef(
  ({ className, onChange, ...props }, ref) => {
    const inputRef = React.useRef();

    const renderCurrency = (value) => {
      let number = Number(value);

      return number?.toLocaleString("id-ID", {
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      });
    };

    const handleChange = (event) => {
      const result = event.target.value.replace(/\D/g, "");
      onChange(Number(result));
    };
    return (
      <React.Fragment>
        <input
          ref={ref}
          type="text"
          className={cn(
            "flex w-full rounded-lg border-2 border-neutral-500 bg-transparent px-3 py-3 font-archivo text-sm shadow-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          value={`${props.value ? renderCurrency(props.value) : ""}`}
          onChange={handleChange}
          onClick={() => inputRef?.current?.click}
          onFocus={() => inputRef?.current?.focus}
        />
        <input hidden type="text" ref={inputRef} {...props} />
      </React.Fragment>
    );
  },
);
NumericInput.displayName = "Numeric Input";

export { Input, CurrencyInput, NumericInput };

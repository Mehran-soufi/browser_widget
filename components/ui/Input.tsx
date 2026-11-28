
import type { InputHTMLAttributes, ReactNode } from "react";
import "../../styles/input.css";

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  label?: string;
  hint?: string;
  error?: string;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  inputSize?: "sm" | "md" | "lg";
};

export default function Input({
  label,
  hint,
  error,
  leftElement,
  rightElement,
  inputSize = "md",
  className,
  id,
  disabled,
  ...props
}: InputProps) {
  const inputId = id ?? props.name;

  const wrapperClasses = [
    "ui-input",
    `ui-input--${inputSize}`,
    error && "ui-input--error",
    disabled && "ui-input--disabled",
  ]
    .filter(Boolean)
    .join(" ");

  const inputClasses = ["ui-input__field", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperClasses}>
      {label && (
        <label className="ui-input__label" htmlFor={inputId}>
          {label}
        </label>
      )}

      <div className="ui-input__control">
        {rightElement && (
          <span className="ui-input__element">{rightElement}</span>
        )}

        <input
          {...props}
          id={inputId}
          disabled={disabled}
          className={inputClasses}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
          }
        />

        {leftElement && (
          <span className="ui-input__element">{leftElement}</span>
        )}
      </div>

      {error ? (
        <span
          id={`${inputId}-error`}
          className="ui-input__message ui-input__message--error"
          role="alert"
        >
          {error}
        </span>
      ) : hint ? (
        <span
          id={`${inputId}-hint`}
          className="ui-input__message"
        >
          {hint}
        </span>
      ) : null}
    </div>
  );
}

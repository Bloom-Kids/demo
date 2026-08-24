function AuthInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  placeholder,
  autoComplete,
  inputMode,
  Icon,
  error,
  action,
  describedBy,
  disabled = false,
}) {
  const errorId = `${id}-error`;
  const descriptionIds = [describedBy, error ? errorId : ""]
    .filter(Boolean)
    .join(" ") || undefined;

  return (
    <div className={`auth-input${error ? " auth-input--error" : ""}`}>
      <label className="visually-hidden" htmlFor={id}>
        {label}
      </label>

      <span className="auth-input__leading-icon" aria-hidden="true">
        <Icon />
      </span>

      <input
        className="auth-input__control"
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-invalid={Boolean(error)}
        aria-describedby={descriptionIds}
        disabled={disabled}
        required
      />

      {action}

      {error && (
        <span className="auth-input__error" id={errorId} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

export default AuthInput;

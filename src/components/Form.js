import React from "react";
import "./Form.css";

export const Text = ({ children, instruction }) => {
  return (
    <input
      type="text"
      name={children}
      placeholder={instruction}
      className="form-input"
      autocomplete="username"
    />
  );
};

export const Checkbox = ({ children }) => {
  return <input type="checkbox" name={children} className="form-input" />;
};

export const CheckboxFilter = ({
  children,
  desc,
  checked,
  onChange,
  disabled,
  count,
}) => {
  return (
    <table>
      <tbody>
        <tr>
          <td className="check">
            <input
              type="checkbox"
              name={children}
              className="form-check"
              checked={checked}
              onChange={onChange}
              disabled={disabled}
            />
          </td>
          <td className="descCheck">
            <p>{desc}</p>
          </td>
          <td className="counted">
            <p>{count}</p>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export const Password = ({ children }) => {
  return (
    <input
      type="password"
      name={children}
      // placeholder={instruction}
      className="form-input"
      id={children}
      minLength='8'
      autocomplete="current-password"
      required
    />
  );
};

export const Email = ({ children, instruction }) => {
  return (
    <input
      type="email"
      name={children}
      placeholder={instruction}
      className="form-input"
    />
  );
};
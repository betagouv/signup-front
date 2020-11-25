import React from 'react';

const LinkAsAButton = ({
  href,
  target,
  children,
  className,
  referrerPolicy,
  onClick = () => {},
}) => (
  <a
    target={target}
    onClick={onClick}
    referrerPolicy={referrerPolicy}
    className={className}
    href={href}
  >
    {children}
  </a>
);

const ClassicButton = ({ type, onClick, className, children }) => (
  <button onClick={onClick} type={type} className={className}>
    {children}
  </button>
);

const ButtonLink = ({
  href,
  target,
  children,
  type,
  onClick,
  referrerPolicy,
  className,
}) => {
  if (href) {
    return (
      <LinkAsAButton
        href={href}
        target={target}
        children={children}
        onClick={onClick}
        className={className}
        referrerPolicy={referrerPolicy}
      />
    );
  }
  if (onClick || type) {
    return (
      <ClassicButton
        onClick={onClick}
        type={type}
        className={className}
        children={children}
      />
    );
  }
  throw new Error("Please specify either 'href', 'onClick' or 'type' props");
};

export default ButtonLink;

import React from 'react';

const LinkAsAButton = ({
  href,
  alt,
  rel,
  target,
  disabled,
  children,
  className,
  size,
  referrerPolicy,
  onClick = () => {},
}) => (
  <a
    rel={rel}
    target={target}
    onClick={onClick}
    referrerPolicy={referrerPolicy}
    className={className}
    href={href}
  >
    {children}
  </a>
);

const ClassicButton = ({
  type,
  onClick,
  alt,
  size,
  disabled,
  referrerPolicy,
  className,
  children,
}) => (
  <button onClick={onClick} type={type} className={className}>
    {children}
  </button>
);

const ButtonLink = ({
  href,
  alt,
  rel,
  target,
  disabled,
  children,
  size,
  type,
  onClick,
  referrerPolicy,
  className,
}) => {
  if (href) {
    return (
      <LinkAsAButton
        href={href}
        rel={rel}
        target={target}
        alt={alt}
        disabled={disabled}
        children={children}
        size={size}
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
        alt={alt}
        disabled={disabled}
        className={className}
        children={children}
        size={size}
      />
    );
  }
  throw new Error('Should not happen');
};

export default ButtonLink;

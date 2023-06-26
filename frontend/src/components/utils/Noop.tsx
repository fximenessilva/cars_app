import React, { ReactNode, ComponentType } from "react";

interface NoopProps {
  component: ComponentType<any>;
  children: ReactNode;
  condition: boolean;
}

const Noop: React.FC<NoopProps> = ({
  component: Component,
  children,
  condition,
  ...props
}) => {
  return condition ? (
    <Component {...props}>{children}</Component>
  ) : (
    <>{children}</>
  );
};

export default Noop;

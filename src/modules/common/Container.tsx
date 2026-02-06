import React from "react";
type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Container(props: ContainerProps) {
  return (
    <div
      className={
        "max-w-7xl mx-auto p-4  sm:px-6 lg:px-8 " + (props.className || "")
      }
    >
      {props.children}
    </div>
  );
}

import React from "react";

export default function HomeSection({ children, pb = "md:pb-40 pb-16",id='' }) {
  return (
    <div id={id} className={`flex flex-col md:flex-row items-center justify-start md:justify-center gap-y-5 md:gap-y-0 px-3 md:px-5 lg:px-6 py-4 max-w-screen-lg 2xl:max-w-screen-2xl mx-auto ${pb} `}>
      {children}
    </div>
  );
}

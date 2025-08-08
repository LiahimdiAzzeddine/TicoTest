import React from "react";

export default function StartSection({ children}) {
  return (
    <>
    <div className="md:h-16 lg:h-20 2xl:h-24 h-14"></div>
    <div className="flex flex-col justify-center gap-y-8 2xl:gap-y-14 md:gap-x-12 lg:gap-x-20 px-4 md:px-8 lg:px-12 pt-10 max-w-screen-lg 2xl:max-w-screen-xl mx-auto min-h-full md:pb-40 pb-16">
      {children}
    </div>
    </>
  );
}

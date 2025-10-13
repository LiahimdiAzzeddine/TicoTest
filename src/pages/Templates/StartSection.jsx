import React from "react";

export default function StartSection({ children, pb = "md:pb-20 pb-16",id='' }) {
  return (
    <section>
    <div  className="md:h-16 lg:h-20 2xl:h-28 h-14"></div>
    <div id={id} className={`flex flex-col justify-center gap-y-8 2xl:gap-y-14 md:gap-x-12 lg:gap-x-20 px-7 md:px-8 lg:px-12 pt-10 max-w-screen-lg 2xl:max-w-screen-xl mx-auto min-h-ful ${pb} `}>
      {children}
    </div>
    </section>
  );
}

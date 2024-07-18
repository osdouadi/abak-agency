import React from "react";

type BannerProps = {
  src: string;
  alt: string;
};

const Banner: React.FC<BannerProps> = ({ src, alt }) => {
  return (
    <div className="h-[52.5vw] w-full md:h-[34vw] relative">
      <img
        src={src}
        alt={alt}
        className="h-[52.5vw] w-full md:h-[34vw] absolute"
      />
    </div>
  );
};

export default Banner;

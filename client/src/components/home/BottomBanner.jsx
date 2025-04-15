import { assets, features } from "../../assets/assets";

const BottomBanner = () => {
  return (
    <div className="relative mt-24">
      <img
        src={assets.bottom_banner_image}
        alt="banner"
        className="w-full hidden md:block"
      />
      <img
        src={assets.bottom_banner_image_sm}
        alt="banner"
        className="w-full md:hidden"
      />

      <div className="absolute inset-0 flex flex-col items-center md:items-end md:justify-center pt-16 md:pt-0 md:pr-10 lg:pr-24">
        <div>
          <h1 className="text-2xl md:text-xl lg:text-3xl font-semibold text-primary mb-6 md:mb-2 lg:mb-6">
            Why We Are the Best?
          </h1>

          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-4 mt-2 md:mt-1 lg:mt-2"
            >
              <img
                src={feature.icon}
                alt={feature.title}
                className="w-9 md:w-8 lg:w-11"
              />

              <div>
                <h3 className="text-lg md:text-base lg:text-xl font-semibold">
                  {feature.title}
                </h3>
                <p className="text-gray-500/70 text-xs lg:text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomBanner;

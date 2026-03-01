import TextButton from "../Buttons/TextButton";

interface ServiceCardProps {
  title: string;
  image?: string;
  description?: string;
  onLearnMore?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  image,
  description,
  onLearnMore,
}) => {
  return (
    <div className="flex gap-4 p-3">
      {/* Image placeholder */}
      {image && (
        <div className="w-[196px] h-[226px] flex-shrink-0 rounded-lg bg-[#b2a5fe]/40 flex items-center m-auto justify-center overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover "
          />
        </div>
      )}

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between ">
        <div className="">
          <h3 className="text-lg md:text-2xl font-semibold text-white ">
            {title}
          </h3>
          {description && (
            <p className="text-sm md:text-base text-white/90 leading-snug mt-2">
              {description}
            </p>
          )}
        </div>
        {/* Learn more button */}
        {onLearnMore && (
          <TextButton text="Подробнее" className="my-3" onClick={onLearnMore} />
        )}
      </div>
    </div>
  );
};

export default ServiceCard;

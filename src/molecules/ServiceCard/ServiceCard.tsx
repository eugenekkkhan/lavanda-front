interface ServiceCardProps {
  title: string;
  description: string;
  onLearnMore?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  onLearnMore,
}) => {
  return (
    <div className="flex gap-4 p-4 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 transition">
      {/* Image placeholder */}
      <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-lg bg-purple-400/40 flex items-center justify-center">
        <span className="text-4xl">📋</span>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
            {title}
          </h3>
          <p className="text-sm md:text-base text-white/90 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Learn more button */}
        <button
          onClick={onLearnMore}
          className="mt-3 px-4 py-2 rounded-full bg-purple-300/40 hover:bg-purple-300/60 transition text-white text-sm font-medium w-fit"
        >
          Подробнее
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;

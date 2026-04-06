export interface BaseCardProps {
  title: string;
  image?: string;
  description?: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
}

const BaseCard: React.FC<BaseCardProps> = ({
  title,
  image,
  description,
  children,
  actions,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 p-[11px]">
      {image && (
        <div className="w-full h-[200px] md:h-auto md:w-[196px] flex items-center flex-shrink-0 md:rounded-[10px] rounded-3xl bg-[var(--color-secondary)]/40 justify-center overflow-hidden transition-all">
          <img src={image} alt={title} className="w-full h-[200px] object-cover" />
        </div>
      )}

      <div className="flex-1 flex flex-col justify-between">
        <div className="mb-4 md:mb-0">
          <h3 className="text-lg md:text-2xl font-semibold text-secondary">
            {title}
          </h3>
          {description && (
            <p className="text-sm md:text-base text-secondary/90 leading-snug mt-2 h-[4lh] m-0 line-clamp-4">
              {description}
            </p>
          )}
          {children}
        </div>

        {actions && <div className="mt-auto">{actions}</div>}
      </div>
    </div>
  );
};

export default BaseCard;

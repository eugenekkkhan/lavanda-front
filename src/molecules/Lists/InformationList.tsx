import { motion } from "framer-motion";
import SearchInput from "../../atoms/SearchInput/SearchInput";

interface InformationListProps {
  data: React.ReactNode[];
  showSearch?: boolean;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
}

const InformationList = ({
  data,
  showSearch = false,
  searchQuery = "",
  onSearchChange,
}: InformationListProps) => {
  const normalizedQuery = searchQuery.trim();
  const isEmpty = data.length === 0;

  return (
    <motion.div className="border border-secondary rounded-4xl md:rounded-3xl overflow-hidden ">
      {showSearch && (
        <motion.div className="">
          <SearchInput
            value={searchQuery}
            onChange={(val) => onSearchChange?.(val)}
            onClear={() => onSearchChange?.("")}
          />
        </motion.div>
      )}
      <motion.div className="">
        {isEmpty ? (
          <div className="flex items-center justify-center min-h-[300px]">
            <p className="m-0 text-secondary/70 text-2xl text-center px-4">
              {normalizedQuery ? (
                <>
                  По запросу «
                  {normalizedQuery.length > 20
                    ? `${normalizedQuery.slice(0, 20)}...`
                    : normalizedQuery}
                  » ничего не найдено
                </>
              ) : (
                <>Ничего не найдено</>
              )}
            </p>
          </div>
        ) : (
          <motion.div>
            {data.map((item, index) => (
              <motion.div key={index}>
                {item}
                {index < data.length - 1 && (
                  <div className="h-px mx-[11px] bg-secondary"></div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default InformationList;

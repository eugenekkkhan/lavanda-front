import { motion } from 'framer-motion'
import SearchInput from '../../atoms/SearchInput/SearchInput'

interface InformationListProps {
	data: React.ReactNode[]
	showSearch?: boolean
	searchQuery?: string
	onSearchChange?: (value: string) => void
}

const InformationList = ({
	data,
	showSearch = false,
	searchQuery = '',
	onSearchChange,
}: InformationListProps) => {
	return (
		<motion.div className='border border-secondary rounded-3xl overflow-hidden '>
			{showSearch && (
				<motion.div className=''>
					<SearchInput
						value={searchQuery}
						onChange={val => onSearchChange?.(val)}
						onClear={() => onSearchChange?.('')}
					/>
				</motion.div>
			)}

			<motion.div >
				{data.map((item, index) => (
					<motion.div
						key={index}
						className='border-b last:border-b-0 border-secondary'
					>
						{item}
					</motion.div>
				))}
			</motion.div>
		</motion.div>
	)
}

export default InformationList

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
		<div className='border-[1px] border-white rounded-3xl mb-12 overflow-hidden'>
			{showSearch && (
				<div className=''>
					<SearchInput
						value={searchQuery}
						onChange={val => onSearchChange?.(val)}
						onClear={() => onSearchChange?.('')}
					/>
				</div>
			)}

			<div className='px-[11px]'>
				{data.map((item, index) => (
					<div
						key={index}
						className='border-b-[1px] last:border-b-0 border-white'
					>
						{item}
					</div>
				))}
			</div>
		</div>
	)
}

export default InformationList

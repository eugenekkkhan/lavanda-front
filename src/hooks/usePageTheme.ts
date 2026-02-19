import { useLocation } from 'react-router'
import { useEffect, useState } from 'react'

interface ThemeConfig {
	primaryColor: string
	secondaryColor: string
}

export const usePageTheme = () => {
	const { pathname } = useLocation()
	const [activeHash, setActiveHash] = useState(window.location.hash)
	const THEMES: Record<string, ThemeConfig> = {
		'#home': {
			primaryColor: '#ffffff',
			secondaryColor: '#404040',
		},
		'#services': {
			primaryColor: '#bdb2ff',
			secondaryColor: '#404040',
		},
		doctors: {
			primaryColor: '#ECFFE8',
			secondaryColor: '#000000',
		},
	}

	useEffect(() => {
		const handleScroll = () => {
			const sections = ['home', 'services']

			for (const id of sections) {
				const element = document.getElementById(id)
				if (element) {
					const rect = element.getBoundingClientRect()
					if (rect.top >= -300 && rect.top <= 700) {
						const newHash = `#${id}`
						if (activeHash !== newHash) {
							setActiveHash(newHash)
						}
						break
					}
				}
			}
		}
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [activeHash])
	useEffect(() => {
		const currentTheme = THEMES[activeHash] || THEMES['/']
		const root = document.documentElement

		root.style.setProperty('--color-primary', currentTheme.primaryColor)
		root.style.setProperty('--color-secondary', currentTheme.secondaryColor)
		console.log(currentTheme.primaryColor)
	}, [activeHash , pathname])
}
export default usePageTheme

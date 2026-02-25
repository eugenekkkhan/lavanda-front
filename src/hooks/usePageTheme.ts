import { useLocation } from 'react-router'
import { useEffect, useState } from 'react'

interface ThemeConfig {
	primaryColor: string
	secondaryColor: string
}

const THEMES: Record<string, ThemeConfig> = {
	'/': {
		primaryColor: '#ffffff',
		secondaryColor: '#404040',
	},
	'#home': {
		primaryColor: '#ffffff',
		secondaryColor: '#404040',
	},
	'#services': {
		primaryColor: '#bdb2ff',
		secondaryColor: '#ffffff',
	},
	'#doctors': {
		primaryColor: '#ECFFE8',
		secondaryColor: '#000000',
	},
}
const SECTIONS = ['home', 'services', 'doctors']
export const usePageTheme = () => {
	const { pathname } = useLocation()
	const [activeHash, setActiveHash] = useState(window.location.hash || '#home')

	useEffect(() => {
		const observerOptions = {
			root: null,
			rootMargin: '-69.5% 0px -29.5% 0px',
			threshold: 0,
		}

		const callback: IntersectionObserverCallback = entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					setActiveHash(`#${entry.target.id}`)
				}
			})
		}

		const observer = new IntersectionObserver(callback, observerOptions)

		SECTIONS.forEach(id => {
			const el = document.getElementById(id)
			if (el) observer.observe(el)
		})

		return () => observer.disconnect()
	},[])
	useEffect(() => {
		const currentTheme = THEMES[activeHash] || THEMES['/']
		const root = document.documentElement

		root.style.setProperty('--color-primary', currentTheme.primaryColor)
		root.style.setProperty('--color-secondary', currentTheme.secondaryColor)
	}, [activeHash, pathname])
}
export default usePageTheme

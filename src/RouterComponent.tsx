import { useEffect, useState } from 'react'
import { scroller } from 'react-scroll'
import HeroSection from './organisms/HeroSection/HeroSection'
import ServiceSection from './organisms/Services/ui/ServiceSection'
import usePageTheme from './hooks/usePageTheme'
import ServiceChosenSection from './organisms/Services/ui/ServiceChosenSection'
const RouterComponent = () => {
	const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
		null,
	)
	usePageTheme()
	// Handle hash changes with react-scroll
	useEffect(() => {
		const handleHashChange = () => {
			const hash = window.location.hash
			if (hash.startsWith('#services/')) {
				setSelectedServiceId(hash.split('/')[1])
			} else if (hash === '#services') {
				setSelectedServiceId(null) 
			}

			const targetSection = hash.split('/')[0].slice(1)
			if (targetSection) {
				scroller.scrollTo(targetSection, {
					duration: 800,
					smooth: true,
					offset: -80,
				})
			}
		}

		// Handle initial hash on mount
		handleHashChange()

		// Listen for hash changes
		window.addEventListener('hashchange', handleHashChange)
		return () => window.removeEventListener('hashchange', handleHashChange)
	}, [])

	// Intersection Observer to detect which section is in view and update URL
	useEffect(() => {
		const sections = ['home', 'services']
		const observerOptions = {
			threshold: 0.3,
		}

		const observerCallback = (entries: IntersectionObserverEntry[]) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const sectionId = entry.target.id

					const newHash = (sectionId === 'services' && selectedServiceId)
            ? `#services/${selectedServiceId}`
            : `#${sectionId}`

          window.history.replaceState(null, '', newHash)
				}
			})
		}

		const observer = new IntersectionObserver(observerCallback, observerOptions)

		sections.forEach(sectionId => {
			const element = document.getElementById(sectionId)
			if (element) {
				observer.observe(element)
			}
		})

		return () => {
      observer.disconnect() 
    }
	}, [selectedServiceId])

	return (
		<>
			<section id='home'>
				<HeroSection />
			</section>
			<section id='services'>
				{selectedServiceId ? <ServiceChosenSection /> : <ServiceSection />}
			</section>
		</>
	)
}

export default RouterComponent

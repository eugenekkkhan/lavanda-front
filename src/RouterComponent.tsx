import { useEffect, useState } from 'react'
import { scroller } from 'react-scroll'
import HeroSection from './organisms/HeroSection/HeroSection'
import ServiceSection from './organisms/Services/ui/ServiceSection'
import usePageTheme from './hooks/usePageTheme'
import ServiceChosenSection from './organisms/Services/ui/ServiceChosenSection'
import { motion, AnimatePresence } from 'framer-motion'

const SECTIONS = ['home', 'services', 'doctors', 'schedule', 'contacts']

const RouterComponent = () => {
	const [serviceId, setServiceId] = useState<string | null>(null)
	const [doctorId, setDoctorId] = useState<string | null>(null)
	usePageTheme()
	// Handle hash changes with react-scroll
	useEffect(() => {
		const handleHashChange = () => {
			const hash = window.location.hash
			const [mainPart, ...rest] = hash.split('/')
			const section = mainPart.slice(1)
			const subId = rest.join('/') || null
			if (section === 'services') {
				setServiceId(subId)
			} else if (section === 'doctors') {
				setDoctorId(subId)
			}

			const targetSection = hash.split('/')[0].slice(1)
			if (targetSection) {
				scroller.scrollTo(targetSection, {
					duration: 800,
					delay: 0,
					smooth: true,
					offset: -30,
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
		const observerOptions = {
			threshold: 0.3,
		}

		const observerCallback = (entries: IntersectionObserverEntry[]) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const sectionId = entry.target.id
					let newHash = `#${sectionId}`

					if (sectionId === 'services' && serviceId) {
						newHash = `#services/${serviceId}`
					} else if (sectionId === 'doctors' && doctorId) {
						newHash = `#doctors/${doctorId}`
					}

					window.history.replaceState(null, '', newHash)
				}
			})
		}

		const observer = new IntersectionObserver(observerCallback, observerOptions)

		SECTIONS.forEach(sectionId => {
			const element = document.getElementById(sectionId)
			if (element) {
				observer.observe(element)
			}
		})

		return () => {
			observer.disconnect()
		}
	}, [doctorId, serviceId])

	return (
		<>
			<section id='home'>
				<HeroSection />
			</section>
			<section id='services'>
				<AnimatePresence mode='wait'>
					{serviceId ? (
						<motion.div key='s-details' {...animProps}>
							<ServiceChosenSection />
						</motion.div>
					) : (
						<motion.div key='s-list' {...animProps}>
							<ServiceSection />
						</motion.div>
					)}
				</AnimatePresence>
			</section>

			<section id='doctors'>
				<AnimatePresence mode='wait'>
					{doctorId ? (
						<motion.div key='d-details' {...animProps}>
							<ServiceChosenSection />
						</motion.div>
					) : (
						<motion.div key='d-list' {...animProps}>
							<ServiceSection />
						</motion.div>
					)}
				</AnimatePresence>
			</section>
		</>
	)
}

const animProps = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -20 },
	transition: { duration: 0.4 },
}
export default RouterComponent

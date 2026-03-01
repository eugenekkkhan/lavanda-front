import { useEffect, useRef } from "react"
import { Route, Routes, useLocation, useNavigate } from 'react-router'
import { scroller } from "react-scroll"
import usePageTheme from "./hooks/usePageTheme"
import NavigationTab from "./organisms/NavigationTab/NavigationTab"
import MainLayout from './pages/MainLayout'

const SECTIONS = ["home", "services", "doctors", "schedule", "contacts"]

const RouterComponent = () => {
  usePageTheme()
  const location = useLocation()
  const navigate = useNavigate()


  const sectionPaths = useRef<Record<string, string>>({
    home: '/home',
    services: '/services',
    doctors: '/doctors',
    contacts: '/contacts'
  })

  useEffect(() => {
    const pathParts = location.pathname.split('/').filter(Boolean)
    const section = pathParts[0] || 'home'

    if (SECTIONS.includes(section)) {
      sectionPaths.current[section] = location.pathname
    }
  }, [location.pathname])

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      const targetSection = hash.split("/")[0].slice(1)
      if (targetSection) {
        scroller.scrollTo(targetSection, {
          duration: 800,
          delay: 0,
          smooth: true,
          offset: 0,
        })
      }
    }

    handleHashChange()
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id

          const savedPath = sectionPaths.current[sectionId]
          if (savedPath && savedPath !== location.pathname) {
            navigate(savedPath, { replace: true })
          }
        }
      })
    }

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    )

    SECTIONS.forEach((sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <NavigationTab />
      <Routes>
        {["/", "/home", "/services", "/doctors", "/contacts"].map((path) => (
          <Route key={path} path={path} element={<MainLayout />} />
        ))}

        <Route path="/services/:serviceId" element={<MainLayout />} />
        <Route path="/doctors/:categoryId" element={<MainLayout />} />
        <Route path="/doctors/:categoryId/:doctorId" element={<MainLayout />} />
      </Routes>
    </>
  )
}

export default RouterComponent
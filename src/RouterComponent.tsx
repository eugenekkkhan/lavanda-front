import { useEffect } from "react"
import { Route, Routes } from 'react-router'
import { scroller } from "react-scroll"
import usePageTheme from "./hooks/usePageTheme"
import NavigationTab from "./organisms/NavigationTab/NavigationTab"
import MainLayout from './pages/MainLayout'

const SECTIONS = ["home", "services", "doctors", "schedule", "contacts"]

const RouterComponent = () => {
  usePageTheme()


  // Handle hash changes with react-scroll
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

    // Handle initial hash on mount
    handleHashChange()

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  // Intersection Observer to detect which section is in view and update URL
  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id


          window.history.replaceState(null, "", `/${sectionId}`)
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

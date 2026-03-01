import { useEffect, useState } from "react"
import { Route, Routes, useLocation } from 'react-router'
import { scroller } from "react-scroll"
import usePageTheme from "./hooks/usePageTheme"
import NavigationTab from "./organisms/NavigationTab/NavigationTab"
import MainLayout from './pages/MainLayout'

const SECTIONS = ["home", "services", "doctors", "schedule", "contacts"]

const RouterComponent = () => {
  usePageTheme()
  const location = useLocation()
  
  const [serviceId, setServiceId] = useState<string | null>(null)
  const [categoryId, setCategoryId] = useState<string | null>(null)
  const [doctorId, setDoctorId] = useState<string | null>(null)

  useEffect(() => {
    const pathParts = location.pathname.split('/').filter(Boolean)
    
    if (pathParts[0] === 'services' && pathParts[1]) {
      setServiceId(pathParts[1])
    }
    
    if (pathParts[0] === 'doctors') {
      if (pathParts[1]) {
        setCategoryId(pathParts[1])
      }
      if (pathParts[2]) {
        setDoctorId(pathParts[2])
      }
    }
  }, [location.pathname])

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      const targetSection = hash.replace('#', '').split("/")[0]
      if (targetSection) {
        scroller.scrollTo(targetSection, {
          duration: 800,
          smooth: true,
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
          let newPath = `/${sectionId}`

         
          if (sectionId === 'services' && serviceId) {
            newPath = `/services/${serviceId}`
          } else if (sectionId === 'doctors') {
            if (doctorId && categoryId) {
              newPath = `/doctors/${categoryId}/${doctorId}`
            } else if (categoryId) {
              newPath = `/doctors/${categoryId}`
            }
          }

          if (window.location.pathname !== newPath) {
            window.history.replaceState(null, '', newPath)
          }
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [serviceId, categoryId, doctorId])

  return (
    <>
      <NavigationTab />
      <Routes>
        <Route path="/" element={<MainLayout />} />
        {SECTIONS.map((section) => (
          <Route key={section} path={`/${section}`} element={<MainLayout />} />
        ))}

        <Route path="/services/:serviceId" element={<MainLayout />} />
        <Route path="/doctors/:categoryId" element={<MainLayout />} />
        <Route path="/doctors/:categoryId/:doctorId" element={<MainLayout />} />
      </Routes>
    </>
  )
}

export default RouterComponent
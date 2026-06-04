import { useState, useEffect } from 'react'
import { useAFC } from './hooks/useAFC'
import { getBodyChangeForDay } from './data/bodyChanges'
import Onboarding from './components/Onboarding'
import Dashboard from './components/Dashboard'
import Calendar from './components/Calendar'
import BodyTracker from './components/BodyTracker'
import MyPage from './components/MyPage'
import SOSModal from './components/SOSModal'
import BadgeModal from './components/BadgeModal'
import NavBar from './components/NavBar'

export default function App() {
  const afc = useAFC()
  const [page, setPage] = useState('홈')
  const [showSOS, setShowSOS] = useState(false)
  const [pendingMilestone, setPendingMilestone] = useState(null)

  const profile = afc.getUserProfile()
  const dayNumber = afc.getDayNumber()
  const streak = afc.getStreak()
  const checkins = afc.getCheckins()
  const stats = afc.getStats()
  const milestones = afc.getMilestones()

  const todayKey = (() => {
    const d = new Date()
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
  })()
  const todayChecked = !!checkins[todayKey]

  // Check for newly earned milestone after each checkin
  useEffect(() => {
    if (!profile) return
    const milestone = afc.getMilestoneToShow()
    if (milestone) setPendingMilestone(milestone)
  }, [checkins]) // eslint-disable-line

  const handleCheckin = () => {
    afc.addCheckin(todayKey)
  }

  const handleReset = () => {
    localStorage.clear()
    window.location.reload()
  }

  // Map useAFC stats keys → Dashboard expected keys
  const dashboardStats = {
    calories: stats.savedCalories,
    money: stats.savedKRW,
    weight: stats.estimatedWeightLoss,
  }

  const currentBodyChange = getBodyChangeForDay(dayNumber)

  // Not yet onboarded
  if (!profile) {
    return <Onboarding onComplete={afc.saveUserProfile} />
  }

  const pageMap = {
    홈: (
      <Dashboard
        profile={profile}
        dayNumber={dayNumber}
        streak={streak}
        todayChecked={todayChecked}
        onCheckin={handleCheckin}
        stats={dashboardStats}
        currentBodyChange={currentBodyChange}
        onSOS={() => setShowSOS(true)}
      />
    ),
    캘린더: (
      <Calendar
        startDate={profile.startDate}
        checkins={checkins}
        dayNumber={dayNumber}
        milestones={milestones}
      />
    ),
    신체변화: <BodyTracker dayNumber={dayNumber} />,
    마이페이지: (
      <MyPage
        profile={profile}
        stats={stats}
        dayNumber={dayNumber}
        milestones={milestones}
        onReset={handleReset}
      />
    ),
  }

  return (
    <div className="relative">
      {pageMap[page] ?? pageMap['홈']}
      <NavBar currentPage={page} onNavigate={setPage} />
      <SOSModal isOpen={showSOS} onClose={() => setShowSOS(false)} dayNumber={dayNumber} />
      <BadgeModal milestone={pendingMilestone} onClose={() => setPendingMilestone(null)} />
    </div>
  )
}

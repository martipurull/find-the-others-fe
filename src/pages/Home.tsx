import React, { useState } from 'react'
import FanDashboard from '../components/FanDashboard'
import MusicianDashboard from '../components/MusicianDashboard'

export default function Home() {
    const [isMusician, setIsMusician] = useState(false)
    return (
        isMusician ? <MusicianDashboard /> : <FanDashboard />
    )
}

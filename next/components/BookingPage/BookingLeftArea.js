import RoomNav from '@/components/partypages/RoomNav'
import PartyCard from '@/components/partypages/PartyCard'
import PhotoCard from '@/components/partypages/PhotoCard'
import ToKnow from '@/components/partypages/ToKnowCard'
import RoomCard from './RoomCard'

export default function BookingLeftArea() {
  return (
    <>
      <RoomNav />
      <PartyCard />
      <RoomCard />
      <PhotoCard />
      <ToKnow />
    </>
  )
}

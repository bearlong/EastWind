import LeftArea from '@/components/partypages/PartyLeftArea'
import RightArea from '@/components/partypages/PartyRightArea'

function BookingPage() {
  return (
    <div className="container">
      <BreadCrumb />
      <BookingLeftArea />
      <BookingRightArea />
    </div>
  )
}

export default BookingPage

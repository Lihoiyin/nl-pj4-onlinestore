import { useState } from 'react'
import CompsFormsCreateTypeProfile from '@/components/forms/CreateTypeProfile'

export default function PagesSelectType() {
  const [userType, setUserType] = useState(null)

  if (!userType) {
    return (
      <div className="container my-3 text-center">
        <div className="btn btn-primary" type="button" onClick={() => setUserType('profile')}>I want to be a User</div>
        <div className="btn btn-info" type="button" onClick={() => setUserType('shop')}>I want to be a Shop</div>
      </div>
    )
  }

  return (
    <div className="container my-3 text-center">
      You selected { userType }

      <CompsFormsCreateTypeProfile userType={userType} />
    </div>
  )
}

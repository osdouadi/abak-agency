import React from 'react'

const UserInfoHeaderCard = () => {
  return (
       <div className="flex items-center gap-2.5 bg-white/75 rounded-full py-1 px-2.5">
        <div className="flex flex-col items-end text-xs text-black">
          <span className="font-semibold tracking-wide">Abak | Admin</span>
          <span className="tracking-wide">info@abak.com</span>
        </div>
        <div className=" bg-gradient-to-tr from-primary to-blue-600 w-5 h-5 rounded-full"></div>
      </div>
  )
}

export default UserInfoHeaderCard
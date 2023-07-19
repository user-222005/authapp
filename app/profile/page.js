'use client'

import ProfilePage from '@/components/ProfilePage/profilePage';
import UserProfile from '@/components/userprofilePage/userprofile';
import React from 'react'

function Profile() {
  return (
    <div className='flex justify-center items-center'>
      <ProfilePage />
      <UserProfile />
    </div>
  )
};

export default Profile;

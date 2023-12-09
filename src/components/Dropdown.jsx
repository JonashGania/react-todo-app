import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import SignOut from './SignOut'

export default function Dropdown({ name, profilePhoto, onClose }) {
    useEffect(() => {
        const handleClickOutside = (e) => {
            const dropdown = document.getElementById('dropdown-container');

            if(dropdown && !dropdown.contains(e.target)){
                onClose();
            }
        }

        document.addEventListener('click', handleClickOutside)

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [onClose])

    return (
        <div 
            id='dropdown-container'
            className='bg-[rgb(17,32,46)] shadow-lg shadow-black px-2 py-2 absolute min-w-[150px] -right-11 -bottom-20'
        >
            <div className='flex flex-col'>
                <div className='flex items-center gap-3 pb-3'>
                    <div>
                        {profilePhoto ? (
                            <img 
                                src={profilePhoto} 
                                alt="Avatar" 
                                className='rounded-[50%] w-6'    
                            />
                        ) : (
                            <img 
                                src="/profile.png" 
                                alt="Avatar" 
                                className='rounded-[50%] w-7'
                            />
                        )}
                    </div>
                    <div>
                        <p className='text-white font-medium text-sm'>{name}</p>
                        <p className='text-sm text-stone-500'>You</p>
                    </div>
                </div>
                <div>
                    <SignOut />
                </div>
            </div>
        </div>
    )
}


Dropdown.propTypes = {
    name: PropTypes.string,
    profilePhoto: PropTypes.string,
    onClose: PropTypes.func,
}
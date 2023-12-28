import { useEffect } from 'react'
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
            className=' bg-white shadow-md z-30 shadow-gray-400 px-2 py-2 absolute min-w-[150px] -right-7 lg:-right-16 -bottom-[90px] mx-4'
        >
            <div className='flex flex-col'>
                <div className='flex items-center gap-3 pb-3'>
                    <div className='border border-gray-600 rounded-[50%]'>
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
                        <p className='text-black font-medium text-sm'>{name}</p>
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
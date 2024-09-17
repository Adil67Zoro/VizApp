import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../store/authSlice'
import { Link } from 'react-router-dom'

export default function SignUp(){
    const [username, SetUsername] = useState()
    const [password, setPassword] = useState()
    const user = useSelector((state) => state.auth.user)
    const error = useSelector((state) => state.auth.error)
    const dispatch = useDispatch()

    const submitHandler = e => {
        e.preventDefault()
        dispatch(signup({username, password}))
        .then((res) => {
            SetUsername('')
            setPassword('')
        })
    }

    return (
        <div>
            {user ? 
                (
                    <div>logged in</div>
                ) 
                : 
                (
                    <form className='mx-auto border-2 p-9 md:p-12 w-72 md:w-96 mt-36 h-84 border-black' onSubmit={submitHandler}>
                        <h3 className='pb-6 text-2xl text-center'>Sign Up</h3>
                        <label className='block mb-1 text-xl' htmlFor="username">Username</label>
                        <input className='w-full h-8 p-1 mb-6 border-2 border-black' id='username' type="text" value={username} onChange={(e) => SetUsername(e.target.value)}/>
                        <label className='block mb-1 text-xl' htmlFor="password">Password</label>
                        <input className='w-full h-8 p-1 mb-6 border-2 border-black' id='password' type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <div className='flex justify-between'>
                            <button className='px-3 py-1 rounded-sm' type='button'>Cancel</button>   
                            <button className='px-3 py-1 rounded-sm' type='submit'>Submit</button> 
                        </div>     
                        {error && <p className='pt-10 text-center text-red-600'>{error}</p>}  
                        <Link to='/signin' className=''>Already have an account?</Link>
                    </form>
                )
            }
        </div>
  )
}
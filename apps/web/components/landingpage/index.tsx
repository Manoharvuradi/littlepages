import React, { useEffect } from 'react'
import styles from './landingpage.module.scss'
import { getCurrentUser } from '../../server/user'
import { usePathname, useRouter } from 'next/navigation';

const LandingPage = () => {
  const pathname = usePathname();
const router = useRouter();

useEffect(() => {
  const checkUser = async () => {
    const user = await getCurrentUser();

    if (!user && pathname !== '/') {
      router.replace('/');
    }

    if (user && pathname === '/') {
      router.replace('/photos');
    }
  };

  checkUser();
}, [pathname]);
  return (
    <div className={`${styles.hero} flex items-center text-white`}>
      <div className={`max-w-md px-3 text-left ml-24 ${styles.content}`} data-aos="fade-up">
        <h1 className="text-[2.5rem] font-bold leading-[1.4] font-montserrat">
          The #1 Solution For Preserving And Celebrating Kids' Art!
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          Curated boxes delivered to your door. Experience the joy of surprise!
        </p>
        <button 
            className="bg-[#009FFF] hover:bg-[#007acc] hover:scale-105 hover:shadow-xl text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 ease-in-out shadow-md"
            onClick={() => router.push('/auth/login')}
        >
          Create Book
        </button>
      </div>
    </div>
  )
}

export default LandingPage
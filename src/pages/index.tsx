import { PageLayout } from '@/components/PageLayout'
import { setActive } from '@/context/store/features/headernav';
import { useAppDispatch } from '@/context/reduxHooks';
import React, { useEffect } from 'react'

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setActive({ active: "icon" }));
  }, []);

  return (
    <PageLayout title='inicio' desc="Realice sus consultas en la app de seguimiento de inventario">
      <main className='home back-operator'>
        lorem
      </main>
    </PageLayout>
  )
}

export default Home
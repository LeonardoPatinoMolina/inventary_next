import React from 'react';
import { PageLayout } from '@/components/PageLayout';

const Prueva: React.FC<void> = () => {

  return (
    <PageLayout title="Prueva page" desc='inicio principal'>
      <div className={'home'}>
        <h2>Pagina de prueva</h2>
        <p className={'home__info'}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae at ab libero earum possimus, sunt hic consequuntur repellat autem est.  
        </p>
      </div>
    </PageLayout>
  )
}

export default Prueva;

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
      
  const delay = (s: number) => new Promise(resolve => setTimeout(resolve, s))
  const res = await fetch("https://jsonplaceholder.typicode.com/users")
  await delay(2000)
  const data = await res.json();
  return {
    props: {
    }
  }
}
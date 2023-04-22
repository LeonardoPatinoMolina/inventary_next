import React from 'react';
import { PageLayout } from '@/components/PageLayout';

const Loading: React.FC<void> = () => {

  return (
    <PageLayout title="Prueva page" desc='inicio principal'>
      <div className={'home'}>
        <h2>Pagina de Loading</h2>
      </div>
    </PageLayout>
  )
}

export default Loading;
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonPage: React.FC = () => {
  return (
    <section className="flex flex-row justify-between items-center gap-5">
      <div className="flex flex-col gap-2 justify-start">
        <Skeleton height={40} width={200} />
        <Skeleton height={20} width={150} />
      </div>
      <aside className="flex flex-col items-center gap-4">
            <Skeleton circle={true} height={120} width={120} />
            <Skeleton height={40} width={100} />
        <div className="flex gap-6">
            <Skeleton height={20} width={80} />
            <Skeleton height={20} width={80} />
        </div>
      </aside>
    </section>
  );
};

export default SkeletonPage;
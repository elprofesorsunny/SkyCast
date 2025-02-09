import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonPage: React.FC = () => {
  return (
    <>
        <Skeleton height={40} width={300} className="mb-4" />
        <Skeleton count={3} width={600} className="mb-8" />
        <Skeleton count={2} width={600} />
    </>
  );
};

export default SkeletonPage;
import React from 'react';
import { RouteComponentProps } from 'react-router-dom'; // eslint-disable-line
import RoadmapTree from '../RoadmapTree/RoadmapTree';

import './RoadmapPreview.css';

type TParams = { id: string };

const RoadmapPreview = ({ match }: RouteComponentProps<TParams>) => {
  const isPreview = window.location.pathname.includes('preview');
  return (
    <div className={isPreview ? "roadmap-tree-container parent-preview" : "roadmap-tree-container"}>
      <RoadmapTree matchId={match.params.id} />
    </div>
  );
};

export default RoadmapPreview;

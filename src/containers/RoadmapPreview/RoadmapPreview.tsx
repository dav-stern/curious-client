import React from 'react';
import { RouteComponentProps } from 'react-router-dom'; // eslint-disable-line
import RoadmapTree from '../RoadmapTree/RoadmapTree';

type TParams = { id: string };

const RoadmapPreview = ({ match }: RouteComponentProps<TParams>) => {

  return (
    <div className="roadmap-tree-container">
      <RoadmapTree
        matchId={match.params.id}
      />
    </div>
  );
};

export default RoadmapPreview;
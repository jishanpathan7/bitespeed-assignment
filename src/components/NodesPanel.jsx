import React from 'react';

const NodesPanel = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="nodes-panel">
      <div
        className="node"
        onDragStart={(event) => onDragStart(event, 'textNode')}
        draggable
      >
        Message
      </div>
    </aside>
  );
};

export default NodesPanel;

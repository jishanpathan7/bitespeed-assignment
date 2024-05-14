import React, { useState, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MiniMap,
  Controls,
  Background,
} from 'reactflow';
import './App.css'
import 'reactflow/dist/style.css';

import NodesPanel from './components/NodesPanel';
import SettingsPanel from './components/SettingsPanel';
import TextNode from './components/TextNode';

const initialNodes = [
  {
    id: '1',
    type: 'textNode',
    data: { label: 'Start' },
    position: { x: 250, y: 0 },
  },
];

const initialEdges = [];

const nodeTypes = {
  textNode: TextNode,
};


function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [error, setError] = useState("")

  const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
  const onEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);
  const onConnect = useCallback((connection) => setEdges((eds) => addEdge(connection, eds)), []);

  const onNodeClick = (event, node) => {
    setSelectedNode(node);
    setError("")
  };

  const onNodeChange = (id, label) => {
    setNodes((nds) =>
      nds.map((node) => (node.id === id ? { ...node, data: { ...node.data, label } } : node))
    );
  };

  const onDrop = (event) => {
    event.preventDefault();
    const nodeType = event.dataTransfer.getData('application/reactflow');
    const position = { x: event.clientX - 100, y: event.clientY - 40 };
    const newNode = {
      id: `${nodes.length + 1}`,
      type: nodeType,
      position,
      data: { label: 'Send Message' },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };


  const saveFlow = () => {
    const emptyTargetNodes = nodes.filter(
      (node) => !edges.some((edge) => edge.target === node.id)
    );

    console.log("nodes==>", nodes)

    if (nodes.length > 1 && emptyTargetNodes.length > 1) {
      setError('Error: More than one node with empty target handles.');
    } else {
      console.log('Flow saved!', { nodes, edges });
      // Navigate back to textNode after saving
      setSelectedNode(null);
      setError(''); // Clear any previous errors
    }
  };

  const handleBackButtonClick = () => {
    setSelectedNode(null); // Navigate back to NodesPanel
    setError(''); // Clear any previous errors
  };


  return (
    <div className='app'>
      {error && <div className="error-message">{error}</div>}
      <div className="flow-wrapper" onDrop={onDrop} onDragOver={onDragOver}>
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            fitView
            nodeTypes={nodeTypes}
          >
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
      <div className='settings-wrapper'>
        <button onClick={saveFlow} className="save-button">
          Save Changes
        </button>
        {!selectedNode ? (
          <NodesPanel />
        ) : (
          <SettingsPanel selectedNode={selectedNode} onNodeChange={onNodeChange} onBackButtonClick={handleBackButtonClick} />
        )}
      </div>

    </div>
  )
}

export default App

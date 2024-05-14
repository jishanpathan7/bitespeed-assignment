import React, { useState, useCallback, useEffect } from 'react';

const SettingsPanel = ({ selectedNode, onNodeChange, onBackButtonClick }) => {
    const [label, setLabel] = useState(selectedNode.data.label);

    // Update local state when selectedNode changes
    useEffect(() => {
        setLabel(selectedNode.data.label);
    }, [selectedNode]);

    const handleChange = (event) => {
        setLabel(event.target.value);
    };

    const handleBlur = () => {
        onNodeChange(selectedNode.id, label);
    };

    return (
        <aside className="settings-panel">
            <div className="panel-header">
                <button onClick={onBackButtonClick}>&#8592;</button>
                <span>Message</span>
            </div>
            <div className="panel-content">
                <label>Text</label>
                <input
                    type="text"
                    value={label}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </div>
        </aside>
    );
};

export default SettingsPanel;

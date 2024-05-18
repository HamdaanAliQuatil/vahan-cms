import React, { useState } from 'react';
import RecordForm from './record-form';
import '../styles/record-box.css';
import UpdateRecordForm from './update-record';
import DeleteRecordForm from './delete-form'; // Step 1: Import DeleteRecordForm component

const TabComponent: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>('Create Record');

  return (
    <div>
      <div className="tabs">
        <button
          className={selectedTab === 'Create Record' ? 'active' : ''}
          onClick={() => setSelectedTab('Create Record')}
        >
          Create Record
        </button>
        <button
          className={selectedTab === 'Update Record' ? 'active' : ''}
          onClick={() => setSelectedTab('Update Record')}
        >
          Update Record
        </button>
        <button // Step 2: Add button for Delete Record tab
          className={selectedTab === 'Delete Record' ? 'active' : ''}
          onClick={() => setSelectedTab('Delete Record')}
        >
          Delete Record
        </button>
      </div>
      {selectedTab === 'Create Record' && (
        <RecordForm selectedTab="Create Record" />
      )}
      {selectedTab === 'Update Record' && <UpdateRecordForm />}
      {selectedTab === 'Delete Record' && <DeleteRecordForm />} {/* Step 4: Render DeleteRecordForm */}
    </div>
  );
};

export default TabComponent;

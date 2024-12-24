
import { useState } from 'react';

const ProfileSetup = () => {
  const [name, setName] = useState('');
  const [expertise, setExpertise] = useState('');
  const [interests, setInterests] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Send profile data to the backend
    try {
      // Placeholder for API call
      setSuccess('Profile setup successfully!');
    } catch (err) {
      setSuccess('An error occurred');
    }
  };

  return (
    <div>
      <h1>Profile Setup</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Expertise"
          value={expertise}
          onChange={(e) => setExpertise(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Teaching Interests"
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          required
        />
        <button type="submit">Complete Setup</button>
      </form>
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default ProfileSetup;

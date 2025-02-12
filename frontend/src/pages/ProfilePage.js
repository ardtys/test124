import React, { useState, useEffect } from 'react';
import AuthService from '../services/authService';

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const userProfile = await AuthService.getProfile();
                setProfile(userProfile);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch profile');
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Profile</h1>
            {profile && (
                <div>
                    <p>Username: {profile.username}</p>
                    <p>Email: {profile.email}</p>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;

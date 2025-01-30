import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar = () => {
    const { user } = useSelector((state) => state.auth);

    const menuItems = [
        {
            title: 'Dashboard',
            path: '/dashboard',
            icon: '📊',
            roles: ['user', 'creator', 'verifier', 'admin']
        },
        {
            title: 'Documents',
            path: '/documents',
            icon: '📄',
            roles: ['user', 'creator', 'verifier', 'admin']
        },
        {
            title: 'Create Document',
            path: '/documents/create',
            icon: '➕',
            roles: ['creator', 'admin']
        }
    ];

    const filteredMenuItems = menuItems.filter(item => 
        item.roles.includes(user?.role)
    );

    return (
        <div className="w-64 bg-gray-800 text-white h-screen">
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">Menu</h2>
                <nav>
                    {filteredMenuItems.map((item, index) => (
                        <Link 
                            key={index} 
                            to={item.path} 
                            className="block py-2 px-4 hover:bg-gray-700 rounded transition"
                        >
                            <span className="mr-2">{item.icon}</span>
                            {item.title}
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;

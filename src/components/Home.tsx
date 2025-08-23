import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

const robloxUsers = [
  { id: '175228013', title: '' },
  { id: '185164564', title: '' },
];

interface UserData {
  id: string;
  name: string;
  avatarUrl: string;
  title: string;
}

const parseDuration = (duration: string): number => {
  const value = parseInt(duration.slice(0, -1));
  const unit = duration.slice(-1).toLowerCase();

  switch (unit) {
    case 'm':
      return value * 60 * 1000; // minutes to milliseconds
    case 'h':
      return value * 60 * 60 * 1000; // hours to milliseconds
    case 'd':
      return value * 24 * 60 * 60 * 1000; // days to milliseconds
    default:
      return 0;
  }
};

const cacheDuration = parseDuration('1m'); // put time here

const Credits: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUsers = async () => {
      const cacheKey = 'robloxUsersCache';

      try {
        const cachedData = localStorage.getItem(cacheKey);
        if (cachedData) {
          const { timestamp, data } = JSON.parse(cachedData);
          if (Date.now() - timestamp < cacheDuration && cacheDuration > 0) {
            setUsers(data);
            setLoading(false);
            return;
          }
        }

        const userPromises = robloxUsers.map(async (user) => {
          const userResponse = await fetch(`https://users.roproxy.com/v1/users/${user.id}`);
          if (!userResponse.ok) throw new Error(`Failed to fetch user ${user.id}`);
          const userData = await userResponse.json();
          
          const avatarResponse = await fetch(`https://thumbnails.roproxy.com/v1/users/avatar-headshot?userIds=${user.id}&size=150x150&format=Png&isCircular=true`);
          if (!avatarResponse.ok) throw new Error(`Failed to fetch avatar for ${user.id}`);
          const avatarData = await avatarResponse.json();
          
          return {
            id: user.id,
            name: userData.name,
            avatarUrl: avatarData.data[0].imageUrl,
            title: user.title,
          };
        });
        const usersData = await Promise.all(userPromises);
        setUsers(usersData);
        localStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), data: usersData }));
      } catch (error) {
        console.error('Failed to fetch Roblox user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">Credits</h2>
      <div className="flex justify-center space-x-8">
        {loading ? (
          <p className="text-slate-400">Loading credits...</p>
        ) : (
          users.map(user => (
            <div key={user.id} className="text-center">
              <img src={user.avatarUrl} alt={user.name} className="w-24 h-24 rounded-full mx-auto mb-2 border-2 border-blue-500" />
              <p className="text-white font-semibold">{user.name}</p>
              <p className="text-sm text-slate-400">{user.title}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  return (
    <div className="text-white p-8 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <Icon icon="simple-icons:roblox" className="w-24 h-24 mx-auto text-blue-400 mb-4" />
        <h1 className="text-4xl font-bold mb-2">Tower Defense Strategies</h1>
        <p className="text-lg text-slate-400">Your ultimate database for TDS strategies.</p>
      </div>

      <div className="bg-slate-800/50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">About This Project</h2>
        <p className="text-slate-300 leading-relaxed">
          This website was created to index all of the strategies for Tower Defense Simulator. The goal is to make them easily searchable and usable, providing a much-needed alternative to Discord's limited search functionality. Whether you're looking for the best way to beat a certain map or just want to explore different strategies, this database is here to help.
        </p>
      </div>

      <Credits />
    </div>
  );
};

export default Home;

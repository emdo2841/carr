
import { useState, useEffect } from "react";
import axios from "axios";

const User = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://randomuser.me/api/");
        setData(response.data);
      } catch (err) {
        setError(err);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold text-gray-600">
          Loading user data...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold text-red-600">
          Error loading user: {error.message}
        </p>
      </div>
    );
  }

  const user = data?.results?.[0];

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold text-gray-600">
          No user data available.
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white-10 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-6 text-blue-700">User Profile</h1>
        <img  
          src={user.picture.large}
          alt="User"
          className="mx-auto rounded-full w-24 h-24 mb-4 border-4 border-blue-600"
        />
        <p className="text-gray-800 mb-2">
          <strong>Name:</strong> {user.name.first} {user.name.last}
        </p>
        <p className="text-gray-800 mb-2">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="text-gray-800 mb-2">
          <strong>Gender:</strong> {user.gender}
        </p>
        <p className="text-gray-800 mb-2">
          <strong>Location:</strong> {user.location.city}, {user.location.state}
          , {user.location.country}
        </p>
        <p className="text-gray-800">
          <strong>Phone:</strong> {user.phone}
        </p>
      </div>
    </div>
  );
};

export default User;


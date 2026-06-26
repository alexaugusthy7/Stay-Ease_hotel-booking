import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

const ManageUsers = () => {

    const [users, setUsers] = useState([]);
    const [owners, setOwners] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await api.get(
                    "/users/all",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`,
                        },
                    }
                );

            setUsers(response.data.users);
            setOwners(response.data.owners);

        } catch (error) {

            console.log(error);

            toast.error(
                "Failed to load users"
            );

        }

    };

    const deleteUser = async (id) => {

        try {

            const token =
                localStorage.getItem("token");

            await api.delete(
                `/users/delete/${id}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

            toast.success(
                "User deleted"
            );

            fetchUsers();

        } catch (error) {

            console.log(error);

            toast.error(
                "Delete failed"
            );

        }

    };

    const toggleStatus = async (
        id
    ) => {

        try {

            const token =
                localStorage.getItem("token");

            await api.put(
                `/users/toggle-status/${id}`,
                {},
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

            toast.success(
                "User status updated"
            );

            fetchUsers();

        } catch (error) {

            console.log(error);

            toast.error(
                "Action failed"
            );

        }

    };

    const filteredUsers =
        users.filter(
            (user) =>
                user.username
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||
                user.email
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
        );

    return (

        <div className="p-8">

            <h1 className="text-3xl font-bold mb-6">
                Users Management
            </h1>

            <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) =>
                    setSearch(
                        e.target.value
                    )
                }
                className="w-full border p-3 rounded mb-6"
            />

            {/* USERS */}

            <h2 className="text-2xl font-bold mb-4">
                Registered Users
            </h2>

            <div className="space-y-3">

                {filteredUsers.map(
                    (user) => (

                        <div
                            key={user._id}
                            className="border rounded-lg p-4 flex justify-between items-center"
                        >

                            <div>

                                <h3 className="font-bold">
                                    {user.username}
                                </h3>

                                <p>
                                    {user.email}
                                </p>

                                <p className="text-sm text-gray-500">
                                    Role:
                                    {" "}
                                    {user.role}
                                </p>

                                <p className="text-sm">
                                    Status:
                                    {" "}
                                    {user.isBlocked
                                        ? "Blocked"
                                        : "Active"}
                                </p>

                            </div>

                            <div className="flex gap-2">

                                <button
                                    onClick={() =>
                                        toggleStatus(
                                            user._id
                                        )
                                    }
                                    className="bg-yellow-500 text-white px-3 py-2 rounded"
                                >
                                    {user.isBlocked
                                        ? "Unblock"
                                        : "Suspend"}
                                </button>

                                <button
                                    onClick={() =>
                                        deleteUser(
                                            user._id
                                        )
                                    }
                                    className="bg-red-500 text-white px-3 py-2 rounded"
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    )
                )}

            </div>

            {/* OWNERS */}

            <h2 className="text-2xl font-bold mt-10 mb-4">
                Hotel Owners
            </h2>

            <div className="space-y-3">

                {owners.map(
                    (owner) => (

                        <div
                            key={owner._id}
                            className="border rounded-lg p-4 mb-4"
                        >

                            <h3 className="font-bold text-lg">
                                {owner.username}
                            </h3>

                            <p>{owner.email}</p>

                            <p>
                                Status:
                                {" "}
                                {owner.isBlocked
                                    ? "Blocked"
                                    : "Active"}
                            </p>

                            <p>
                                Hotels:
                                {" "}
                                {owner.hotels?.length}
                            </p>

                            <div className="mt-2">

                                {owner.hotels?.map(
                                    (hotel) => (

                                        <div
                                            key={hotel._id}
                                            className="text-sm text-gray-600"
                                        >
                                            • {hotel.name}
                                        </div>

                                    )
                                )}

                            </div>

                            <div className="flex gap-2 mt-3">

                                <button
                                    onClick={() =>
                                        toggleStatus(owner._id)
                                    }
                                    className="bg-yellow-500 text-white px-3 py-2 rounded"
                                >
                                    {owner.isBlocked
                                        ? "Unsuspend"
                                        : "Suspend"}
                                </button>

                                <button
                                    onClick={() =>
                                        deleteUser(owner._id)
                                    }
                                    className="bg-red-500 text-white px-3 py-2 rounded"
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    )
                )}

            </div>

        </div>

    );

};

export default ManageUsers;
import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

const OwnerRequests = () => {

  const [requests, setRequests] = useState([]);

  useEffect(() => {

    fetchRequests();

  }, []);

  const fetchRequests = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await api.get(
          "/owner-request/all",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setRequests(response.data);

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to load requests"
      );

    }

  };

  const approveRequest = async (
    id
  ) => {

    try {

      const token =
        localStorage.getItem("token");

      await api.put(
        `/owner-request/approve/${id}`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      toast.success(
        "Owner Approved Successfully"
      );

      fetchRequests();

    } catch (error) {

      console.log(error);

      toast.error(
        "Approval Failed"
      );

    }

  };

  return (

    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        Owner Requests
      </h1>

      {requests.length === 0 ? (

        <p>
          No owner requests found
        </p>

      ) : (

        requests.map((request) => (

          <div
            key={request._id}
            className="border p-6 rounded mb-4 flex justify-between items-start"
          >

            <div>

              <h2 className="font-bold text-xl">
                {request.user?.username}
              </h2>

              <p className="text-gray-600">
                {request.user?.email}
              </p>

              <p className="mt-2">
                <strong>Hotel:</strong>{" "}
                {request.hotelName}
              </p>

              <p>
                <strong>Location:</strong>{" "}
                {request.location}
              </p>

              <p>
                <strong>Rooms:</strong>{" "}
                {request.rooms}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {request.phone}
              </p>

              <p className="mt-2">
                <strong>Message:</strong>
              </p>

              <p className="bg-gray-100 p-2 rounded mt-1">
                {request.message}
              </p>

              <p className="mt-3">
                Status:
                {" "}
                <span className="font-semibold">
                  {request.status}
                </span>
              </p>

            </div>

            {request.status === "pending" && (

              <button
                onClick={() =>
                  approveRequest(
                    request._id
                  )
                }
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Approve
              </button>

            )}

          </div>

        ))

      )}

    </div>

  );

};

export default OwnerRequests;
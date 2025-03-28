import { Card, Input, Avatar, Divider, Button } from "react-daisyui";
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaCity } from "react-icons/fa";

export default function ProfileOverview({ form, setForm }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card className="p-8 shadow-md border border-gray-200 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar
            shape="circle"
            src={form.avatar || undefined}
            size="lg"
            className="border-4 border-white"
          />
          <div>
            <h2 className="text-lg font-bold">{form.name}</h2>
            <p className="text-gray-500">{form.email}</p>
          </div>
        </div>
      </div>
      <Divider />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-4">
          <FaUser className="text-gray-500" />
          <Input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Full Name"
          />
        </div>
        <div className="flex items-center gap-4">
          <FaEnvelope className="text-gray-500" />
          <Input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Email Address"
          />
        </div>
        <div className="flex items-center gap-4">
          <FaMapMarkerAlt className="text-gray-500" />
          <Input
            name="address"
            value={form.address}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Address"
          />
        </div>
        <div className="flex items-center gap-4">
          <FaCity className="text-gray-500" />
          <div className="flex items-center gap-4 w-full">
            <Input
              name="zip"
              value={form.zip}
              onChange={handleChange}
              className="input input-bordered w-1/3"
              placeholder="Postal Code"
            />
            <Input
              name="city"
              value={form.city}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="City"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
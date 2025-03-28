import { Card, Button, Divider } from "react-daisyui";
import { FaLock, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function SecuritySection({ form, navigate }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-8 shadow-md border border-gray-200 space-y-6">
        <h2 className="text-subheading text-primary-800/80 flex items-center gap-2">
          <FaLock /> Security
        </h2>
        <div className="flex flex-row justify-between">
          <p className="text-gray-700 text-subtitle">Last Login</p>
          <p className="text-gray-500 text-details">{form.lastLogin}</p>
        </div>
        <Divider />
        <div className="space-y-4 bg-primary-600/10 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <FaFacebook className="text-blue-600" />
              <p className="text-gray-700">Facebook</p>
            </div>
            <Button color="primary" size="sm" variant="outline">Disconnect</Button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <FaTwitter className="text-blue-400" />
              <p className="text-gray-700">Twitter</p>
            </div>
            <Button color="primary" size="sm" variant="outline">Disconnect</Button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <FaLinkedin className="text-blue-700" />
              <p className="text-gray-700">LinkedIn</p>
            </div>
            <Button color="primary" size="sm" variant="outline">Disconnect</Button>
          </div>
        </div>
        <Divider className="my-0" />
        <div className="flex items-center justify-between">
          <h3 className="text-body font-bold">Reset Password</h3>
          <Button
            onClick={() => navigate("/reset-password")}
            variant="link"
            color="ghost"
            size="md"
            className="text-link text-primary underline"
          >
            Reset
          </Button>
        </div>
        <Divider className="my-0 -mt-4" />
        <div className="flex items-center justify-between">
          <h3 className="text-body font-bold text-error">Delete Account</h3>
          <Button
            variant="link"
            color="ghost"
            size="md"
            className="text-link text-error underline"
          >
            Delete
          </Button>
        </div>
      </Card>
    </div>
  );
}

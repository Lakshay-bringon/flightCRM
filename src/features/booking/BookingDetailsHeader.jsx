import { RefreshCcw, Activity as ActivityIcon, MessageSquareText, Mails, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "../../components/ui/popover";
import Modal from "../../components/Modal";
import Comments from "./Comments";
import Activity from "./Actvity";

export default function BookingDetailsHeader({ bookingId="1" }) {
  const [showComments, setShowComments] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
  return (
    <div className="sticky top-0 z-10 flex items-center py-4 bg-transparent ">
      <div className="flex flex-1 gap-3">
        <Button variant="secondary" className="flex items-center gap-2 cursor-pointer" onClick={() => setShowComments(true)}>
          <MessageSquareText size={18}/> Comments
        </Button>
        <Button variant="secondary" className="flex items-center gap-2 cursor-pointer" onClick={() => setShowActivity(true)}>
          <ActivityIcon    size={18}/> Activity
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="secondary" className="flex items-center gap-2 cursor-pointer">
              <Mails size={18}/> Email <ChevronDown size={16} />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-48 p-1">
            <button className="w-full text-left px-4 py-2 rounded hover:bg-gray-800 text-gray-200 transition-colors cursor-pointer" type="button">Auth</button>
            <button className="w-full text-left px-4 py-2 rounded hover:bg-gray-800 text-gray-200 transition-colors cursor-pointer" type="button">Confirmation</button>
            <button className="w-full text-left px-4 py-2 rounded hover:bg-gray-800 text-gray-200 transition-colors cursor-pointer" type="button">Card Declined</button>
          </PopoverContent>
        </Popover>
        <Button variant="secondary" className="flex items-center gap-2 cursor-pointer" title="Refresh">
          <RefreshCcw size={18} /> Refresh
        </Button>
      </div>
      <div className="flex">
        <Button variant="destructive" className="flex items-center gap-2 cursor-pointer">
          <X size={18}/> Close Booking
        </Button>
      </div>
      {/* Comments Modal */}
      <Modal isOpen={showComments} onClose={() => setShowComments(false)} title="Comments">
        <Comments bookingId={bookingId} />
      </Modal>
      {/* Activity Modal */}
      <Modal isOpen={showActivity} onClose={() => setShowActivity(false)} title="Activity">
        <Activity bookingId={bookingId} />
      </Modal>
    </div>
  );
}
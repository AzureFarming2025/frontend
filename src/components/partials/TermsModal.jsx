import React, { useState } from "react";
import termsConfig from "@config/termsConfig";
import { SolidButton, OutlineButton } from "@components/selector/Buttons";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";

const TermsModal = ({ isOpen, onClose, onAccept }) => {
  const [checkedItems, setCheckedItems] = useState({});

  // Toggle individual checkbox
  const handleCheckboxChange = (id) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const totalCount = Object.keys(termsConfig).length;
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const allChecked = checkedCount === totalCount;

  // Toggle all checkboxes: check all if not all are checked, uncheck all if all are checked
  const toggleCheckAll = () => {
    const newCheckedState = Object.fromEntries(
      Object.keys(termsConfig).map((key) => [key, !allChecked])
    );
    setCheckedItems(newCheckedState);
  };

  return (
    <div className={`modal ${isOpen ? "modal-open" : ""}`}> 
      <div className="modal-box p-8 max-h-[80vh] flex flex-col overflow-hidden">
        
        {/* Header: title and checked count */}
        <div className="flex justify-between items-center">
          <h2 className="text-body text-secondary-700">Terms and Conditions</h2>
          <div className="badge badge-soft badge-secondary">
            <span className="text-xs font-sans font-medium">
              {checkedCount} / {totalCount}
            </span>
          </div>
        </div>

        <div className="divider" />

        {/* Terms list */}
        <div className="flex-grow space-y-4 overflow-y-auto">
          {Object.entries(termsConfig).map(([key, value]) => (
            <fieldset key={key} className="fieldset">
              <div className="flex justify-between items-center">
                <legend className="fieldset-legend text-label pl-1">{value.title}</legend>
                <label className="fieldset-label flex items-center">
                  <input
                    type="checkbox"
                    checked={checkedItems[key] || false}
                    onChange={() => handleCheckboxChange(key)}
                    className="checkbox checkbox-sm btn-circle checkbox-secondary opacity-65"
                  />
                  <span className="text-link ml-0.5">I Agree</span>
                </label>
              </div>
              <div className="scrollbar-default h-auto max-h-24 min-h-20 overflow-scroll shadow-sm border border-neutral/20 py-3 px-2 rounded-sm">
                <p className="text-neutral/80 text-detail">{value.content}</p>
              </div>
            </fieldset>
          ))}
        </div>

        {/* Footer: actions */}
        <div className="modal-action w-full flex-wrap">
          <div className={`w-full ${!allChecked ? "opacity-50" : ""}`}>
            <OutlineButton
              text={allChecked ? "Uncheck All Agreements" : "Check All Agreements"}
              variant="secondary"
              size="flat"
              icon={
                allChecked 
                  ? <FaCheckCircle className="text-secondary" size={12} /> 
                  : <FaRegCircle className="text-secondary" size={12} />
              }
              onClick={toggleCheckAll}
            />
          </div>

          <div className="flex w-full gap-x-2">
            <OutlineButton
              size="half"
              text="Cancel"
              variant="secondary"
              onClick={() => onClose(false)}
            />
            <SolidButton
              size="half"
              variant="secondary"
              text="Next"
              disabled={!allChecked}
              onClick={() => onAccept(true)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;

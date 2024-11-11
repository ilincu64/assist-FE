import React, { useState } from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";

type DescriptionProps = {
  initialValues: { descriptionDetails: string; checked: boolean };
  onChange: (values: { descriptionDetails: string; checked: boolean }) => void;
};

export const Description: React.FC<DescriptionProps> = ({
  initialValues,
  onChange,
}) => {
  const [descriptionDetails, setDescriptionDetails] = useState(
    initialValues.descriptionDetails,
  );
  const [checked, setChecked] = useState<boolean>(initialValues.checked);

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const value = event.target.value;
    if (value.length <= 100) {
      setDescriptionDetails(value);
      onChange({ descriptionDetails: value, checked });
    }
  };

  const handleSwitchChange = () => {
    setChecked(!checked);
    onChange({ descriptionDetails, checked: !checked });
  };

  return (
    <div className="grid h-full w-full gap-1.5">
      <Label htmlFor="message-2">Description details</Label>
      <Textarea
        placeholder="Enter a description..."
        id="message-2"
        value={descriptionDetails}
        onChange={handleDescriptionChange}
        required
        className="h-full"
      />
      <p className="text-sm text-muted-foreground">
        {descriptionDetails.length}/100 mandatory characters
      </p>
      <div className="flex items-center space-x-2">
        <Switch
          id="description-check"
          checked={checked}
          onClick={handleSwitchChange}
        />
        <Label htmlFor="description-check">
          Default shipping method (covered by us)
        </Label>
      </div>
      <p className="text-sm text-muted-foreground">
        Deactivating this means that you are responsible for shipping the item,
        therefore it is not covered.
      </p>
    </div>
  );
};

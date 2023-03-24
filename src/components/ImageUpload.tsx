import React from "react";

interface ImageUploadProps {
  label: string;
  value?: string;
  disabled?: boolean;
  onChange: (base64: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  label,
  value,
  disabled,
  onChange
}) => {
  return <div>ImageUpload</div>;
};

export default ImageUpload;

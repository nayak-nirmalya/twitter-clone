import Image from "next/image";
import { useDropzone } from "react-dropzone";
import React, { useCallback, useState } from "react";

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
  const [base64, setBase64] = useState(value);

  const handleChange = useCallback(
    (base64: string) => {
      onChange(base64);
    },
    [onChange]
  );

  const handleDrop = useCallback(
    (files: any) => {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (event: any) => {
        setBase64(event.target.result);
        handleChange(event.target.result);
      };

      reader.readAsDataURL(file);
    },
    [handleChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    disabled,
    accept: {
      "image/jpeg": [],
      "image/png": []
    }
  });

  return (
    <div
      {...getRootProps({
        className:
          "w-full p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-700 "
      })}
    >
      <input {...getInputProps()} />
      {base64 ? (
        <div className="flex items-center justify-center">
          <Image
            width="0"
            height="0"
            src={base64}
            sizes="100vw"
            alt="Uploaded Image"
            style={{ width: "15%", height: "auto" }}
          />
        </div>
      ) : (
        <p className="text-white">{label}</p>
      )}
    </div>
  );
};

export default ImageUpload;

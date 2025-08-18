import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RxUpload } from "react-icons/rx";
import { Button } from "@/components/ui/button"
import { X } from 'lucide-react';
import img from "@/assets/excel.png";


const UploadDocument = (): React.JSX.Element => {

    const [files, setFiles] = useState<File[]>([]);
    const MAX_SIZE = 200 * 1024; // 200KB

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFiles = Array.from(e.target.files || []);
        const validFiles: File[] = [];

        uploadedFiles.forEach((file) => {
            // Check file type (Excel only)
            if (
                file.type !==
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
                file.type !== "application/vnd.ms-excel"
            ) {
                alert(`${file.name} is not an Excel file!`);
                return;
            }

            // Check size
            if (file.size > MAX_SIZE) {
                alert(`${file.name} is larger than 200KB!`);
                return;
            }

            validFiles.push(file);
        });

        setFiles((prev) => [...prev, ...validFiles]);
    };

    const handleRemove = (index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = () => {
        if (files.length === 0) {
            alert("Please upload at least one file before confirming.");
            return;
        }

        // TODO: send files to backend
        alert(
            `Confirming transaction with files: ${files
                .map((f) => f.name)
                .join(", ")}`
        );
    };


    return (
 <div className='space-y-2 w-100 max-tab:w-full'>
            <h2 className='text-base font-semibold'>Upload Document (Max 200KB)</h2>
            <div>

                <Label className="flex flex-col items-center justify-center border-2 border-dashed rounded-md p-4 cursor-pointer  hover:bg-gray-50">
                    <RxUpload className='text-xl' />
                    <Input
                        type="file"
                        accept=".xls,.xlsx"
                        onChange={handleFileChange}
                        className="hidden"
                    />  <p className='text-[rgba(18,159,219,1)] font-normal text-base'>Choose a file to upload</p>
                    <p className='font-normal text-sm text-[rgba(44,44,44,1)]'>You can only upload and Excel file</p>

                </Label>

                {files.length > 0 && (
                    <div>
                        {files.map((file, index) => (
                            <div className="flex items-center justify-between border rounded-md p-3 mt-2 bg-[rgba(246,246,246,1)] relative " key={index}>
                                <div className="flex items-center gap-2">
                                    <img
                                        src={img}
                                        alt="Excel"
                                        className="w-8 h-8"
                                    />
                                    <div >
                                        <p className="text-sm">{file.name}</p>
                                        <p className="text-xs text-primary capitalize">
                                            {(file.size / 1024).toFixed(0)}KB
                                        </p>
                                    </div>
                                </div>
                                <button onClick={() => handleRemove(index)}>
                                    <X className="w-5 h-5 text-red-500 absolute top-1 right-1 z-30" />
                                </button>
                            </div>))
                        }
                    </div>

                )}

            </div>
            <Button className='mt-10' type='submit' onClick={handleSubmit}>Confirm Transaction</Button>
        </div>
    )
}

export default UploadDocument
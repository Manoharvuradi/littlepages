import React, { useEffect } from 'react'
import { useSelectedImages } from '../../context';
import UserUploads from '../useruploads';
import { useRouter } from 'next/navigation';

type Props = {
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
};
const CoverImage = ({ formData, setFormData, onNext }: Props) => {

  const [selectCoverImage, setSelectCoverImage] = React.useState<boolean[]>([]);
  const { selectedImages } = useSelectedImages();
  const router = useRouter();

  useEffect(() => {
    if(selectedImages.length < 4){
      router.push('/photos');
    }
  },[selectedImages])

  return (
    <div className='flex flex-col items-center w-full'>
     <h2 className="text-2xl font-semibold mb-8">Choose Cover Image</h2>
     <div className='flex gap-4'>
       <button
        className='mt-2 px-8 py-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-700'
      >
        From Book
      </button>

        <button 
          className='mt-2 px-8 py-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-700'
        >
          Gallery
        </button>
     </div>

      <UserUploads 
        previewUrls={selectedImages}
        selected={selectCoverImage}
        setSelected={setSelectCoverImage}
      />

     <button
        disabled={!formData.bookSize}
        onClick={onNext}
        className={`mt-2 px-8 py-3 rounded-full font-semibold ${
          formData.bookSize
            ? "bg-indigo-600 text-white hover:bg-indigo-700"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        Next
      </button>
    </div>
  )
}

export default CoverImage

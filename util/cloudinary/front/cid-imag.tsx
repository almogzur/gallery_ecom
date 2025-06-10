import { CldImage, CldImageProps } from 'next-cloudinary';

type CloudinaryImageProps   =  & Omit<CldImageProps,"src"> &  {
  alt?: string;
  width?: number;
  height?: number;
  publicId:string
};

export default function CloudinaryImage(props : CloudinaryImageProps) {

return (
 <CldImage
    width={props.width}
    height={props.height}
    alt={props.alt ?? "Description of my image"}
    src={props.publicId}
 />
)
    }  
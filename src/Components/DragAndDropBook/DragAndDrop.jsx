import React, {useState} from 'react'
import ImageUploading from 'react-images-uploading'
import { fileUpload } from '../../utils/fileUpload'
import { BoxDragAndDrop } from './BoxDragAndDrop';
import { ImageSelected } from './ImageSelected';

function DragAndDrop({user, updateImg}) {

    const [images, setImages] = useState([]);
    const [urlImage, setUrlImage] = useState('')
    const [loading, setLoading] = useState(false);

const handleChange = (image) => setImages(image)

  const onUpload = async () => {
    setLoading(true);
    
    const url = await fileUpload(images[0].file);
    setLoading(false);


    if (url) {
        setUrlImage(url);

        updateImg(url);
                
      } else alert('Error, please try again later. ❌');
      
    
  }


  return (
    <>      
      {user.id? <ImageUploading multiple={false} maxNumber={1} value={images} onChange={handleChange}>
      {({
        image,
        onImageUpload,
        dragProps,
        isDragging,
        onImageRemove,
        onImageUpdate,
    }) => (
        <>
        {
          images[0]
            ?<ImageSelected img={images[0].dataURL}  {...{ onImageRemove, onUpload, onImageUpdate, loading }} />
            : <BoxDragAndDrop dragProps={dragProps} isDragging={isDragging} onImageUpload={onImageUpload}/>
        }
      </>
    )}
      </ImageUploading>: <></>}
    </>
  )
}

export default DragAndDrop
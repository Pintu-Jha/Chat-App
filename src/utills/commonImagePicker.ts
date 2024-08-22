import DocumentPicker from 'react-native-document-picker';
import ImagePicker from 'react-native-image-crop-picker';

// export async function OpenGallery({callback, options}:any) {
//   try {
//     const image = await ImagePicker.openPicker(options);

//     if (options.multiple && options.multiple === true) {
//       let images = image.map(img => {
//         const fileName = img.path.split('/').pop();
//         return {
//           uri: img.path,
//           type: img.mime,
//           name: fileName,
//         };
//       });

//       callback(images);
//       return images;
//     } else {
//       const fileName = image.path.split('/').pop();
//       const tempImageObject = {
//         uri: image.path,
//         type: image.mime,
//         name: fileName,
//       };

//       callback(tempImageObject);
//       return tempImageObject;
//     }
//   } catch (err) {
//     console.log(err);
//   }
// }

// export async function OpenCamera({callback, options}:any) {
//   try {
//     const image = await ImagePicker.openCamera(options);
//     var fileNameA = image.path.split('/');
//     var fileName = fileNameA[fileNameA.length - 1];
//     let tempImageObject = {
//       uri: image.path,
//       type: image.mime,
//       name: fileName,
//     };
//     callback(tempImageObject);
//     return tempImageObject;
//   } catch (error) {
//     // flashMessage(Strings.err_something_went_wrong, 'danger')
//   }
// }

export const pickDocument = async (callback:any) => {
  try {
    const res = await DocumentPicker.pickSingle({
      type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
    });
    if (!res) {
      console.error('No document selected.');
      return;
    }

    const { uri, type, name, size } = res;

    if (!uri || !type || !name ) {
      console.error('Incomplete or invalid file details:', res);
      return;
    }

    const selectedFile = {
      uri,
      type,
      name,
    };

    if (typeof callback === 'function') {
      callback(selectedFile);
    } else {
      console.error('Callback is not a function');
    }
  } catch (error) {
    if (DocumentPicker.isCancel(error)) {
      console.log('Document picking cancelled.');
    } else {
      console.error('Error picking document:', error);
    }
  }
};
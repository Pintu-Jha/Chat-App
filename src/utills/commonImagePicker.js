import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';

export async function OpenGallary(callback, options) {
  try {
    const image = await ImagePicker.openPicker(options);
    if (options.multiple && options.multiple == true) {
      let images = [];
      for (let i = 0; i < image.length; i++) {
        var fileNameA = image[i].path.split('/');
        var fileName = fileNameA[fileNameA.length - 1];

        let tempImageObject = {
          uri: image[i].path,
          type: image[i].mime,
          name: fileName,
        };
        images.push(tempImageObject);
      }
      callback(images);
      return images;
    } else {
      var fileNameA = image.path.split('/');
      var fileName = fileNameA[fileNameA.length - 1];

      let tempImageObject = {
        uri: image.path,
        type: image.mime,
        name: fileName,
      };
      callback(tempImageObject);
      return tempImageObject;
    }
  } catch (err) {
    // flashMessage(Strings.err_something_went_wrong, 'danger')
  }
}

export async function OpenCamera(callback, options) {
  try {
    const image = await ImagePicker.openCamera(options);
    var fileNameA = image.path.split('/');
    var fileName = fileNameA[fileNameA.length - 1];
    let tempImageObject = {
      uri: image.path,
      type: image.mime,
      name: fileName,
    };
    callback(tempImageObject);
    return tempImageObject;
  } catch (error) {
    // flashMessage(Strings.err_something_went_wrong, 'danger')
  }
}

export const pickDocument = async callback => {
  try {
    const res = await DocumentPicker.pickSingle({
      type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
    });

    if (!res) {
      console.warn('No document selected.');
      return;
    }
    const {fileCopyUri, uri, type, name, size} = res;

    if (!uri || !fileCopyUri || !type || !name || size === undefined || null) {
      console.warn('Incomplete file details:', res);
      return;
    }
    const selectedFile = {
      uri,
      type,
      name,
      size,
      fileCopyUri
    };
    callback(selectedFile);
  } catch (error) {
    if (DocumentPicker.isCancel(error)) {
      console.log('Document picking cancelled.');
    } else {
      console.error('Error picking document:', error);
    }
  }
};

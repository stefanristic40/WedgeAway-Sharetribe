import React, { useState, useEffect } from 'react';
import { any, node, number, string } from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';

import { AspectRatioWrapper, Promised } from '../../components';

import css from './ImageFromFile.module.css';

// readImage returns a promise which is resolved
// when FileReader has loaded given file as dataURL
const readImage = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => resolve(e.target.result);
    reader.onerror = e => {
      // eslint-disable-next-line
      console.error('Error (', e, `) happened while reading ${file.name}: ${e.target.result}`);
      reject(new Error(`Error reading ${file.name}: ${e.target.result}`));
    };
    reader.readAsDataURL(file);
  });

// Create elements out of given thumbnail file
const ImageFromFile = props => {
  const [promisedImage, setPromisedImage] = useState(readImage(props.file));
  const { className, rootClassName, aspectWidth, aspectHeight, file, id, children } = props;
  const classes = classNames(rootClassName || css.root, className);

  useEffect(() => {
    setPromisedImage(readImage(file));
  }, [file]);
  return (
    <Promised
      key={id}
      promise={promisedImage}
      renderFulfilled={dataURL => {
        return (
          <div className={classes}>
            <AspectRatioWrapper width={aspectWidth} height={aspectHeight}>
              <img src={dataURL} alt={file.name} className={css.rootForImage} />
              {/* <img
                src="https://sharetribe.imgix.net/65bc30cb-f677-42fb-930f-22c81934bd8c/65f092ba-c548-4f82-a160-64822f43d8a8?auto=format&crop=edges&fit=crop&h=533&w=400&s=0f7d2ceb8198c941a5c83dbdf819f4a2"
                alt={file.name}
                className={css.rootForImage}
              /> */}
            </AspectRatioWrapper>
            {children}
          </div>
        );
      }}
      renderRejected={() => (
        <div className={classes}>
          <FormattedMessage id="ImageFromFile.couldNotReadFile" />
        </div>
      )}
    />
  );
};

ImageFromFile.defaultProps = {
  className: null,
  children: null,
  rootClassName: null,
  aspectWidth: 1,
  aspectHeight: 1,
};

ImageFromFile.propTypes = {
  className: string,
  rootClassName: string,
  aspectWidth: number,
  aspectHeight: number,
  file: any.isRequired,
  id: string.isRequired,
  children: node,
};

export default ImageFromFile;

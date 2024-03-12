import React, { useState } from 'react';

import { FormattedMessage } from '../../util/reactIntl';
import { ResponsiveImage, Modal } from '../../components';

import ImageCarousel from './ImageCarousel/ImageCarousel';
import ActionBarMaybe from './ActionBarMaybe';

import classNames from 'classnames';
import css from './ListingPage.module.css';

const SectionHero = props => {
  const {
    title,
    listing,
    isOwnListing,
    editParams,
    // handleViewPhotosClick,
    imageCarouselOpen,
    onImageCarouselClose,
    onManageDisableScrolling,
    noPayoutDetailsSetWithOwnListing,
  } = props;

  const [index, setIndex] = useState(0);
  const hasImages = listing.images && listing.images.length > 0;
  const length = listing.images.length;
  // const firstImage = hasImages ? listing.images[0] : null;
  // const variants = firstImage
  //   ? Object.keys(firstImage?.attributes?.variants).filter(k => k.startsWith('scaled'))
  //   : [];

  const [isOpen, setIsOpen] = useState(false);

  const handleViewPhotosClick = index => {
    // Stop event from bubbling up to prevent image click handler
    // trying to open the carousel as well.
    // e.stopPropagation();
    // setImageCarouselOpen(true);
    setIndex(index);
    setIsOpen(true);
  };

  const viewPhotosButton = hasImages ? (
    <button
      className={css.viewPhotos}
      onClick={() => {
        handleViewPhotosClick(0);
      }}
    >
      {/* <FormattedMessage
        id="ListingPage.viewImagesButton"
        values={{ count: listing.images.length }}
      /> */}
      View Photos
    </button>
  ) : null;

  const imagesMaybe = cnt => (
    <div
      className={
        cnt == 5
          ? css.layoutFor5Hero
          : cnt == 2
          ? css.layoutFor2Hero
          : cnt == 1
          ? css.layoutFor1Hero
          : ''
      }
    >
      {[...Array(Number.parseInt(cnt))].map((_, index) => (
        <div
          className={classNames(
            css.imageWrapperForSectionHero,
            cnt == 5
              ? css.collage5PlusPhotosItem
              : cnt == 2
              ? css.collage2PlusPhotosItem
              : cnt == 1
              ? css.collage1PlusPhotosItem
              : ''
          )}
          onClick={() => {
            handleViewPhotosClick(index);
          }}
          key={index}
        >
          <ResponsiveImage
            rootClassName={css.rootForImage}
            alt={title}
            image={listing.images[index]}
          />
          if(index==(cnt - 1)) {viewPhotosButton}
        </div>
      ))}
    </div>
  );

  return (
    <div className={css.sectionHero} data-testid="hero">
      {length > 4 ? imagesMaybe(5) : length > 1 ? imagesMaybe(2) : imagesMaybe(1)}
      {/* <div className={css.imageWrapperForSectionHero} onClick={handleViewPhotosClick}> */}
      {/* I will need it in the future for the add payment and edit */}
      {/* {listing.id && isOwnListing ? (
          <div onClick={e => e.stopPropagation()} className={css.actionBarContainerForHeroLayout}>
            {noPayoutDetailsSetWithOwnListing ? (
              <ActionBarMaybe
                className={css.actionBarForHeroLayout}
                isOwnListing={isOwnListing}
                listing={listing}
                showNoPayoutDetailsSet={noPayoutDetailsSetWithOwnListing}
              />
            ) : null}

            <ActionBarMaybe
              className={css.actionBarForHeroLayout}
              isOwnListing={isOwnListing}
              listing={listing}
              editParams={editParams}
            />
          </div>
        ) : null} */}
      {/* <ResponsiveImage
          rootClassName={css.rootForImage}
          alt={title}
          image={firstImage}
          variants={variants}
        />
        {viewPhotosButton}
      </div> */}
      {isOpen && (
        <Modal
          id="ListingPage.imageCarousel"
          scrollLayerClassName={css.carouselModalScrollLayer}
          containerClassName={css.carouselModalContainer}
          lightCloseButton
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          usePortal
          onManageDisableScrolling={onManageDisableScrolling}
        >
          <ImageCarousel
            images={listing.images}
            imageVariants={['scaled-small', 'scaled-medium', 'scaled-large', 'scaled-xlarge']}
            index={index}
          />
        </Modal>
      )}
    </div>
  );
};

export default SectionHero;

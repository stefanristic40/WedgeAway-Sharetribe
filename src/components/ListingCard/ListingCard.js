import React, { useEffect, useState } from 'react';
import { string, func, bool } from 'prop-types';
import classNames from 'classnames';

import { useConfiguration } from '../../context/configurationContext';

import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';
import { displayPrice } from '../../util/configHelpers';
import { lazyLoadWithDimensions } from '../../util/uiHelpers';
import { propTypes } from '../../util/types';
import { formatMoney } from '../../util/currency';
import { ensureListing, ensureUser } from '../../util/data';
import { richText } from '../../util/richText';
import { createSlug } from '../../util/urlHelpers';
import { isBookingProcessAlias } from '../../transactions/transaction';

import { AspectRatioWrapper, NamedLink, ResponsiveImage } from '../../components';

import css from './ListingCard.module.css';
import { P } from '../../containers/PageBuilder/Primitives/P';
const mapboxAccessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
const MIN_LENGTH_FOR_LONG_WORDS = 10;

const priceData = (price, currency, intl) => {
  if (price && price.currency === currency) {
    const formattedPrice = formatMoney(intl, price);
    return { formattedPrice, priceTitle: formattedPrice };
  } else if (price) {
    return {
      formattedPrice: intl.formatMessage(
        { id: 'ListingCard.unsupportedPrice' },
        { currency: price.currency }
      ),
      priceTitle: intl.formatMessage(
        { id: 'ListingCard.unsupportedPriceTitle' },
        { currency: price.currency }
      ),
    };
  }
  return {};
};

const LazyImage = lazyLoadWithDimensions(ResponsiveImage, { loadAfterInitialRendering: 3000 });

const PriceMaybe = props => {
  const { price, publicData, config, intl } = props;
  const { listingType } = publicData || {};
  const validListingTypes = config.listing.listingTypes;
  const foundListingTypeConfig = validListingTypes.find(conf => conf.listingType === listingType);
  const showPrice = displayPrice(foundListingTypeConfig);
  if (!showPrice && price) {
    return null;
  }

  const isBookable = isBookingProcessAlias(publicData?.transactionProcessAlias);
  const { formattedPrice, priceTitle } = priceData(price, config.currency, intl);
  return (
    <div className={css.price}>
      <div className={css.priceValue} title={priceTitle}>
        💰 {formattedPrice}
      </div>
      {isBookable ? (
        <div className={css.perUnit}>
          <FormattedMessage id="ListingCard.perUnit" values={{ unitType: publicData?.unitType }} />
        </div>
      ) : null}
    </div>
  );
};

export const ListingCardComponent = props => {
  const config = useConfiguration();
  const {
    className,
    rootClassName,
    intl,
    listing,
    renderSizes,
    setActiveListing,
    showAuthorInfo,
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureListing(listing);

  const titleClub = listing?.attributes?.title;
  const numberOfBrand = listing?.attributes?.publicData?.brandNumber;
  const firstBrand = listing?.attributes?.publicData?.firstBrand?.replace(/-|_/g, match =>
    match === '_' ? ' ' : '.'
  );
  const brandSet =
    numberOfBrand < 2
      ? `${firstBrand}`
      : numberOfBrand < 3
      ? `${firstBrand} + ${numberOfBrand - 1} Brand`
      : `${firstBrand} + ${numberOfBrand - 1} Brands`;
  const thandy = listing?.attributes?.publicData?.hand || 'Righty';
  const handy = thandy.charAt(0).toUpperCase() + thandy.slice(1);
  const publicdata = listing?.attributes?.publicData;

  // const includeItem =
  //   !!publicdata?.putterIn &&
  //   'Putter' + !!publicdata?.sandwedgeIn &&
  //   'SW' + !!publicdata?.gapapproachwedgeIn &&
  //   'GW' + !!publicdata?.lobwedgeIn &&
  //   'LW' + !!publicdata?.pitchingwedgeIn &&
  //   'PW';

  const dataProp = {
    putterIn: 'Putter',
    sandwedgeIn: 'SW',
    gapapproachwedgeIn: 'AW',
    lobwedgeIn: 'LW',
    pitchingwedgeIn: 'PW',
    '1ironIn': '1 Iron',
    '2ironIn': '2 Iron',
    '3ironIn': '3 Iron',
    '4ironIn': '4 Iron',
    '5ironIn': '5 Iron',
    '6ironIn': '6 Iron',
    '7ironIn': '7 Iron',
    '8ironIn': '8 Iron',
    '9ironIn': '9 Iron',
    '3hybridIn': '3 Hybrid',
    '4hybridIn': '4 Hybrid',
    '5hybridIn': '5 Hybrid',
    '6hybridIn': '6 Hybrid',
    '7hybridIn': '7 Hybrid',
    '3woodIn': '3 Wood',
    '3hlwoodIn': '3HL Wood',
    '5woodIn': '5 Wood',
    '7woodIn': '7 Wood',
    heavenwoodIn: 'HeavenWood',
    '9woodIn': '9 Wood',
    '11woodIn': '11 Wood',
    driverIn: 'Driver',
  };
  const orders = [
    'putterIn',
    'sandwedgeIn',
    'gapapproachwedgeIn',
    'lobwedgeIn',
    'pitchingwedgeIn',
    '1ironIn',
    '2ironIn',
    '3ironIn',
    '4ironIn',
    '5ironIn',
    '6ironIn',
    '7ironIn',
    '8ironIn',
    '9ironIn',
    '3hybridIn',
    '4hybridIn',
    '5hybridIn',
    '6hybridIn',
    '7hybridIn',
    '3woodIn',
    '3hlwoodIn',
    '5woodIn',
    '7woodIn',
    'heavenwoodIn',
    '9woodIn',
    '11woodIn',
    'driverIn',
  ];
  const getOrderedProps = keys => {
    const orderedProps = keys.sort((a, b) => {
      return orders.indexOf(a) - orders.indexOf(b);
    });
    return orderedProps;
  };

  const address = listing?.attributes?.publicData?.location?.address;
  const [addressCityState, setAddressCityState] = useState('');
  const [itemIncludes, setItemIncludes] = useState([]);
  useEffect(() => {
    const temp = [];
    if (publicdata) {
      getOrderedProps(Object.keys(publicdata)).map((key, index) => {
        if (publicdata[key] && dataProp[key] !== undefined) temp.push(dataProp[key]);
      });
      setItemIncludes(temp);
    }
  }, [publicdata]);
  useEffect(() => {
    // const address = currentListing?.attributes?.publicData?.location?.address;   || 'Like New';
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address
      )}.json?access_token=${mapboxAccessToken}`
    )
      .then(response => response.json())
      .then(data => {
        let city = '';
        let state = '';

        for (let i = 0; i < data.features.length; i++) {
          const feature = data.features[i];

          const cityContext = feature.context.find(context => context.id.includes('place'));
          const stateContext = feature.context.find(context => context.id.includes('region'));

          if (cityContext && stateContext) {
            city = cityContext.text;
            state = stateContext.text;
            setAddressCityState(`${city}, ${state}`);
            break;
          }
        }
      })
      .catch(error => console.error(error));
  }, [address]);

  const id = currentListing.id.uuid;
  const { title = '', price, publicData } = currentListing.attributes;
  const slug = createSlug(title);
  const author = ensureUser(listing.author);
  const authorName = author.attributes.profile.displayName;
  const firstImage =
    currentListing.images && currentListing.images.length > 0 ? currentListing.images[0] : null;

  const {
    aspectWidth = 1,
    aspectHeight = 1,
    variantPrefix = 'listing-card',
  } = config.layout.listingImage;
  const variants = firstImage
    ? Object.keys(firstImage?.attributes?.variants).filter(k => k.startsWith(variantPrefix))
    : [];

  const setActivePropsMaybe = setActiveListing
    ? {
        onMouseEnter: () => setActiveListing(currentListing.id),
        onMouseLeave: () => setActiveListing(null),
      }
    : null;

  return (
    <NamedLink
      className={classes}
      name="ListingPage"
      params={{ id, slug }}
      {...setActivePropsMaybe}
    >
      <AspectRatioWrapper
        className={css.aspectRatioWrapper}
        width={aspectWidth}
        height={aspectHeight}
        {...setActivePropsMaybe}
      >
        <LazyImage
          rootClassName={css.rootForImage}
          alt={title}
          image={firstImage}
          variants={variants}
          sizes={renderSizes}
        />
      </AspectRatioWrapper>
      <div className={css.info} {...setActivePropsMaybe}>
        <div className={css.listingTitle}>
          {/* 🏑💰💸🧾⛳🏌️‍♀️🏌️‍♀️🛒✨ */}
          {titleClub} • {handy}
        </div>
        <div className={css.includeItem}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ fontWeight: '700' }}>Includes:&nbsp;</div>
            {itemIncludes.map((item, index) => {
              return (
                <span key={index}>
                  {item}
                  {index !== itemIncludes.length - 1 && ','}
                  &nbsp;
                </span>
              );
            })}
          </div>
        </div>
        <div className={css.listingBrand}>🏌️‍♀️ Brands: {brandSet}</div>
        <div className={css.listingLocation}>⛳ {addressCityState}</div>
        <PriceMaybe price={price} publicData={publicData} config={config} intl={intl} />
        <div className={css.mainInfo}>
          {/* <div className={css.title}>
            {richText(title, {
              longWordMinLength: MIN_LENGTH_FOR_LONG_WORDS,
              longWordClass: css.longWord,
            })}
          </div> */}
          {/* {showAuthorInfo ? (
            <div className={css.authorInfo}>
              <FormattedMessage id="ListingCard.author" values={{ authorName }} />
            </div>
          ) : null} */}
        </div>
      </div>
    </NamedLink>
  );
};

ListingCardComponent.defaultProps = {
  className: null,
  rootClassName: null,
  renderSizes: null,
  setActiveListing: null,
  showAuthorInfo: true,
};

ListingCardComponent.propTypes = {
  className: string,
  rootClassName: string,
  intl: intlShape.isRequired,
  listing: propTypes.listing.isRequired,
  showAuthorInfo: bool,

  // Responsive image sizes hint
  renderSizes: string,

  setActiveListing: func,
};

export default injectIntl(ListingCardComponent);

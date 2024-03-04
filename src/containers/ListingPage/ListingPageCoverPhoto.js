import React, { useEffect, useState } from 'react';
import { array, arrayOf, bool, func, shape, string, oneOf, object } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { useConfiguration } from '../../context/configurationContext';
import { useRouteConfiguration } from '../../context/routeConfigurationContext';

import { FormattedMessage, intlShape, useIntl } from '../../util/reactIntl';
import {
  LISTING_STATE_PENDING_APPROVAL,
  LISTING_STATE_CLOSED,
  SCHEMA_TYPE_MULTI_ENUM,
  SCHEMA_TYPE_TEXT,
  propTypes,
} from '../../util/types';
import { types as sdkTypes } from '../../util/sdkLoader';
import {
  LISTING_PAGE_DRAFT_VARIANT,
  LISTING_PAGE_PENDING_APPROVAL_VARIANT,
  LISTING_PAGE_PARAM_TYPE_DRAFT,
  LISTING_PAGE_PARAM_TYPE_EDIT,
  createSlug,
} from '../../util/urlHelpers';
import { convertMoneyToNumber } from '../../util/currency';
import {
  ensureListing,
  ensureOwnListing,
  ensureUser,
  userDisplayNameAsString,
} from '../../util/data';
import { richText } from '../../util/richText';
import { isBookingProcess, resolveLatestProcessName } from '../../transactions/transaction';

import { getMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import { manageDisableScrolling, isScrollingDisabled } from '../../ducks/ui.duck';
import { initializeCardPaymentData } from '../../ducks/stripe.duck.js';

import {
  H4,
  Page,
  NamedLink,
  NamedRedirect,
  OrderPanel,
  LayoutSingleColumn,
  H3,
} from '../../components';

import TopbarContainer from '../TopbarContainer/TopbarContainer';
import FooterContainer from '../FooterContainer/FooterContainer';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

import {
  sendInquiry,
  setInitialValues,
  fetchTimeSlots,
  fetchTransactionLineItems,
} from './ListingPage.duck';

import {
  LoadingPage,
  ErrorPage,
  priceData,
  listingImages,
  handleContactUser,
  handleSubmitInquiry,
  handleSubmit,
  handleToggleFavorites,
} from './ListingPage.shared';

// Add this whole import statement
import { updateProfile } from '../ProfileSettingsPage/ProfileSettingsPage.duck';

import SectionHero from './SectionHero';
import SectionTextMaybe from './SectionTextMaybe';
import SectionDetailsMaybe from './SectionDetailsMaybe';
import SectionMultiEnumMaybe from './SectionMultiEnumMaybe';
import SectionReviews from './SectionReviews';
import SectionAuthorMaybe from './SectionAuthorMaybe';
import SectionMapMaybe from './SectionMapMaybe';
import SectionServiceHistoryMaybe from './SectionServiceHistoryMaybe';

import css from './ListingPage.module.css';
import Faq from './Fag/Faq.js';
import { ClubDetail } from './ClubDetail/ClubDetail.js';

const MIN_LENGTH_FOR_LONG_WORDS_IN_TITLE = 16;

const { UUID } = sdkTypes;

const handleAddOn = props => {
  let cnt = 0;
  while (true) {
    if (!props?.hasOwnProperty(`addOn${++cnt}`)) {
      break;
    }
  }

  return --cnt;
};

export const ListingPageComponent = props => {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(
    props.inquiryModalOpenForListingId === props.params.id
  );
  const [imageCarouselOpen, setImageCarouselOpen] = useState(false);

  const {
    isAuthenticated,
    currentUser,
    getListing,
    getOwnListing,
    intl,
    onManageDisableScrolling,
    params: rawParams,
    location,
    scrollingDisabled,
    showListingError,
    reviews,
    fetchReviewsError,
    sendInquiryInProgress,
    sendInquiryError,
    monthlyTimeSlots,
    onFetchTimeSlots,
    onFetchTransactionLineItems,
    lineItems,
    fetchLineItemsInProgress,
    fetchLineItemsError,
    history,
    callSetInitialValues,
    onSendInquiry,
    onInitializeCardPaymentData,
    config,
    routeConfiguration,
    onUpdateFavorites,
  } = props;

  const listingConfig = config.listing;
  const listingId = new UUID(rawParams.id);
  const isPendingApprovalVariant = rawParams.variant === LISTING_PAGE_PENDING_APPROVAL_VARIANT;
  const isDraftVariant = rawParams.variant === LISTING_PAGE_DRAFT_VARIANT;
  const currentListing =
    isPendingApprovalVariant || isDraftVariant
      ? ensureOwnListing(getOwnListing(listingId))
      : ensureListing(getListing(listingId));

  const listingSlug = rawParams.slug || createSlug(currentListing.attributes.title || '');
  const params = { slug: listingSlug, ...rawParams };

  const listingPathParamType = isDraftVariant
    ? LISTING_PAGE_PARAM_TYPE_DRAFT
    : LISTING_PAGE_PARAM_TYPE_EDIT;
  const listingTab = isDraftVariant ? 'photos' : 'details';

  const isApproved =
    currentListing.id && currentListing.attributes.state !== LISTING_STATE_PENDING_APPROVAL;

  const pendingIsApproved = isPendingApprovalVariant && isApproved;

  // If a /pending-approval URL is shared, the UI requires
  // authentication and attempts to fetch the listing from own
  // listings. This will fail with 403 Forbidden if the author is
  // another user. We use this information to try to fetch the
  // public listing.
  const pendingOtherUsersListing =
    (isPendingApprovalVariant || isDraftVariant) &&
    showListingError &&
    showListingError.status === 403;
  const shouldShowPublicListingPage = pendingIsApproved || pendingOtherUsersListing;

  const addOn = currentListing?.attributes?.publicData?.addOns;
  const policy = currentListing?.attributes?.publicData?.policy;
  const pickupDrop = currentListing?.attributes?.publicData?.pickupDeliver;

  // const cancelPolicy = [
  //   'Renters can cancel until 24 hours before check-in for a full refund.',
  //   'The moderate policy allows cancellation until 3 days before the first rental day for a 50% refund.',
  //   'Renters can cancel at least 14 days before check-in for a full refund and between and up to 13 days before for a 50% refund. For cancellations less than seven days before check-in, the renter pays 100% for all days. If the cancellation occurs at least 14 days before check-in, the renter also has the option of canceling within 48 hours of booking for a full refund.',
  //   'Renters must cancel within 48 hours of booking and at least 7 days before check-in to receive a full refund. If guests cancel between 2 and 6 days before check-in, they must pay 50% for all days, and if they cancel day of or within 24 hours of booking, they must pay 100% for all days.',
  //   "Provider didn't set cancellation policy",
  // ];
  // console.log('policy', policy);
  const cancelPolicy = !!policy?.rule1
    ? 'Renters can cancel until 24 hours before check-in for a full refund'
    : !!policy?.rule2
    ? 'The moderate policy allows cancellation until 3 days before the first rental day for a 50% refund.'
    : !!policy?.rule3
    ? 'Renters can cancel at least 14 days before check-in for a full refund and between and up to 13 days before for a 50% refund. For cancellations less than seven days before check-in, the renter pays 100% for all days. If the cancellation occurs at least 14 days before check-in, the renter also has the option of canceling within 48 hours of booking for a full refund'
    : !!policy?.rule4
    ? 'Renters must cancel within 48 hours of booking and at least 7 days before check-in to receive a full refund. If guests cancel between 2 and 6 days before check-in, they must pay 50% for all days, and if they cancel day of or within 24 hours of booking, they must pay 100% for all days.'
    : "Provider didn't set cancellation policy";

  const pickUp = !!pickupDrop?.is_mon
    ? { T: pickupDrop.monStartT, D: pickupDrop.monStartD }
    : !!pickupDrop?.is_tue
    ? { T: pickupDrop.tueStartT, D: pickupDrop.tueStartD }
    : !!pickupDrop?.is_wed
    ? { T: pickupDrop.wedStartT, D: pickupDrop.wedStartD }
    : !!pickupDrop?.is_thu
    ? { T: pickupDrop.thuStartT, D: pickupDrop.thuStartD }
    : !!pickupDrop?.is_fri
    ? { T: pickupDrop.friStartT, D: pickupDrop.friStartD }
    : !!pickupDrop?.is_sat
    ? { T: pickupDrop.satStartT, D: pickupDrop.satStartD }
    : !!pickupDrop?.is_sun
    ? { T: pickupDrop.sunStartT, D: pickupDrop.sunStartD }
    : { T: '8', D: 'AM' };

  const dropOff = !!pickupDrop?.is_mon
    ? { T: pickupDrop.monEndT, D: pickupDrop.monEndD }
    : !!pickupDrop?.is_tue
    ? { T: pickupDrop.tueEndT, D: pickupDrop.tueEndD }
    : !!pickupDrop?.is_wed
    ? { T: pickupDrop.wedEndT, D: pickupDrop.wedEndD }
    : !!pickupDrop?.is_thu
    ? { T: pickupDrop.thuEndT, D: pickupDrop.thuEndD }
    : !!pickupDrop?.is_fri
    ? { T: pickupDrop.friEndT, D: pickupDrop.friEndD }
    : !!pickupDrop?.is_sat
    ? { T: pickupDrop.satEndT, D: pickupDrop.satEndD }
    : !!pickupDrop?.is_sun
    ? { T: pickupDrop.sunEndT, D: pickupDrop.sunEndD }
    : { T: '8', D: 'PM' };

  const [numberOfAddOn, setNumberOfAddOn] = useState(0);

  useEffect(() => {
    if (addOn) {
      const tmp = handleAddOn(addOn);
      setNumberOfAddOn(tmp);
    }
  }, [addOn]);

  if (shouldShowPublicListingPage) {
    return <NamedRedirect name="ListingPage" params={params} search={location.search} />;
  }

  const topbar = <TopbarContainer />;

  if (showListingError && showListingError.status === 404) {
    // 404 listing not found
    return <NotFoundPage />;
  } else if (showListingError) {
    // Other error in fetching listing
    return <ErrorPage topbar={topbar} scrollingDisabled={scrollingDisabled} intl={intl} />;
  } else if (!currentListing.id) {
    // Still loading the listing
    return <LoadingPage topbar={topbar} scrollingDisabled={scrollingDisabled} intl={intl} />;
  }

  const {
    description = '',
    geolocation = null,
    price = null,
    title = '',
    publicData = {},
    metadata = {},
  } = currentListing.attributes;

  const richTitle = (
    <span>
      {richText(title, {
        longWordMinLength: MIN_LENGTH_FOR_LONG_WORDS_IN_TITLE,
        longWordClass: css.longWord,
      })}
    </span>
  );

  const authorAvailable = currentListing && currentListing.author;
  const userAndListingAuthorAvailable = !!(currentUser && authorAvailable);
  const isOwnListing =
    userAndListingAuthorAvailable && currentListing.author.id.uuid === currentUser.id.uuid;

  const transactionProcessAlias = publicData?.transactionProcessAlias;
  const processName = resolveLatestProcessName(transactionProcessAlias.split('/')[0]);
  const isBooking = isBookingProcess(processName);
  const processType = isBooking ? 'booking' : 'purchase';

  const currentAuthor = authorAvailable ? currentListing.author : null;
  const ensuredAuthor = ensureUser(currentAuthor);
  const noPayoutDetailsSetWithOwnListing =
    isOwnListing && !currentUser?.attributes?.stripeConnected;
  const payoutDetailsWarning = noPayoutDetailsSetWithOwnListing ? (
    <div>
      <FormattedMessage id="ListingPage.payoutDetailsWarning" values={{ processType }} />
      <NamedLink name="StripePayoutPage">
        <FormattedMessage id="ListingPage.payoutDetailsWarningLink" />
      </NamedLink>
    </div>
  ) : null;

  // When user is banned or deleted the listing is also deleted.
  // Because listing can be never showed with banned or deleted user we don't have to provide
  // banned or deleted display names for the function
  const authorDisplayName = userDisplayNameAsString(ensuredAuthor, '');

  const { formattedPrice } = priceData(price, config.currency, intl);

  const commonParams = { params, history, routes: routeConfiguration };
  const onContactUser = handleContactUser({
    ...commonParams,
    currentUser,
    callSetInitialValues,
    location,
    setInitialValues,
    setInquiryModalOpen,
  });
  // Note: this is for inquiry state in booking and purchase processes. Inquiry process is handled through handleSubmit.
  const onSubmitInquiry = handleSubmitInquiry({
    ...commonParams,
    getListing,
    onSendInquiry,
    setInquiryModalOpen,
  });
  const onSubmit = handleSubmit({
    ...commonParams,
    currentUser,
    callSetInitialValues,
    getListing,
    onInitializeCardPaymentData,
  });

  const handleOrderSubmit = values => {
    const isCurrentlyClosed = currentListing.attributes.state === LISTING_STATE_CLOSED;
    if (isOwnListing || isCurrentlyClosed) {
      window.scrollTo(0, 0);
    } else {
      onSubmit(values);
    }
  };

  const facebookImages = listingImages(currentListing, 'facebook');
  const twitterImages = listingImages(currentListing, 'twitter');
  const schemaImages = listingImages(
    currentListing,
    `${config.layout.listingImage.variantPrefix}-2x`
  ).map(img => img.url);
  const marketplaceName = config.marketplaceName;
  const schemaTitle = intl.formatMessage(
    { id: 'ListingPage.schemaTitle' },
    { title, price: formattedPrice, marketplaceName }
  );
  // You could add reviews, sku, etc. into page schema
  // Read more about product schema
  // https://developers.google.com/search/docs/advanced/structured-data/product
  const productURL = `${config.marketplaceRootURL}${location.pathname}${location.search}${location.hash}`;
  const schemaPriceMaybe = price
    ? {
        price: intl.formatNumber(convertMoneyToNumber(price), {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
        priceCurrency: price.currency,
      }
    : {};
  const currentStock = currentListing.currentStock?.attributes?.quantity || 0;
  const schemaAvailability =
    currentStock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock';

  const createFilterOptions = options => options.map(o => ({ key: `${o.option}`, label: o.label }));

  const handleViewPhotosClick = e => {
    // Stop event from bubbling up to prevent image click handler
    // trying to open the carousel as well.
    e.stopPropagation();
    setImageCarouselOpen(true);
  };

  const onToggleFavorites = handleToggleFavorites({
    ...commonParams,
    currentUser,
    onUpdateFavorites,
    location,
  });

  return (
    <Page
      title={schemaTitle}
      scrollingDisabled={scrollingDisabled}
      author={authorDisplayName}
      description={description}
      facebookImages={facebookImages}
      twitterImages={twitterImages}
      schema={{
        '@context': 'http://schema.org',
        '@type': 'Product',
        description: description,
        name: schemaTitle,
        image: schemaImages,
        offers: {
          '@type': 'Offer',
          url: productURL,
          ...schemaPriceMaybe,
          availability: schemaAvailability,
        },
      }}
    >
      <LayoutSingleColumn className={css.pageRoot} topbar={topbar} footer={<FooterContainer />}>
        <SectionHero
          title={title}
          listing={currentListing}
          isOwnListing={isOwnListing}
          editParams={{
            id: listingId.uuid,
            slug: listingSlug,
            type: listingPathParamType,
            tab: listingTab,
          }}
          imageCarouselOpen={imageCarouselOpen}
          onImageCarouselClose={() => setImageCarouselOpen(false)}
          handleViewPhotosClick={handleViewPhotosClick}
          onManageDisableScrolling={onManageDisableScrolling}
          noPayoutDetailsSetWithOwnListing={noPayoutDetailsSetWithOwnListing}
        />
        <div className={css.contentWrapperForHeroLayout}>
          <div className={css.mainColumnForHeroLayout}>
            {/* <div className={css.mobileHeading}>
              <H4 as="h1" className={css.orderPanelTitle}>
                <FormattedMessage id="ListingPage.orderTitle" values={{ title: richTitle }} />
              </H4>
            </div> */}

            {/* Top title */}
            <H4 as="h1">Full Set • Right Handed</H4>

            <div>Condition: Like New</div>

            {/* Club Detail */}
            <div className={css.subtitle}>Whats Included</div>
            <div className={css.clubDetailSubHead}>
              <div className={css.item1}>Club</div>
              <div className={css.item2}>Brand</div>
              <div className={css.item3}>Model</div>
            </div>
            <ClubDetail listing={currentListing} listingConfig={listingConfig} />
            <div className={css.splitLine}></div>

            {/* Add Ons */}
            <div className={css.subtitle}>Optional Add Ons</div>
            {[...Array(numberOfAddOn)].map((_, index) => (
              <div className={css.mainContent} key={index}>
                {'- ' +
                  addOn[`addOn${++index}`]?.addOnManufact +
                  ' ' +
                  addOn[`addOn${index}`]?.addOnTitle +
                  '• $' +
                  addOn[`addOn${index}`]?.addOnPrice}
              </div>
              // <FieldCheckbox
              //   className={css.addOnContainer}
              //   id={`${formId}.addOn${++index}`}
              //   name={`addOn${index}`}
              //   label={
              //     addOn[`addOn${index}`].addOnManufact +
              //     ' ' +
              //     addOn[`addOn${index}`].addOnTitle +
              //     '• $' +
              //     addOn[`addOn${index}`].addOnPrice
              //   }
              //   value={`addOn${index}`}
              // />
            ))}
            <div className={css.splitLine}></div>

            {/* Author Detail */}
            <SectionAuthorMaybe
              title={title}
              listing={currentListing}
              authorDisplayName={authorDisplayName}
              onContactUser={onContactUser}
              isInquiryModalOpen={isAuthenticated && inquiryModalOpen}
              onCloseInquiryModal={() => setInquiryModalOpen(false)}
              sendInquiryError={sendInquiryError}
              sendInquiryInProgress={sendInquiryInProgress}
              onSubmitInquiry={onSubmitInquiry}
              currentUser={currentUser}
              onManageDisableScrolling={onManageDisableScrolling}
            />
            <div className={css.splitLine}></div>

            {/* FAQ */}
            <Faq />
            <div className={css.splitLine}></div>

            {/* Pick Up / Drop Off */}
            <div className={css.subtitle}>Golf Club Pickup/Drop Off</div>

            <div>
              Pickup: After {(pickUp.T ? pickUp.T : 8) + ':00 ' + (pickUp.D ? pickUp.D : 'AM')}
            </div>
            <div className={css.policyCustom}>
              Drop Off: Before{' '}
              {(dropOff.T ? dropOff.T : 8) + ':00 ' + (dropOff.D ? dropOff.D : 'PM')}
            </div>

            <div className={css.policyCustom}>{'Club Owner Rule : ' + policy?.customRule}</div>
            <div className={css.policyCustom}> {'Cancellation Policy : ' + cancelPolicy}</div>
            <div className={css.splitLine}></div>

            {/* Map */}
            <SectionMapMaybe
              geolocation={geolocation}
              publicData={publicData}
              listingId={currentListing.id}
              mapsConfig={config.maps}
            />

            {/* <SectionTextMaybe text={description} showAsIngress /> */}
            {/* <SectionDetailsMaybe
              publicData={publicData}
              metadata={metadata}
              listingConfig={listingConfig}
              intl={intl}
            /> */}
            {/* {listingConfig.listingFields.reduce((pickedElements, config) => {
              const { key, enumOptions, includeForListingTypes, scope = 'public' } = config;
              const listingType = publicData?.listingType;
              const isTargetListingType =
                includeForListingTypes == null || includeForListingTypes.includes(listingType);

              const value =
                scope === 'public' ? publicData[key] : scope === 'metadata' ? metadata[key] : null;
              const hasValue = value != null;
              return isTargetListingType && config.schemaType === SCHEMA_TYPE_MULTI_ENUM
                ? [
                    ...pickedElements,
                    <SectionMultiEnumMaybe
                      key={key}
                      heading={config?.showConfig?.label}
                      options={createFilterOptions(enumOptions)}
                      selectedOptions={value || []}
                    />,
                  ]
                : isTargetListingType && hasValue && config.schemaType === SCHEMA_TYPE_TEXT
                ? [
                    ...pickedElements,
                    <SectionTextMaybe key={key} heading={config?.showConfig?.label} text={value} />,
                  ]
                : pickedElements;
            }, [])} */}

            {/* <SectionTextMaybe
              text={publicData.extraFeatures}
              heading={intl.formatMessage({ id: 'ListingPage.extraFeaturesTitle' })}
            /> */}

            {/* <SectionServiceHistoryMaybe publicData={publicData} intl={intl} /> */}

            {/* <SectionReviews reviews={reviews} fetchReviewsError={fetchReviewsError} /> */}
          </div>
          <div className={css.orderColumnForHeroLayout}>
            <OrderPanel
              className={css.orderPanel}
              listing={currentListing}
              isOwnListing={isOwnListing}
              onSubmit={handleOrderSubmit}
              authorLink={
                <NamedLink
                  className={css.authorNameLink}
                  name="ListingPage"
                  params={params}
                  to={{ hash: '#author' }}
                >
                  {authorDisplayName}
                </NamedLink>
              }
              title={<FormattedMessage id="ListingPage.orderTitle" values={{ title: richTitle }} />}
              titleDesktop={
                <H4 as="h1" className={css.orderPanelTitle}>
                  <FormattedMessage id="ListingPage.orderTitle" values={{ title: richTitle }} />
                </H4>
              }
              payoutDetailsWarning={payoutDetailsWarning}
              author={ensuredAuthor}
              onManageDisableScrolling={onManageDisableScrolling}
              onFetchTransactionLineItems={onFetchTransactionLineItems}
              onContactUser={onContactUser}
              monthlyTimeSlots={monthlyTimeSlots}
              onFetchTimeSlots={onFetchTimeSlots}
              lineItems={lineItems}
              fetchLineItemsInProgress={fetchLineItemsInProgress}
              fetchLineItemsError={fetchLineItemsError}
              validListingTypes={config.listing.listingTypes}
              marketplaceCurrency={config.currency}
              dayCountAvailableForBooking={config.stripe.dayCountAvailableForBooking}
              marketplaceName={config.marketplaceName}
              onToggleFavorites={onToggleFavorites}
              currentUser={currentUser}
            />
          </div>
        </div>
      </LayoutSingleColumn>
    </Page>
  );
};

ListingPageComponent.defaultProps = {
  currentUser: null,
  inquiryModalOpenForListingId: null,
  showListingError: null,
  reviews: [],
  fetchReviewsError: null,
  monthlyTimeSlots: null,
  sendInquiryError: null,
  lineItems: null,
  fetchLineItemsError: null,
};

ListingPageComponent.propTypes = {
  // from useHistory
  history: shape({
    push: func.isRequired,
  }).isRequired,
  // from useLocation
  location: shape({
    search: string,
  }).isRequired,

  // from useIntl
  intl: intlShape.isRequired,

  // from useConfiguration
  config: object.isRequired,
  // from useRouteConfiguration
  routeConfiguration: arrayOf(propTypes.route).isRequired,

  params: shape({
    id: string.isRequired,
    slug: string,
    variant: oneOf([LISTING_PAGE_DRAFT_VARIANT, LISTING_PAGE_PENDING_APPROVAL_VARIANT]),
  }).isRequired,

  isAuthenticated: bool.isRequired,
  currentUser: propTypes.currentUser,
  getListing: func.isRequired,
  getOwnListing: func.isRequired,
  onManageDisableScrolling: func.isRequired,
  scrollingDisabled: bool.isRequired,
  inquiryModalOpenForListingId: string,
  showListingError: propTypes.error,
  callSetInitialValues: func.isRequired,
  reviews: arrayOf(propTypes.review),
  fetchReviewsError: propTypes.error,
  monthlyTimeSlots: object,
  // monthlyTimeSlots could be something like:
  // monthlyTimeSlots: {
  //   '2019-11': {
  //     timeSlots: [],
  //     fetchTimeSlotsInProgress: false,
  //     fetchTimeSlotsError: null,
  //   }
  // }
  sendInquiryInProgress: bool.isRequired,
  sendInquiryError: propTypes.error,
  onSendInquiry: func.isRequired,
  onInitializeCardPaymentData: func.isRequired,
  onFetchTransactionLineItems: func.isRequired,
  lineItems: array,
  fetchLineItemsInProgress: bool.isRequired,
  fetchLineItemsError: propTypes.error,
};

const EnhancedListingPage = props => {
  const config = useConfiguration();
  const routeConfiguration = useRouteConfiguration();
  const intl = useIntl();
  const history = useHistory();
  const location = useLocation();

  return (
    <ListingPageComponent
      config={config}
      routeConfiguration={routeConfiguration}
      intl={intl}
      history={history}
      location={location}
      {...props}
    />
  );
};

const mapStateToProps = state => {
  const { isAuthenticated } = state.auth;
  const {
    showListingError,
    reviews,
    fetchReviewsError,
    monthlyTimeSlots,
    sendInquiryInProgress,
    sendInquiryError,
    lineItems,
    fetchLineItemsInProgress,
    fetchLineItemsError,
    inquiryModalOpenForListingId,
  } = state.ListingPage;
  const { currentUser } = state.user;

  const getListing = id => {
    const ref = { id, type: 'listing' };
    const listings = getMarketplaceEntities(state, [ref]);
    return listings.length === 1 ? listings[0] : null;
  };

  const getOwnListing = id => {
    const ref = { id, type: 'ownListing' };
    const listings = getMarketplaceEntities(state, [ref]);
    return listings.length === 1 ? listings[0] : null;
  };

  return {
    isAuthenticated,
    currentUser,
    getListing,
    getOwnListing,
    scrollingDisabled: isScrollingDisabled(state),
    inquiryModalOpenForListingId,
    showListingError,
    reviews,
    fetchReviewsError,
    monthlyTimeSlots,
    lineItems,
    fetchLineItemsInProgress,
    fetchLineItemsError,
    sendInquiryInProgress,
    sendInquiryError,
  };
};

const mapDispatchToProps = dispatch => ({
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
  callSetInitialValues: (setInitialValues, values, saveToSessionStorage) =>
    dispatch(setInitialValues(values, saveToSessionStorage)),
  onFetchTransactionLineItems: params => dispatch(fetchTransactionLineItems(params)),
  onSendInquiry: (listing, message) => dispatch(sendInquiry(listing, message)),
  onInitializeCardPaymentData: () => dispatch(initializeCardPaymentData()),
  onFetchTimeSlots: (listingId, start, end, timeZone) =>
    dispatch(fetchTimeSlots(listingId, start, end, timeZone)),
  onUpdateFavorites: payload => dispatch(updateProfile(payload)),
});

// Note: it is important that the withRouter HOC is **outside** the
// connect HOC, otherwise React Router won't rerender any Route
// components since connect implements a shouldComponentUpdate
// lifecycle hook.
//
// See: https://github.com/ReactTraining/react-router/issues/4671
const ListingPage = compose(connect(mapStateToProps, mapDispatchToProps))(EnhancedListingPage);

export default ListingPage;
